"use client";

import { useState } from "react";
import { FaCheck, FaDownload, FaSpinner } from "react-icons/fa";

type PdfDownloadButtonProps = {
  source: string;
  filename: string;
  label: string;
  className?: string;
};

export default function PdfDownloadButton({
  source,
  filename,
  label,
  className = "",
}: PdfDownloadButtonProps) {
  const [status, setStatus] = useState<
    "idle" | "downloading" | "complete"
  >("idle");

  const downloadPdf = async () => {
    if (status === "downloading") return;
    setStatus("downloading");

    try {
      const response = await fetch(source);
      if (!response.ok) {
        throw new Error("Unable to download the PDF");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = objectUrl;
      anchor.download = filename;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);

      setStatus("complete");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      const anchor = document.createElement("a");
      anchor.href = source;
      anchor.download = filename;
      anchor.click();
      setStatus("idle");
    }
  };

  return (
    <button
      type="button"
      onClick={downloadPdf}
      disabled={status === "downloading"}
      aria-busy={status === "downloading"}
      className={className}
    >
      {status === "downloading" ? (
        <FaSpinner className="animate-spin" aria-hidden="true" />
      ) : status === "complete" ? (
        <FaCheck aria-hidden="true" />
      ) : (
        <FaDownload aria-hidden="true" />
      )}

      <span>
        {status === "downloading"
          ? "Preparing PDF..."
          : status === "complete"
            ? "Downloaded"
            : label}
      </span>
    </button>
  );
}



