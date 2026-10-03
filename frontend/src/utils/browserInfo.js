export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = "Unknown Browser";

  if (ua.includes("Firefox")) browser = "Mozilla Firefox";
  else if (ua.includes("SamsungBrowser")) browser = "Samsung Internet";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
  else if (ua.includes("Edge") || ua.includes("Edg")) browser = "Microsoft Edge";
  else if (ua.includes("Chrome")) browser = "Google Chrome";
  else if (ua.includes("Safari")) browser = "Apple Safari";

  return { browser, userAgent: ua };
};

export default getBrowserInfo;
