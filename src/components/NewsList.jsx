import NewsCard from "./NewsCard";

export default function NewsList({ articles, onSelect }) {
  if (!articles.length) {
    return <p>Нет новостей</p>;
  }

  return (
    <div className="news-list">
      {articles.map((a, i) => (
        <NewsCard
          key={a.url || i}
          article={a}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
