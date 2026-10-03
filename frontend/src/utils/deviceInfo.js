export const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let os = "Unknown OS";
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("like Mac")) os = "iOS";

  return {
    os,
    isMobile,
    isDesktop: !isMobile,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  };
};

export default getDeviceInfo;
