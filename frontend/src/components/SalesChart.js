import React from 'react';

function SalesChart({ data }) {
  const salesValues = data.map((item) => item.sales);
  const maxSales = salesValues.length ? Math.max(...salesValues) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Sales Overview</h2>
          <p className="text-sm text-slate-500">Monthly performance at a glance</p>
        </div>
        <div className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
          Live data
        </div>
      </div>

      <div className="flex h-72 items-end gap-3 rounded-2xl bg-slate-50 p-4">
        {data.map((item, index) => {
          const height = maxSales ? (item.sales / maxSales) * 100 : 0;
          return (
            <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
              <div className="text-xs font-semibold text-slate-600">${item.sales.toLocaleString()}</div>
              <div className="flex w-full items-end justify-center">
                <div
                  className="w-full max-w-[56px] rounded-t-2xl bg-gradient-to-t from-sky-600 to-cyan-400 shadow-md shadow-sky-200 transition-all duration-300 hover:opacity-90"
                  style={{ height: `${Math.max(height, 6)}%` }}
                />
              </div>
              <span className="text-sm font-medium text-slate-500">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SalesChart;
