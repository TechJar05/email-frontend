// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { clientsAPI, emailsAPI } from "../services/api";

import TopBar from "../components/layout/TopBar";
import StatsCards from "../components/StatsCards";
import ClientsTable from "../components/ClientsTable";
import UploadExcel from "../components/UploadExcel";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [clients, setClients] = useState([]); // always array
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

      // ✅ ensure it's an array (protects UI even if API returns object)
      const rows = Array.isArray(clientsRes.data)
        ? clientsRes.data
        : clientsRes.data?.clients || [];

      setClients(rows);
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
      await loadData();
    } catch (e) {
      console.error(e);
      alert("Failed to upload Excel file");
    }
  };

  const handleSendEmails = async () => {
    if (!confirm("Send emails to all clients who haven't received one?")) return;

    try {
      setSendingEmails(true);
      const response = await emailsAPI.sendAll();
      alert(response.data.message);
      await loadData();
    } catch (e) {
      console.error(e);
      alert("Failed to send emails");
    } finally {
      setSendingEmails(false);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (!confirm("Delete this client?")) return;
    try {
      await clientsAPI.delete(clientId);
      await loadData();
    } catch (e) {
      console.error(e);
      alert("Failed to delete client");
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("⚠️ Delete ALL clients? This cannot be undone!")) return;
    try {
      await clientsAPI.deleteAll();
      alert("All clients deleted");
      await loadData();
    } catch (e) {
      console.error(e);
      alert("Failed to delete clients");
    }
  };

  const allSent = stats && stats.total_clients === stats.emails_sent;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#073246]">
        <TopBar />
        <div className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-slate-200">
            <div className="w-8 h-8 border-2 border-[#1d4457]/30 border-t-[#1d4457] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#1d4457] font-semibold">Loading Dashboard…</p>
            <p className="text-slate-500 text-sm mt-1">Fetching campaign data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <TopBar />

      {/* 🔷 Blue Header Band */}
      <section className="bg-[#073246] text-white">
        <div className="max-w-[2900px] mx-auto px-6 md:px-10 py-10">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Aptara Email Campaign Dashboard
          </h1>
          <p className="text-white/80 text-sm mt-2 max-w-2xl">
            Upload client lists, track engagement, and send pending emails.
          </p>

         
        </div>
      </section>

      {/* ⚪ White Working Area */}
      <main className="max-w-[2900px] mx-auto px-6 md:px-10 py-10 space-y-10">
        {/* Stats (already white cards inside) */}
        <StatsCards stats={stats} />

        {/* Upload + Send */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* UploadExcel is already a white card */}
          <UploadExcel onUpload={handleExcelUpload} />

          {/* Send Emails card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-[#073246] font-semibold text-lg mb-1">
              📧 Send Emails
            </h3>
            <p className="text-slate-600 text-sm mb-5">
              Send emails only to clients who haven’t received one yet.
            </p>

            <button
              onClick={handleSendEmails}
              disabled={sendingEmails || allSent}
              className="w-full px-5 py-3 rounded-full bg-[#1d4457] text-white font-semibold hover:bg-[#163647] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingEmails
                ? "Sending…"
                : allSent
                ? "All Emails Sent ✅"
                : "Send All Emails"}
            </button>
          </div>
        </div>

        {/* Clients Table (already white card inside) */}
        <ClientsTable
          clients={clients}
          onDelete={handleDeleteClient}
          onDeleteAll={handleDeleteAll}
        />
      </main>

      {/* Footer */}
      <footer className="bg-[#073246] text-white/60 text-center text-xs py-6">
        Aptara Demo Microsite • Email Campaign Module
      </footer>
    </div>
  );
};

export default Dashboard;
