export const lookupIpLocation = async (ip) => {
  // If local IP, return localhost metadata
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.")) {
    return {
      country: "Local Network",
      city: "Localhost",
      region: "Development",
    };
  }

  return {
    country: "India",
    city: "Mumbai",
    region: "Maharashtra",
  };
};

export default { lookupIpLocation };
