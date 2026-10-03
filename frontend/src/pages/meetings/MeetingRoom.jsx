import { useParams, useNavigate } from "react-router-dom";
import MeetingRoomComponent from "../../components/meetings/MeetingRoom";

export default function MeetingRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="meeting-page-root">
      <MeetingRoomComponent
        roomId={roomId}
        onLeaveRoom={() => navigate("/meetings")}
      />
    </div>
  );
}
