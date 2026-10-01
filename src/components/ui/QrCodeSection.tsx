"use client";

import { useState } from "react";
import Image from "next/image";
import { FaFilePdf, FaQrcode, FaSearchPlus, FaTimes } from "react-icons/fa";

export interface QrCodeType {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  accent?: string;
}

interface QrCodeSectionProps {
  qrCodes: QrCodeType[];
}

export default function QrCodeSection({ qrCodes }: QrCodeSectionProps) {
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  if (!qrCodes || qrCodes.length === 0) return null;

  return (
    <>
      <div className="mx-6 mb-10 grid gap-6 sm:mx-10 md:grid-cols-2 lg:mx-14">
        {qrCodes.map((qr) => {
          const isBlue = qr.accent === "blue";
          return (
            <div
              key={qr.id}
              className={`flex flex-col items-center justify-between gap-4 rounded-2xl border p-6 backdrop-blur-md sm:flex-row ${
                isBlue
                  ? "border-blue-400/20 bg-blue-950/20"
                  : "border-cyan-400/20 bg-cyan-950/20"
              }`}
            >
              <div className="space-y-1.5 text-center sm:text-left">
                <div
                  className={`flex items-center justify-center gap-2 text-sm font-bold sm:justify-start ${
                    isBlue ? "text-blue-300" : "text-cyan-300"
                  }`}
                >
                  {isBlue ? <FaFilePdf /> : <FaQrcode />}
                  <h3>{qr.title}</h3>
                </div>
                <p className="max-w-[200px] text-xs text-gray-400">
                  {qr.description}
                </p>
              </div>
              <div
                onClick={() =>
                  setModalImage({
                    src: qr.image,
                    title: qr.title,
                  })
                }
                className={`group relative shrink-0 cursor-pointer rounded-xl border bg-[var(--bg-primary)] p-2.5 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 hover:scale-105 ${
                  isBlue
                    ? "border-blue-400/30 hover:border-blue-400"
                    : "border-cyan-400/30 hover:border-cyan-400"
                }`}
                title="Click to enlarge"
              >
                <div
                  className={`absolute -inset-0.5 rounded-xl blur transition duration-300 ${
                    isBlue
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 opacity-30 group-hover:opacity-75"
                      : "bg-gradient-to-r from-blue-500 to-cyan-400 opacity-30 group-hover:opacity-75"
                  }`}
                />
                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
                  <Image
                    src={qr.image}
                    alt={qr.alt}
                    fill
                    sizes="96px"
                    className="object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <FaSearchPlus /> Zoom
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm space-y-4 rounded-3xl border border-cyan-400/30 bg-[var(--bg-card)] p-6 text-center shadow-[0_0_50px_rgba(6,182,212,0.3)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalImage(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-300 transition hover:bg-cyan-500 hover:text-white"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-bold text-cyan-300">{modalImage.title}</h3>

            <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-inner">
              <Image
                src={modalImage.src}
                alt={modalImage.title}
                fill
                sizes="300px"
                className="object-contain p-2"
              />
            </div>

            <p className="text-xs text-gray-400">
              Scan with your phone camera to open or download.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
