import User from "../models/User.js";

export const seedAdmin = async () => {
  try {
    const adminEmail = "admin@streamhub.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        name: "StreamHub Admin",
        email: adminEmail,
        password: "AdminPassword123!",
        role: "admin",
        membership: "Premium",
        isEmailVerified: true,
      });
      console.log("🌱 Admin user seeded: admin@streamhub.com / AdminPassword123!");
    }
  } catch (error) {
    console.error("❌ Admin seeding error:", error.message);
  }
};

export default seedAdmin;
