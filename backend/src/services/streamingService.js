import fs from "fs";
import path from "path";
import http from "http";
import https from "https";

export const streamVideo = (videoPathOrUrl, req, res) => {
  if (videoPathOrUrl.startsWith("http://") || videoPathOrUrl.startsWith("https://")) {
    // If it's a remote URL, redirect or proxy with range headers
    return res.redirect(videoPathOrUrl);
  }

  const resolvedPath = path.resolve(videoPathOrUrl);
  if (!fs.existsSync(resolvedPath)) {
    return res.status(404).json({ success: false, message: "Video file not found on disk." });
  }

  const stat = fs.statSync(resolvedPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(resolvedPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(resolvedPath).pipe(res);
  }
};

export default { streamVideo };
