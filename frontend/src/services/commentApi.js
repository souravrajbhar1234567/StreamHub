import api from "./api";

export const deleteComment = async (commentId) => {
  return api.delete(`/comments/${commentId}`);
};

export const reactToComment = async (commentId, reactionType) => {
  return api.post(`/comments/${commentId}/react`, { reactionType });
};

export const reportComment = async (commentId, data) => {
  return api.post(`/comments/${commentId}/report`, data);
};

export const translateComment = async (text, targetLang) => {
  return api.post("/comments/translate", { text, targetLang });
};

export default {
  deleteComment,
  reactToComment,
  reportComment,
  translateComment,
};
