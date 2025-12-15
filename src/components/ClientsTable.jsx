// src/components/ClientsTable.jsx
import React from "react";

const ClientsTable = ({ clients = [], onDelete, onDeleteAll }) => {
  const safeClients = Array.isArray(clients) ? clients : [];
  const formatDate = (d) => (d ? new Date(d).toLocaleString() : "-");

  return (
    <div className="bg-white/50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-200">
        <div>
          <h3 className="text-[#073246] font-bold">
            📋 Clients ({safeClients.length})
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            Track email sent/click activity for each client.
          </p>
        </div>

        {/* {safeClients.length > 0 && (
          <button
            onClick={onDeleteAll}
            className="px-4 py-2 rounded-full text-sm font-semibold border border-[#1d4457]/30 text-[#1d4457] hover:bg-[#1d4457]/10 transition"
          >
            Delete All
          </button>
        )} */}
      </div>

      {/* Empty State */}
      {safeClients.length === 0 ? (
        <div className="py-14 text-center">
          <p className="text-slate-600 font-medium">
            No clients yet.
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Upload an Excel file to begin.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Head */}
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Email</th>
                <th className="py-3 px-4 text-left font-semibold">Company</th>
                <th className="py-3 px-4 text-center font-semibold">Sent</th>
                <th className="py-3 px-4 text-center font-semibold">Clicked</th>
                <th className="py-3 px-4 text-center font-semibold">Clicks</th>
                {/* <th className="py-3 px-4 text-left font-semibold">Last Click</th> */}
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
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="py-3 px-4 text-[#073246] font-medium">
                      {c.name || "-"}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {c.email || "-"}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {c.company || "-"}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
                          sent
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                        title={sent ? "Email sent" : "Not sent"}
                      >
                        {sent ? "✓" : "✗"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
                          clicked
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                        title={clicked ? "Link clicked" : "Not clicked"}
                      >
                        {clicked ? "✓" : "✗"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center text-slate-700">
                      {Number.isFinite(c.click_count) ? c.click_count : 0}
                    </td>

                    {/* <td className="py-3 px-4 text-slate-500">
                      {formatDate(c.created_at)}
                    </td> */}

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onDelete?.(c.id)}
                        className="text-xs px-3 py-1.5 rounded-full border border-[#1d4457]/30 text-[#1d4457] hover:bg-[#1d4457]/10 transition"
                      >
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
