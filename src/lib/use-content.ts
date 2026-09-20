"use client";
import { useCallback, useEffect, useState } from "react";

export function useContentSection<T>(section: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/content/${section}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || `Failed to load ${section}.`);
      setItems((payload.items || []).map((row: { data: T }) => row.data));
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to load ${section}.`);
    } finally { setLoading(false); }
  }, [section]);
  useEffect(() => { void load(); }, [load]);
  return { items, loading, error, retry: load };
}
