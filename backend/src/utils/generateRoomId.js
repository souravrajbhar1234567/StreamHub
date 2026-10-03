import crypto from "crypto";

export const generateRoomId = () => {
  // Generate human-friendly format: xxx-yyyy-zzz
  const part1 = crypto.randomBytes(2).toString("hex");
  const part2 = crypto.randomBytes(2).toString("hex");
  const part3 = crypto.randomBytes(2).toString("hex");
  return `${part1}-${part2}-${part3}`;
};

export default generateRoomId;
