"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function ImageLightbox({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label={`Open full-size image: ${alt}`} className="block max-w-full cursor-zoom-in">
      <img src={src} alt={alt} loading="lazy" className={`message-natural-image rounded-lg ${className}`} />
    </button>
    {open ? <div role="dialog" aria-modal="true" aria-label="Full-size image preview" className="fixed inset-0 z-[500] grid place-items-center bg-black/90 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <button type="button" autoFocus onClick={() => setOpen(false)} aria-label="Close image preview" className="absolute right-4 top-4 rounded-full bg-black/60 p-3 text-white"><X /></button>
      <img src={src} alt={alt} className="max-h-[90vh] max-w-full object-contain" />
    </div> : null}
  </>;
}
