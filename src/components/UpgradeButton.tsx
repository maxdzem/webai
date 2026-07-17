"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function UpgradeButton({ label = "Go Unlimited" }: { label?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upgrade() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/upgrade", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setError(data.error ?? "Upgrade failed.");
        return;
      }
      router.push(data.url ?? "/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button onClick={upgrade} disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
        {loading ? "Processing…" : label}
      </button>
      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
    </div>
  );
}
