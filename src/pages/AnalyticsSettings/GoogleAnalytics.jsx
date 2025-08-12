import React, { useState } from "react";

const AnalyticsToggle = () => {
  const [showAnalytics, setShowAnalytics] = useState(true);

  return (
    <div className="container my-4">
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="analyticsToggle"
          checked={showAnalytics}
          onChange={() => setShowAnalytics(prev => !prev)}
        />
        <label className="form-check-label" htmlFor="analyticsToggle">
          {showAnalytics ? "Hide Analytics" : "Show Analytics"}
        </label>
      </div>

      {showAnalytics && (
        <div className="card p-4 shadow-sm">
          <h5>Monthly Sales Report</h5>
          <p>Charts or analytics data will appear here...</p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsToggle;
