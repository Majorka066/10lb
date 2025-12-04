export default function LoadMoreButton({ onClick }) {
  return (
    <div className="load-more">
      <button className="load-more-btn" onClick={onClick}>
        Загрузить ещё
      </button>
    </div>
  );
}
