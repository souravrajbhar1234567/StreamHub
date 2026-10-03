import { useState, useEffect, useCallback } from "react";
import {
  getDownloads,
  getDownloadQuota,
  downloadVideo as apiDownloadVideo,
  deleteDownload as apiDeleteDownload,
} from "../services/downloadApi";
import { useAuth } from "./useAuth";

export const useDownload = () => {
  const { user } = useAuth();
  const [downloads, setDownloads] = useState([]);
  const [quota, setQuota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [progress, setProgress] = useState(0);

  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const [downloadsRes, quotaRes] = await Promise.all([
        getDownloads().catch(() => ({ data: { downloads: [] } })),
        getDownloadQuota().catch(() => ({ data: { quota: null } })),
      ]);
      setDownloads(downloadsRes.data.downloads || []);
      setQuota(quotaRes.data.quota || null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const startDownload = async (videoId, quality = "720p") => {
    setDownloadingId(videoId);
    setProgress(15);

    try {
      const timer = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 25 : prev));
      }, 300);

      const res = await apiDownloadVideo(videoId, quality);
      clearInterval(timer);
      setProgress(100);

      setTimeout(() => {
        setDownloadingId(null);
        setProgress(0);
        fetchData();
      }, 500);

      return res.data;
    } catch (err) {
      setDownloadingId(null);
      setProgress(0);
      throw err;
    }
  };

  const removeDownload = async (downloadId) => {
    await apiDeleteDownload(downloadId);
    setDownloads((prev) => prev.filter((d) => d._id !== downloadId));
    fetchData();
  };

  return {
    downloads,
    quota,
    loading,
    downloadingId,
    progress,
    startDownload,
    removeDownload,
    refreshDownloads: fetchData,
  };
};

export default useDownload;
