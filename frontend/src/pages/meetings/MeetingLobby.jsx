import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MeetingLobbyComponent from "../../components/meetings/MeetingLobby";
import MeetingRoomComponent from "../../components/meetings/MeetingRoom";
import { getMeeting } from "../../services/meetingApi";
import { useAuth } from "../../context/AuthContext";
import { useMeeting } from "../../hooks/useMeeting";
import Loader from "../../components/common/Loader";

export default function MeetingLobbyPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { joinRoom } = useMeeting();

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getMeeting(roomId)
      .then((res) => setMeeting(res.data.meeting))
      .catch((err) => {
        // If not found, still allow joining with ad-hoc room
        setMeeting({ roomId, title: `Meeting ${roomId}` });
      })
      .finally(() => setLoading(false));
  }, [roomId]);

  const handleJoin = async ({ displayName }) => {
    await joinRoom(roomId, user, displayName);
    setIsInCall(true);
  };

  const handleLeave = () => {
    setIsInCall(false);
    navigate("/meetings");
  };

  if (loading) return <Loader message="Connecting to meeting room..." fullScreen />;

  if (isInCall) {
    return <MeetingRoomComponent roomId={roomId} onLeaveRoom={handleLeave} />;
  }

  return (
    <div className="page-container py-12 flex justify-center">
      <div className="max-w-xl w-full">
        {error && <div className="error-message mb-4">{error}</div>}
        <MeetingLobbyComponent
          meetingTitle={meeting?.title}
          initialName={user?.name || ""}
          onJoin={handleJoin}
        />
      </div>
    </div>
  );
}
