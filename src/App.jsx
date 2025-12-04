import { useEffect, useState } from "react";
import Header from "./components/Header";
import FiltersBar from "./components/FiltersBar";
import NewsList from "./components/NewsList";
import NewsModal from "./components/NewsModal";
import LoadMoreButton from "./components/LoadMoreButton";

const API_KEY = "359d33327f704d4bb666d72c6671bb6f";
const PAGE_SIZE = 10;

export default function App() {
  const [category, setCategory] = useState("general");
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [refreshToken, setRefreshToken] = useState(Date.now());

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.status !== "ok") {
          setError(data.message || "Ошибка загрузки данных");
          return;
        }

        const news = data.articles || [];

        setHasMore(news.length === PAGE_SIZE);

        setArticles(prev =>
          page === 1 ? news : [...prev, ...news]
        );
      } catch {
        setError("Ошибка сети");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [category, page, refreshToken]);

  const refresh = () => {
    setArticles([]);
    setPage(1);
    setRefreshToken(Date.now());
  };

  const loadMore = () => {
    if (!loading && hasMore) setPage(s => s + 1);
  };

  return (
    <div className="app">
      <Header />

      <FiltersBar
        currentCategory={category}
        onCategoryChange={setCategory}
        onRefresh={refresh}
      />

      {loading && page === 1 && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <NewsList articles={articles} onSelect={setSelectedArticle} />

      {!loading && hasMore && articles.length > 0 && (
        <LoadMoreButton onClick={loadMore} />
      )}

      {loading && page > 1 && <p>Загрузка ещё...</p>}

      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
