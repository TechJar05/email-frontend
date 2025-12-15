// src/components/layout/TopBar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToMiddle = () => {
    navigate("/");
    const middle =
      document.documentElement.scrollHeight / 2 -
      window.innerHeight / 2;

    window.scrollTo({ top: middle, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    navigate("/");
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Brand Bar */}
      <div className="bg-[#1d4457] border-b border-black/10">
        <div className="max-w-[2900px] mx-auto h-16 flex items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-3">
            <img
              src="/aptaraLogo.png"
              alt="Aptara"
              className="h-7 w-auto select-none"
            />
            <span className="hidden sm:block text-white/80 text-sm font-medium tracking-wide pt-5 pl-2">
              Demo Microsite
            </span>
          </div>

          <span className="text-[11px] md:text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 backdrop-blur">
            Powered by AI
          </span>
        </div>
      </div>

      {/* White Nav Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[2900px] mx-auto px-6 md:px-10">
          <nav className="flex items-center gap-6 md:gap-8 text-sm font-semibold text-[#1d4457]">
            {/* Dashboard */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center py-3 border-b-2 border-transparent hover:text-[#073246] transition"
            >
              Dashboard
            </button>

            {/* Clients → bottom */}
            <button
              onClick={scrollToBottom}
              className="inline-flex items-center py-3 border-b-2 border-transparent hover:text-[#073246] transition"
            >
              Clients
            </button>

            {/* Campaigns → middle */}
            <button
              onClick={scrollToMiddle}
              className="inline-flex items-center py-3 border-b-2 border-transparent hover:text-[#073246] transition"
            >
              Campaigns
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
