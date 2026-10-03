import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getVideos } from "../../services/videoApi";
import VideoGrid from "../../components/video/VideoGrid";
import SearchBar from "../../components/common/SearchBar";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setVideos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getVideos({ search: query })
      .then((res) => setVideos(res.data.videos || []))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="page-container">
      <div className="search-page-header mb-6">
        <SearchBar
          value={query}
          onSearch={(val) => setSearchParams({ q: val })}
        />
        <h2 className="mt-4">
          Search results for: <span className="text-purple-400">"{query}"</span>
        </h2>
      </div>

      <VideoGrid
        videos={videos}
        loading={loading}
        emptyMessage={`No videos matched your query "${query}". Try different keywords.`}
      />
    </div>
  );
}
