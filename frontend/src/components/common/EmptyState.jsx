import { Link } from "react-router-dom";

export default function EmptyState({
  icon: Icon,
  title = "No items found",
  description = "There is nothing to display here yet.",
  actionText,
  actionLink,
  onAction,
}) {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-icon">
          <Icon size={48} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary mt-4">
          {actionText}
        </Link>
      )}
      {actionText && onAction && !actionLink && (
        <button onClick={onAction} className="btn btn-primary mt-4">
          {actionText}
        </button>
      )}
    </div>
  );
}
