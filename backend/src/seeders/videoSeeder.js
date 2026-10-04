import Video from "../models/Video.js";

export const seedVideos = async () => {
  try {
    const count = await Video.countDocuments();
    if (count > 0) {
      // Auto-repair any outdated or broken 404 thumbnail URLs
      await Video.updateMany(
        {
          $or: [
            { thumbnailUrl: { $regex: "1581291518655" } },
            { title: { $regex: "Modern UI/UX Design Systems", $options: "i" } }
          ]
        },
        {
          $set: {
            thumbnailUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80"
          }
        }
      );
      return;
    }

    const sampleVideos = [
      {
        title: "Full Stack Web Development with React 19 & Node.js",
        description:
          "Master modern full stack architecture using React 19, Express, MongoDB, and Tailwind CSS. Build scalable APIs, secure authentication, and interactive UIs.",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
        duration: "14:20",
        durationSeconds: 860,
        category: "Development",
        tags: ["react", "node", "javascript", "fullstack"],
        views: 1240,
        likes: 184,
        isPremium: false,
        resolution: "1080p",
        authorName: "Alex Rivera",
      },
      {
        title: "Building Microservices with Docker and Kubernetes",
        description:
          "Step-by-step guide to containerizing Node.js applications, building distributed microservices, and deploying with Docker Compose and Kubernetes.",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=900&q=80",
        duration: "21:45",
        durationSeconds: 1305,
        category: "DevOps",
        tags: ["docker", "kubernetes", "devops", "cloud"],
        views: 890,
        likes: 142,
        isPremium: true,
        resolution: "1080p",
        authorName: "DevOps Pro",
      },
      {
        title: "System Design: Scaling to 10 Million Users",
        description:
          "Deep dive into high-availability architecture, caching strategies with Redis, database sharding, CDN integration, and load balancing.",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
        duration: "28:10",
        durationSeconds: 1690,
        category: "Architecture",
        tags: ["system-design", "scalability", "architecture"],
        views: 3420,
        likes: 560,
        isPremium: true,
        resolution: "4K",
        authorName: "Principal Architect",
      },
      {
        title: "Modern UI/UX Design Systems with Figma and Tailwind",
        description:
          "Learn how to create a sleek design tokens system, accessible color contrast palettes, typography scales, and modular component libraries.",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80",
        duration: "18:05",
        durationSeconds: 1085,
        category: "Design",
        tags: ["figma", "ui", "ux", "tailwind"],
        views: 2150,
        likes: 310,
        isPremium: false,
        resolution: "1080p",
        authorName: "Sarah Jenkins",
      },
      {
        title: "WebRTC Video Conferencing & Peer-to-Peer Streaming",
        description:
          "Understand how browser-based real-time communication works. Explore STUN/TURN servers, SDP negotiation, audio/video track management, and mesh topologies.",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        duration: "16:40",
        durationSeconds: 1000,
        category: "WebRTC",
        tags: ["webrtc", "socketio", "streaming", "realtime"],
        views: 1820,
        likes: 295,
        isPremium: true,
        resolution: "1080p",
        authorName: "David Chen",
      },
      {
        title: "Mastering Database Query Optimization in MongoDB",
        description:
          "Diagnose slow queries using explain plans, create compound and partial indexes, optimize aggregation pipelines, and avoid memory limits.",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
        duration: "12:15",
        durationSeconds: 735,
        category: "Database",
        tags: ["mongodb", "database", "performance"],
        views: 940,
        likes: 120,
        isPremium: false,
        resolution: "1080p",
        authorName: "Alex Rivera",
      },
    ];

    await Video.insertMany(sampleVideos);
    console.log(`🌱 Sample videos seeded (${sampleVideos.length} videos).`);
  } catch (error) {
    console.error("❌ Video seeding error:", error.message);
  }
};

export default seedVideos;
