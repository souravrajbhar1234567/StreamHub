import { Shield, VolumeX, Lock, Unlock, MonitorOff, MessageSquareOff } from "lucide-react";

export default function HostControls({
  onMuteAll,
  onLockRoom,
  isRoomLocked,
  roomPermissions = { allowScreenShare: true, allowChat: true },
  onUpdatePermissions,
}) {
  return (
    <div className="host-controls-dropdown p-3 bg-slate-900 border border-purple-500/30 rounded-xl shadow-2xl min-w-[220px]">
      <div className="host-controls-title flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-purple-400 mb-2.5 pb-1.5 border-b border-white/10">
        <Shield size={14} /> Host Moderation
      </div>

      <div className="flex flex-col gap-1.5">
        <button
          className="dropdown-action-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors w-full text-left"
          onClick={onMuteAll}
        >
          <VolumeX size={14} className="text-red-400" /> Mute All Participants
        </button>

        <button
          className="dropdown-action-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors w-full text-left"
          onClick={onLockRoom}
        >
          {isRoomLocked ? (
            <>
              <Unlock size={14} className="text-emerald-400" /> Unlock Meeting Room
            </>
          ) : (
            <>
              <Lock size={14} className="text-yellow-400" /> Lock Meeting Room
            </>
          )}
        </button>

        <button
          className="dropdown-action-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors w-full text-left"
          onClick={() =>
            onUpdatePermissions &&
            onUpdatePermissions({
              allowScreenShare: !roomPermissions.allowScreenShare,
            })
          }
        >
          <MonitorOff size={14} className={roomPermissions.allowScreenShare ? "text-slate-400" : "text-red-400"} />
          {roomPermissions.allowScreenShare ? "Disable Screen Sharing" : "Enable Screen Sharing"}
        </button>

        <button
          className="dropdown-action-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors w-full text-left"
          onClick={() =>
            onUpdatePermissions &&
            onUpdatePermissions({
              allowChat: !roomPermissions.allowChat,
            })
          }
        >
          <MessageSquareOff size={14} className={roomPermissions.allowChat ? "text-slate-400" : "text-red-400"} />
          {roomPermissions.allowChat ? "Disable In-call Chat" : "Enable In-call Chat"}
        </button>
      </div>
    </div>
  );
}
