// src/components/UploadExcel.jsx
import React, { useId, useState } from "react";

const UploadExcel = ({ onUpload }) => {
  const inputId = useId(); // avoids duplicate ids across pages
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");
    try {
      setUploading(true);
      await onUpload(file);
      setFile(null);

      // reset input
      const input = document.getElementById(inputId);
      if (input) input.value = "";
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[#073246] font-bold text-lg"> Upload Excel</h3>
        {/* <p className="text-sm text-slate-600 mt-1">
          Required: <b>name</b>, <b>email</b> <br />
          Optional: phone, company
        </p> */}
      </div>

      {/* File Picker */}
      <label className="block cursor-pointer">
        <input
          id={inputId}
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />

        <div className="rounded-2xl border-2 border-dashed border-[#1d4457]/25 bg-slate-50 px-5 py-5 hover:bg-slate-100 transition">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#1d4457]">
                {file ? "Selected file" : "Choose an Excel file"}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {file ? file.name : "Click here to browse (.xlsx or .xls)"}
              </p>
            </div>

            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1d4457]/10 text-[#1d4457] border border-[#1d4457]/20">
              Browse
            </span>
          </div>
        </div>
      </label>

      {/* Selected File Chip */}
      {file && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#073246] truncate">
              {file.name}
            </p>
            <p className="text-xs text-slate-500">
              Ready to upload
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFile(null)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            disabled={uploading}
          >
            Remove
          </button>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="
          w-full mt-4 px-5 py-3 rounded-full
          bg-[#1d4457] text-white text-sm font-semibold
          hover:bg-[#163647] transition
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {uploading ? "Uploading..." : "Upload Excel"}
      </button>

      {/* Helper
      <p className="text-xs text-slate-500 mt-3">
        Tip: Ensure column headers are spelled exactly as required.
      </p> */}
    </div>
  );
};

export default UploadExcel;
