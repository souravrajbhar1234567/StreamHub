import securityService from "../services/securityService.js";

export const getSecurityOverview = async (req, res, next) => {
  try {
    const overview = await securityService.getSecurityOverview(req.user._id);
    res.status(200).json({ success: true, ...overview });
  } catch (error) {
    next(error);
  }
};

export default { getSecurityOverview };
