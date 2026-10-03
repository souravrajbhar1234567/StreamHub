import { UAParser } from "ua-parser-js";

export const parseDevice = (userAgentString = "") => {
  const parser = new UAParser(userAgentString);
  const result = parser.getResult();

  return {
    vendor: result.device.vendor || "Unknown Vendor",
    model: result.device.model || "Desktop / PC",
    type: result.device.type || "desktop",
    os: `${result.os.name || "Unknown OS"} ${result.os.version || ""}`.trim(),
  };
};

export default parseDevice;
