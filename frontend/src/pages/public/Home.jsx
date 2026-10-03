
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Play,
  ShieldCheck,
  Zap,
} from "lucide-react";

import VideoGrid from "../../components/video/VideoGrid";
import { getVideos } from "../../services/videoApi";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos({ limit: 6 })
      .then((response) => {
        setVideos(
          response.data.videos ||
          response.data.data ||
          []
        );
      })
      .catch((error) => {
        console.error(
          "Failed to load videos:",
          error
        );
      });
  }, []);

  return (
    <div>

      <section className="hero">

        <div className="hero-copy">

          <div className="eyebrow">
            <Zap size={15} />
            Learn. Watch. Connect.
          </div>

          <h1>
            Your world of{" "}
            <span>streaming</span>
            , in one place.
          </h1>

          <p>
            Discover quality video content,
            track your learning, join live
            meetings and manage everything
            from one modern dashboard.
          </p>

          <div className="hero-actions">

            <Link
              to="/videos"
              className="btn btn-primary btn-lg"
            >
              Explore Videos
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/plans"
              className="btn btn-outline btn-lg"
            >
              View Plans
            </Link>

          </div>

          <div className="trust-row">

            <span>
              <CheckCircle2 size={16} />
              Secure accounts
            </span>

            <span>
              <CheckCircle2 size={16} />
              HD streaming
            </span>

            <span>
              <ShieldCheck size={16} />
              Protected payments
            </span>

          </div>

        </div>

        <div className="hero-art">

          <div className="hero-screen">

            <div className="screen-top">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="screen-video">
              <Play
                fill="white"
                size={50}
              />
            </div>

            <div className="screen-lines">
              <i></i>
              <i></i>
              <i></i>
            </div>

          </div>

        </div>

      </section>

      <section className="section">

        <div className="section-heading">

          <div>
            <span className="section-kicker">
              CURATED FOR YOU
            </span>

            <h2>
              Featured videos
            </h2>
          </div>

          <Link
            to="/videos"
            className="text-link"
          >
            View all
            <ArrowRight size={16} />
          </Link>

        </div>

        <VideoGrid videos={videos} />

      </section>

      <section className="feature-strip">

        <div>
          <Play size={22} />
          <h3>Stream anywhere</h3>
          <p>
            Responsive player designed
            for desktop and mobile.
          </p>
        </div>

        <div>
          <ShieldCheck size={22} />
          <h3>Account security</h3>
          <p>
            Token-based authentication
            and protected routes.
          </p>
        </div>

        <div>
          <Zap size={22} />
          <h3>Real-time ready</h3>
          <p>
            Socket.IO architecture for
            chat and meetings.
          </p>
        </div>

      </section>

    </div>
  );
}

