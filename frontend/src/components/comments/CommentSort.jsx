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
        <option value="oldest">Oldest first</option>
        <option value="most_liked">Most liked</option>
        <option value="most_relevant">Most relevant</option>
      </select>
    </div>
  );
}
