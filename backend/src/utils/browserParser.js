import { UAParser } from "ua-parser-js";

export const parseBrowser = (userAgentString = "") => {
  const parser = new UAParser(userAgentString);
  const result = parser.getResult();

  return {
    name: result.browser.name || "Unknown Browser",
    version: result.browser.version || "1.0",
    major: result.browser.major || "1",
  };
};

export default parseBrowser;
