export default function NewsModal({ article, onClose }) {
  const { title, content, description, urlToImage, source, publishedAt, url } =
    article;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {urlToImage && (
          <img src={urlToImage} className="modal__image" alt={title} />
        )}

        <h2 className="modal__title">{title}</h2>

        <div className="modal__meta">
          <div>{source?.name}</div>
          <div>
            {publishedAt
              ? new Date(publishedAt).toLocaleString("ru-RU")
              : ""}
          </div>
        </div>

        <p className="modal__content">
          {content || description || "Полный текст недоступен"}
        </p>

        {url && (
          <a className="modal__link" href={url} target="_blank">
            Читать на источнике →
          </a>
        )}

        <button className="modal__close" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}
