// src/components/ClientsTable.jsx
import React from "react";

const ClientsTable = ({ clients, onDelete, onDeleteAll }) => {
  const formatDate = (d) => (d ? new Date(d).toLocaleString() : "-");

  return (
    <div className="rounded-2xl bg-white/5 border border-white/15 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">
          📋 Clients ({clients.length})
        </h3>

        {clients.length > 0 && (
          <button
            onClick={onDeleteAll}
            className="px-4 py-2 rounded-full border border-white/40 text-sm text-white hover:bg-white/10 transition"
          >
            Delete All
          </button>
        )}
      </div>

      {clients.length === 0 ? (
        <p className="text-white/70 text-center py-10">
          No clients yet. Upload an Excel file to begin.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-white/70 border-b border-white/15">
              <tr>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Email</th>
                <th className="py-2 text-left">Company</th>
                <th className="py-2 text-center">Sent</th>
                <th className="py-2 text-center">Clicked</th>
                <th className="py-2 text-center">Clicks</th>
                <th className="py-2 text-left">Last Click</th>
                <th className="py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-2 text-white">{c.name}</td>
                  <td className="py-2 text-white/80">{c.email}</td>
                  <td className="py-2 text-white/80">{c.company || "-"}</td>
                  <td className="py-2 text-center">
                    {c.email_sent ? "✓" : "✗"}
                  </td>
                  <td className="py-2 text-center">
                    {c.link_clicked ? "✓" : "✗"}
                  </td>
                  <td className="py-2 text-center">{c.click_count}</td>
                  <td className="py-2 text-white/60">
                    {formatDate(c.link_clicked_at)}
                  </td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => onDelete(c.id)}
                      className="text-xs px-3 py-1 rounded-full border border-white/40 text-white hover:bg-white/10 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientsTable;
