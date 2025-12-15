// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { clientsAPI, emailsAPI } from "../services/api";
import StatsCards from "../components/StatsCards";
import ClientsTable from "../components/ClientsTable";
import UploadExcel from "../components/UploadExcel";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingEmails, setSendingEmails] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, clientsRes] = await Promise.all([
        clientsAPI.getStats(),
        clientsAPI.getAll(),
      ]);
      setStats(statsRes.data);
      setClients(clientsRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleExcelUpload = async (file) => {
    try {
      const response = await clientsAPI.uploadExcel(file);
      alert(response.data.message);
      loadData();
    } catch {
      alert("Failed to upload Excel file");
    }
  };

  const handleSendEmails = async () => {
    if (!confirm("Send emails to all clients who haven't received one?")) return;

    try {
      setSendingEmails(true);
      const response = await emailsAPI.sendAll();
      alert(response.data.message);
      loadData();
    } catch {
      alert("Failed to send emails");
    } finally {
      setSendingEmails(false);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (!confirm("Delete this client?")) return;
    try {
      await clientsAPI.delete(clientId);
      loadData();
    } catch {
      alert("Failed to delete client");
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("⚠️ Delete ALL clients? This cannot be undone!")) return;
    try {
      await clientsAPI.deleteAll();
      alert("All clients deleted");
      loadData();
    } catch {
      alert("Failed to delete clients");
    }
  };

  const allSent = stats && stats.total_clients === stats.emails_sent;

  /* ---------- Loader ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#073246] flex items-center justify-center">
        <div className="rounded-3xl bg-white/5 border border-white/15 p-8 text-center">
          <div className="w-10 h-10 rounded-full border-2 border-white/30 border-t-white animate-spin mx-auto mb-4" />
          <p className="text-white font-semibold">Loading Dashboard…</p>
          <p className="text-white/70 text-sm mt-1">
            Fetching campaign data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#073246] text-white">
      <div className="max-w-[2900px] mx-auto px-8 md:px-14 py-12 md:py-20">
        {/* Header */}
        <div className="mb-10">
          <div className="rounded-3xl bg-white/5 border border-white/15 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">
              Aptara Email Campaign Dashboard
            </h1>
            <p className="text-white/70 text-sm mt-2 max-w-2xl">
              Upload client lists, track engagement, and send pending emails —
              all aligned with the Aptara demo experience.
            </p>

            <div className="flex flex-wrap gap-3 mt-5 text-xs">
              <div className="rounded-2xl bg-white/5 border border-white/15 px-4 py-2">
                <span className="text-white font-semibold">
                  {stats.total_clients}
                </span>{" "}
                total clients
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/15 px-4 py-2">
                <span className="text-white font-semibold">
                  {stats.emails_sent}
                </span>{" "}
                emails sent
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/15 px-4 py-2">
                <span className="text-white font-semibold">
                  {stats.total_clients - stats.emails_sent}
                </span>{" "}
                pending
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-10">
          <StatsCards stats={stats} />
        </div>

        {/* Upload + Send */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <UploadExcel onUpload={handleExcelUpload} />

          <div className="rounded-2xl bg-white/5 border border-white/15 p-6">
            <h3 className="text-white font-semibold text-lg mb-1">
              📧 Send Emails
            </h3>
            <p className="text-white/70 text-sm mb-5">
              Send emails only to clients who haven’t received one yet.
            </p>

            <button
              onClick={handleSendEmails}
              disabled={sendingEmails || allSent}
              className="w-full px-5 py-3 rounded-full bg-white text-[#073246] font-semibold hover:bg-[#f5f5f5] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingEmails
                ? "Sending…"
                : allSent
                ? "All Emails Sent ✅"
                : "Send All Emails"}
            </button>
          </div>
        </div>

        {/* Clients Table */}
        <ClientsTable
          clients={clients}
          onDelete={handleDeleteClient}
          onDeleteAll={handleDeleteAll}
        />

        {/* Footer */}
        <div className="text-center text-xs text-white/50 mt-10">
          Aptara Demo Microsite • Email Campaign Module
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
