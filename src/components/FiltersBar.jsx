const CATEGORIES = [
  { id: "general", label: "Общее" },
  { id: "technology", label: "Технологии" },
  { id: "business", label: "Бизнес" },
  { id: "sports", label: "Спорт" },
  { id: "science", label: "Наука" },
  { id: "health", label: "Здоровье" },
  { id: "entertainment", label: "Развлечения" },
];

export default function FiltersBar({ currentCategory, onCategoryChange, onRefresh }) {
  return (
    <div className="filters">
      {CATEGORIES.map(c => (
        <button
          key={c.id}
          onClick={() => {
            onCategoryChange(c.id);
          }}
          className={
            "filter-btn" +
            (currentCategory === c.id ? " filter-btn--active" : "")
          }
        >
          {c.label}
        </button>
      ))}

      <button className="refresh-btn" onClick={onRefresh}>
        🔄 Обновить
      </button>
    </div>
  );
}
