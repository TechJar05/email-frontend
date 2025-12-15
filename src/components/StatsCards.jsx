// src/components/StatsCards.jsx
import React from "react";

const StatsCards = ({ stats }) => {
  if (!stats) return null;

  const cards = [
    { title: "Total Clients", value: stats.total_clients, icon: "👥" },
    { title: "Emails Sent", value: stats.emails_sent, icon: "📧" },
    { title: "Links Clicked", value: stats.links_clicked, icon: "🔗" },
    { title: "Click Rate", value: `${stats.click_rate}%`, icon: "📊" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white/5 border border-white/15 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/70">
                {card.title}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                {card.value}
              </h2>
            </div>
            <div className="text-3xl opacity-80">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
