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
        membership: "Gold",
        isEmailVerified: true,
      });
      console.log("🌱 Admin user seeded: admin@streamhub.com / AdminPassword123!");
    }

    const demoUserEmail = "user@streamhub.com";
    const existingDemoUser = await User.findOne({ email: demoUserEmail });

    if (!existingDemoUser) {
      await User.create({
        name: "StreamHub User",
        email: demoUserEmail,
        password: "UserPassword123!",
        role: "user",
        membership: "Free",
        isEmailVerified: true,
      });
      console.log("🌱 Demo user seeded: user@streamhub.com / UserPassword123!");
    }
  } catch (error) {
    console.error("❌ Admin/User seeding error:", error.message);
  }
};

export default seedAdmin;
