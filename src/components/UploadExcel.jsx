// src/components/UploadExcel.jsx
import React, { useState } from "react";

const UploadExcel = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");
    try {
      setUploading(true);
      await onUpload(file);
      setFile(null);
      const input = document.getElementById("excel-upload");
      if (input) input.value = "";
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white/5 border border-white/15 p-6">
      <h3 className="text-white font-semibold mb-1">📁 Upload Excel</h3>
      <p className="text-sm text-white/70 mb-4">
        Required: <b>name</b>, <b>email</b> <br />
        Optional: phone, company
      </p>

      <label className="block cursor-pointer mb-3">
        <input
          id="excel-upload"
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
        <div className="rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white/80 hover:bg-black/50 transition">
          {file ? file.name : "Click to choose Excel file"}
        </div>
      </label>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full mt-2 px-5 py-2.5 rounded-full bg-white text-[#073246] text-sm font-semibold hover:bg-[#f5f5f5] transition disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Excel"}
      </button>
    </div>
  );
};

export default UploadExcel;
