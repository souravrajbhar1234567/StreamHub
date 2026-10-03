export default function StatsCard({ title, value, icon: Icon, trend, color = "purple" }) {
  return (
    <div className={`stats-card stats-color-${color}`}>
      <div className="stats-card-header">
        <span className="stats-title">{title}</span>
        {Icon && (
          <div className="stats-icon-wrap">
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="stats-value">{value}</div>
      {trend && <div className="stats-trend">{trend}</div>}
    </div>
  );
}
