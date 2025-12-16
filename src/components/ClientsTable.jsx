// src/components/ClientsTable.jsx
import React from "react";
import { Users, Check, X, Trash2 } from "lucide-react";

const ClientsTable = ({ clients = [], onDelete, onDeleteAll }) => {
  const safeClients = Array.isArray(clients) ? clients : [];

  return (
    <div className="bg-[#f5f5f5] shadow-sm border border-[#073246]  overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b-2 border-slate-500">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-[#1d4457]" />
          <h1 className="text-[#073246] font-bold">
            Clients ({safeClients.length})
          </h1>
        </div>
      </div>

      {/* Empty State */}
      {safeClients.length === 0 ? (
        <div className="py-14 text-center">
          <p className="text-slate-600 font-medium">No clients yet.</p>
          <p className="text-slate-500 text-sm mt-1">
            Upload an Excel file to begin.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Head */}
            <thead className="bg-slate-100 text-slate-700 border-b-2 border-slate-600">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Email</th>
                <th className="py-3 px-4 text-left font-semibold">Company</th>
                <th className="py-3 px-4 text-center font-semibold">Sent</th>
                <th className="py-3 px-4 text-center font-semibold">Clicked</th>
                <th className="py-3 px-4 text-center font-semibold">Clicks</th>
                <th className="py-3 px-4 text-center font-semibold">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {safeClients.map((c) => {
                const sent = !!c.email_sent;
                const clicked = !!c.link_clicked;

                return (
                  <tr
                    key={c.id}
                    className="border-b hover:bg-slate-100 transition"
                  >
                    <td className="py-3 px-4 text-[#073246] font-medium">
                      {c.name || "-"}
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      {c.email || "-"}
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      {c.company || "-"}
                    </td>

                    {/* Sent */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                          sent
                            ? "bg-[#1d4457] border-[#1d4457] text-white"
                            : "bg-white border-[#1d4457] text-[#1d4457]"
                        }`}
                      >
                        {sent ? <Check size={14} /> : <X size={14} />}
                      </span>
                    </td>

                    {/* Clicked */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                          clicked
                            ? "bg-[#1d4457] border-[#1d4457] text-white"
                            : "bg-white border-[#1d4457] text-[#1d4457]"
                        }`}
                      >
                        {clicked ? <Check size={14} /> : <X size={14} />}
                      </span>
                    </td>

                    {/* Click count */}
                    <td className="py-3 px-4 text-center text-slate-700">
                      {Number.isFinite(c.click_count) ? c.click_count : 0}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onDelete?.(c.id)}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border-2 border-[#1d4457]/50 text-[#1d4457] hover:bg-[#1d4457]/10 transition"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientsTable;
