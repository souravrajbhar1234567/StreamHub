import { useState, useEffect, useCallback } from "react";
import { getVideos, getCategories } from "../../services/videoApi";
import VideoGrid from "../../components/video/VideoGrid";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import { useDebounce } from "../../hooks/useDebounce";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(searchQuery, 400);

  useEffect(() => {
    getCategories()
      .then((res) => {
        const cats = res.data.categories || [];
        setCategories(["All", ...cats]);
      })
      .catch(() => {});
  }, []);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        sort,
      };
      if (activeCategory !== "All") params.category = activeCategory;
      if (debouncedSearch) params.search = debouncedSearch;

      const res = await getVideos(params);
      setVideos(res.data.videos || res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.warn("Failed to load videos:", err.message);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, debouncedSearch, sort, page]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <div className="page-container">
      <div className="catalog-header">
        <div>
          <span className="eyebrow">BROWSE LIBRARY</span>
          <h1>Explore Video Content</h1>
          <p>Learn new skills, master modern technology, and stay inspired.</p>
        </div>

        <div className="catalog-search-wrap">
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="catalog-filters-bar">
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                setPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="sort-dropdown-wrap">
          <label>Sort by:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="filter-select"
          >
            <option value="newest">Newest</option>
            <option value="views">Most Popular</option>
            <option value="likes">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="catalog-results mt-6">
        <VideoGrid videos={videos} loading={loading} />
      </div>

      <div className="mt-8">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}
