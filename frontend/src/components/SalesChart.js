import React from 'react';

function SalesChart({ data }) {
  const maxSales = Math.max(...data.map(item => item.sales));

  return (
    <div className="sales-chart">
      {data.map((item, index) => {
        const height = (item.sales / maxSales) * 100;
        return (
          <div
            key={index}
            className="chart-bar"
            style={{ height: `${height}%` }}
          >
            <span className="chart-value">${item.sales.toLocaleString()}</span>
            <span className="chart-label">{item.month}</span>
          </div>
        );
      })}
    </div>
  );
}

export default SalesChart;
