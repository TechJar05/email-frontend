// src/components/StatsCards.jsx
import React from "react";

const StatsCards = ({ stats }) => {
  if (!stats) return null;

  const cards = [
    { title: "Total Clients", value: stats.total_clients ?? 0, icon: "👥" },
    { title: "Emails Sent", value: stats.emails_sent ?? 0, icon: "📧" },
    { title: "Links Clicked", value: stats.links_clicked ?? 0, icon: "🔗" },
    {
      title: "Click Rate",
      value:
        stats.click_rate === null || stats.click_rate === undefined
          ? "0%"
          : `${stats.click_rate}%`,
      icon: "📊",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="
            bg-white rounded-2xl shadow-sm border border-slate-200
            p-6 relative overflow-hidden
          "
        >
          {/* subtle top accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-[#1d4457]" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {card.title}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#073246]">
                {card.value}
              </h2>
            </div>

            <div className="text-3xl opacity-90">{card.icon}</div>
          </div>

          {/* small helper line */}
          <p className="text-xs text-slate-500 mt-3">
            Updated from latest campaign data
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
