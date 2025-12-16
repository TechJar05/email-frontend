// src/components/StatsCards.jsx
import React from "react";
import {
  Users,
  Mail,
  Link2,
  BarChart3,
} from "lucide-react";

const StatsCards = ({ stats }) => {
  if (!stats) return null;

  const cards = [
    {
      title: "Total Clients",
      value: stats.total_clients ?? 0,
      Icon: Users,
    },
    {
      title: "Emails Sent",
      value: stats.emails_sent ?? 0,
      Icon: Mail,
    },
    {
      title: "Links Clicked",
      value: stats.links_clicked ?? 0,
      Icon: Link2,
    },
    {
      title: "Click Rate",
      value:
        stats.click_rate === null || stats.click_rate === undefined
          ? "0%"
          : `${stats.click_rate}%`,
      Icon: BarChart3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="
            bg-[#f5f5f5]
            border border-[#1d4457]
            p-6
            relative
            overflow-hidden
            transition-all duration-200
            hover:-translate-y-1
            hover:shadow-lg
            hover:border-[#000f17]
          "
        >
          {/* Top accent */}
          <div className="absolute inset-x-0 top-0" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {card.title}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#073246]">
                {card.value}
              </h2>
            </div>

            {/* Icon */}
            <div
              className="
                flex items-center justify-center
                w-12 h-12 rounded-xl
                bg-[#1d4457]/10 text-[#1d4457]
                transition-all duration-200
                group-hover:bg-[#073246]
                group-hover:text-white
              "
            >
              <card.Icon size={22} strokeWidth={2} />
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            Updated from latest campaign data
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
