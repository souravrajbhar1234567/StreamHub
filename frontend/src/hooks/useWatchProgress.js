import { useEffect, useRef } from "react";
import { updateWatchProgress } from "../services/videoApi";

export const useWatchProgress = (videoId, currentTime, duration, user) => {
  const lastSyncTimeRef = useRef(0);

  useEffect(() => {
    if (!user || !videoId || !duration || duration === 0) return;

    // Sync only every 10 seconds or when completing
    if (Math.abs(currentTime - lastSyncTimeRef.current) >= 10 || currentTime >= duration - 2) {
      lastSyncTimeRef.current = currentTime;
      updateWatchProgress(videoId, {
        progressSeconds: Math.floor(currentTime),
        totalDuration: Math.floor(duration),
      }).catch(() => {});
    }
  }, [videoId, currentTime, duration, user]);
};

export default useWatchProgress;
