import DownloadRecord from "../models/DownloadRecord.js";

export const resetMonthlyQuotas = async () => {
  try {
    // Quotas in StreamHub are evaluated monthly using createdAt timestamps,
    // but this job marks old download records as archived/expired if beyond 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const result = await DownloadRecord.updateMany(
      { createdAt: { $lt: thirtyDaysAgo }, status: "completed" },
      { status: "expired" }
    );
    if (result.modifiedCount > 0) {
      console.log(`📦 Archived ${result.modifiedCount} expired download records.`);
    }
  } catch (error) {
    console.error("❌ Quota reset job error:", error.message);
  }
};

export default resetMonthlyQuotas;
