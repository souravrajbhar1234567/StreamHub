import { Link } from "react-router-dom";
import { BookOpen, Play } from "lucide-react";

export default function MyCourses() {
  const learningTracks = [
    {
      id: "fullstack",
      title: "Full Stack Mastery: React 19 & Node.js",
      modulesCount: 12,
      completedModules: 4,
      category: "Development",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "devops",
      title: "Cloud & Microservices with Docker and K8s",
      modulesCount: 8,
      completedModules: 2,
      category: "DevOps",
      thumbnail: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="page-container">
      <div className="section-heading mb-6">
        <span className="eyebrow">LEARNING</span>
        <h1>My Enrolled Courses</h1>
        <p>Track your structured learning paths and certifications.</p>
      </div>

      <div className="courses-grid">
        {learningTracks.map((course) => {
          const percent = Math.round((course.completedModules / course.modulesCount) * 100);

          return (
            <div key={course.id} className="course-card">
              <img src={course.thumbnail} alt={course.title} className="course-thumb" />
              <div className="course-body">
                <span className="category-tag">{course.category}</span>
                <h3 className="mt-2">{course.title}</h3>
                <p className="text-xs text-muted mt-1">
                  {course.completedModules} of {course.modulesCount} lessons completed ({percent}%)
                </p>

                <div className="course-progress-track mt-3">
                  <div className="course-progress-fill" style={{ width: `${percent}%` }}></div>
                </div>

                <Link to="/videos" className="btn btn-primary btn-sm full-width mt-4">
                  <Play size={14} /> Continue Track
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
