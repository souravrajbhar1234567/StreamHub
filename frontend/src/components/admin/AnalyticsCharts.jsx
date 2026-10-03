export default function AnalyticsCharts() {
  const weeklyData = [
    { day: "Mon", views: 420, revenue: 1200 },
    { day: "Tue", views: 680, revenue: 2100 },
    { day: "Wed", views: 890, revenue: 2900 },
    { day: "Thu", views: 750, revenue: 2400 },
    { day: "Fri", views: 1100, revenue: 3800 },
    { day: "Sat", views: 1450, revenue: 4900 },
    { day: "Sun", views: 1600, revenue: 5400 },
  ];

  const maxViews = Math.max(...weeklyData.map((d) => d.views));

  return (
    <div className="analytics-charts-grid">
      <div className="analytics-card">
        <h3>Streaming Activity (Views / Day)</h3>
        <div className="bar-chart-container">
          {weeklyData.map((d) => (
            <div key={d.day} className="bar-group">
              <div
                className="chart-bar"
                style={{ height: `${(d.views / maxViews) * 100}%` }}
                title={`${d.views} views`}
              ></div>
              <span className="chart-label">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-card">
        <h3>Plan Distribution</h3>
        <div className="plan-pie-breakdown">
          <div className="distribution-item">
            <span className="dot bg-purple-500"></span>
            <span>Free Tier (55%)</span>
          </div>
          <div className="distribution-item">
            <span className="dot bg-indigo-500"></span>
            <span>Pro Tier (32%)</span>
          </div>
          <div className="distribution-item">
            <span className="dot bg-pink-500"></span>
            <span>Premium Tier (13%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
