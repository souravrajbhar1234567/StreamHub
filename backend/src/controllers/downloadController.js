import downloadService from "../services/downloadService.js";
import quotaService from "../services/quotaService.js";

export const downloadVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quality } = req.body;
    const result = await downloadService.initiateDownload(
      req.user._id,
      id,
      quality || "720p"
    );
    res.status(200).json({
      success: true,
      message: "Download link ready.",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDownloads = async (req, res, next) => {
  try {
    const downloads = await downloadService.getUserDownloads(req.user._id);
    res.status(200).json({ success: true, downloads });
  } catch (error) {
    next(error);
  }
};

export const getQuota = async (req, res, next) => {
  try {
    const quota = await quotaService.getUserQuota(req.user);
    res.status(200).json({ success: true, quota });
  } catch (error) {
    next(error);
  }
};

export const deleteDownload = async (req, res, next) => {
  try {
    await downloadService.deleteDownload(req.user._id, req.params.downloadId);
    res.status(200).json({
      success: true,
      message: "Download removed from your library.",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  downloadVideo,
  getUserDownloads,
  getQuota,
  deleteDownload,
};
