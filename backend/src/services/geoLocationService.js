export const lookupIpLocation = async (ip) => {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return {
      country: "India",
      city: "Mumbai",
      region: "Maharashtra",
      ip: ip || "127.0.0.1",
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data.status === "success") {
        return {
          country: data.country || "India",
          city: data.city || "Mumbai",
          region: data.regionName || "Maharashtra",
          ip,
        };
      }
    }
  } catch (err) {
    // Fall back smoothly
  }

  return {
    country: "India",
    city: "Mumbai",
    region: "Maharashtra",
    ip,
  };
};

export default { lookupIpLocation };
