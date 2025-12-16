// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { clientsAPI, emailsAPI } from "../services/api";
import { Mail } from "lucide-react";

import TopBar from "../components/layout/TopBar";
import StatsCards from "../components/StatsCards";
import ClientsTable from "../components/ClientsTable";
import UploadExcel from "../components/UploadExcel";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingEmails, setSendingEmails] = useState(false);

 useEffect(() => {
  loadData(true); // ✅ only first load shows loader
}, []);


  const loadData = async (showLoader = false) => {
  try {
    if (showLoader) setLoading(true);

    const [statsRes, clientsRes] = await Promise.all([
      clientsAPI.getStats(),
      clientsAPI.getAll(),
    ]);

    setStats(statsRes.data);
    setClients(
      Array.isArray(clientsRes.data)
        ? clientsRes.data
        : clientsRes.data?.clients || []
    );
  } catch (e) {
    toast.error("Failed to load data");
  } finally {
    if (showLoader) setLoading(false);
  }
};


  const handleExcelUpload = async (file) => {
  try {
    const response = await clientsAPI.uploadExcel(file);
    toast.success(response.data.message || "Excel uploaded successfully");
    await loadData(); // ❌ NO loader here
  } catch {
    toast.error("Failed to upload Excel file");
  }
};

 const handleSendEmails = async () => {
  try {
    setSendingEmails(true);
    const response = await emailsAPI.sendAll();
    toast.success(response.data.message || "Emails sent");
    await loadData();
  } catch {
    toast.error("Failed to send emails");
  } finally {
    setSendingEmails(false);
  }
};

  const handleDeleteClient = async (clientId) => {
  try {
    await clientsAPI.delete(clientId);
    toast.success("Client deleted");
    await loadData(); // ❌ NO loader
  } catch {
    toast.error("Failed to delete client");
  }
};


  const handleDeleteAll = async () => {
    if (!confirm("⚠️ Delete ALL clients? This cannot be undone!")) return;

    try {
      await clientsAPI.deleteAll();
      toast.success("All clients deleted");
      await loadData();
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete clients");
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
            <p className="text-slate-500 text-sm mt-1">
              Fetching campaign data
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Blue Header */}
      <section className="bg-[#073246] text-white">
        <div className="max-w-[2900px] mx-auto px-6 md:px-10 py-10">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Aptara Email Campaign Dashboard
          </h1>
          <p className="text-white text-sm mt-2 max-w-2xl">
            Upload client lists, track engagement, and send pending emails.
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="max-w-[2900px] mx-auto px-6 md:px-10 py-10 space-y-10">
        <StatsCards stats={stats} />

        <div className="grid md:grid-cols-2 gap-8">
          <UploadExcel onUpload={handleExcelUpload} />

          <div className="bg-[#f5f5f5] shadow-sm border border-[#073246] p-6">

<h3 className="flex items-center gap-2 text-[#073246] font-semibold text-lg mb-1">
  <Mail size={18} className="text-[#1d4457]" />
  Send Emails
</h3>

            <p className="text-slate-600 text-sm mb-5">
              Send emails only to clients who haven’t received one yet.
            </p>

            <button
              onClick={handleSendEmails}
              disabled={sendingEmails || allSent}
              className="w-full px-5 py-3 cursor-pointer rounded-full bg-[#1d4457] text-white font-semibold hover:bg-[#163647] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingEmails
                ? "Sending…"
                : allSent
                ? "All Emails Sent"
                : "Send All Emails"}
            </button>
          </div>
        </div>

        <ClientsTable
          clients={clients}
          onDelete={handleDeleteClient}
          onDeleteAll={handleDeleteAll}
        />
      </main>

      <footer className="bg-[#073246] text-white/60 text-center text-xs py-6">
        Aptara Demo Microsite • Email Campaign Module
      </footer>
    </div>
  );
};

export default Dashboard;
