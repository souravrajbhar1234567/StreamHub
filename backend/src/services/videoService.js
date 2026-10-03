import Video from "../models/Video.js";

export const getVideos = async ({
  search = "",
  category = "",
  sort = "newest",
  page = 1,
  limit = 12,
}) => {
  const query = { status: "published" };

  if (category && category !== "All") {
    query.category = new RegExp(`^${category}$`, "i");
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  let sortOption = { createdAt: -1 };
  if (sort === "views") {
    sortOption = { views: -1 };
  } else if (sort === "likes") {
    sortOption = { likes: -1 };
  } else if (sort === "oldest") {
    sortOption = { createdAt: 1 };
  }

  const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
  const take = parseInt(limit, 10);

  const [videos, total] = await Promise.all([
    Video.find(query).sort(sortOption).skip(skip).limit(take),
    Video.countDocuments(query),
  ]);

  return {
    videos,
    total,
    page: parseInt(page, 10),
    totalPages: Math.ceil(total / take) || 1,
  };
};

export const getVideoById = async (id, incrementView = true) => {
  let video;
  if (incrementView) {
    video = await Video.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
  } else {
    video = await Video.findById(id);
  }

  if (!video) {
    const error = new Error("Video not found.");
    error.statusCode = 404;
    throw error;
  }

  return video;
};

export const createVideo = async (videoData, authorUser) => {
  const video = await Video.create({
    ...videoData,
    author: authorUser?._id,
    authorName: authorUser?.name || "StreamHub Creator",
  });
  return video;
};

export const updateVideo = async (id, updateData) => {
  const video = await Video.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!video) {
    const error = new Error("Video not found.");
    error.statusCode = 404;
    throw error;
  }
  return video;
};

export const deleteVideo = async (id) => {
  const video = await Video.findByIdAndDelete(id);
  if (!video) {
    const error = new Error("Video not found.");
    error.statusCode = 404;
    throw error;
  }
  return video;
};

export const likeVideo = async (id) => {
  const video = await Video.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  return video;
};

export const getCategories = async () => {
  return await Video.distinct("category");
};

export default {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  getCategories,
};
