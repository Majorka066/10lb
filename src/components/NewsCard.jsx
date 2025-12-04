export default function NewsCard({ article, onSelect }) {
  const { title, description, urlToImage, source, publishedAt } = article;

  return (
    <div className="news-card" onClick={() => onSelect(article)}>
      {urlToImage && (
        <img
          src={urlToImage}
          className="news-card__image"
          alt={title}
        />
      )}

      <div className="news-card__body">
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>

        <div className="news-card__meta">
          <span>{source?.name}</span>
          <span>
            {publishedAt
              ? new Date(publishedAt).toLocaleString("ru-RU")
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
