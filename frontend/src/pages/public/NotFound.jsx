import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="center-page not-found">
      <div className="error-number">404</div>

      <h1>Page not found</h1>

      <p>
        The page you are looking for doesn't exist
        or has been moved.
      </p>

      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}