import api from "./api";

export const createMeeting = async (data) => {
  return api.post("/meetings", data);
};

export const getMeeting = async (roomId) => {
  return api.get(`/meetings/${roomId}`);
};

export const endMeeting = async (roomId) => {
  return api.post(`/meetings/${roomId}/end`);
};

export const getMeetingMessages = async (roomId) => {
  return api.get(`/meetings/${roomId}/messages`);
};

export const sendMeetingMessage = async (roomId, data) => {
  return api.post(`/meetings/${roomId}/messages`, data);
};

export default {
  createMeeting,
  getMeeting,
  endMeeting,
  getMeetingMessages,
  sendMeetingMessage,
};
