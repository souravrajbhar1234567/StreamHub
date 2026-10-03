import { ArrowUpDown } from "lucide-react";

export default function CommentSort({ sort = "newest", onSortChange }) {
  return (
    <div className="comment-sort-wrap">
      <ArrowUpDown size={15} />
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="comment-sort-select"
        aria-label="Sort comments"
      >
        <option value="newest">Newest first</option>
        <option value="top">Top comments</option>
      </select>
    </div>
  );
}
