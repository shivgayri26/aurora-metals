import React, { useEffect, useMemo, useState } from "react";

const API_KEY = "UYUULTJGQOG5YOEYWMHO645EYWMHO"; // ← your key
const API_URL = `https://api.metals.dev/v1/latest?api_key=${API_KEY}&currency=INR&unit=g`;

// Which metals to show as primary cards
const PRIMARY_METALS = [
  { key: "gold", label: "Gold" },
  { key: "silver", label: "Silver" },
  { key: "copper", label: "Copper" },
  { key: "aluminum", label: "Aluminum" },
  { key: "nickel", label: "Nickel" },
  { key: "zinc", label: "Zinc" },
  // API does not return explicit “steel” or “brass” spot keys; many feeds quote those via indices.
  // If metals.dev later adds them, just append here: { key: "steel", label: "Steel" }, { key: "brass", label: "Brass" }
  { key: "iron", label: "Iron" } // Note: metals.dev returns "iron" only if available; otherwise omit.
];

// Extra Indian benchmarks (optional section)
const INDIA_BENCHMARKS = [
  { key: "mcx_gold", label: "MCX Gold" },
  { key: "mcx_silver", label: "MCX Silver" },
  { key: "ibja_gold", label: "IBJA Gold" },
  { key: "lbma_gold_am", label: "LBMA Gold (AM)" },
  { key: "lbma_gold_pm", label: "LBMA Gold (PM)" },
  { key: "lbma_silver", label: "LBMA Silver" },
];

function useMetals() {
  const [data, setData] = useState(null);     // full API payload
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.status !== "success") {
        throw new Error(json?.error || "API returned non-success");
      }
      setData(json);
    } catch (e) {
      setError(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60_000); // refresh every 60s
    return () => clearInterval(id);
  }, []);

  return { data, loading, error, reload: load };
}

function Card({ title, value, unit }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div style={{ fontSize: "0.9rem", opacity: 0.75 }}>{title}</div>
      <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>
        {value !== undefined && value !== null
          ? Number(value).toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })
          : "—"}{" "}
        <span style={{ fontSize: "0.9rem", fontWeight: 500, opacity: 0.7 }}>
          {unit}
        </span>
      </div>
    </div>
  );
}

function Table({ rows, unit }) {
  return (
    <div
      style={{
        overflowX: "auto",
        borderRadius: 10,
        border: "1px solid #e6e6e6",
        background: "#fff",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <thead>
          <tr style={{ background: "#fafafa" }}>
            <th style={th}>Benchmark</th>
            <th style={th}>Price</th>
            <th style={th}>Unit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td style={td}>{r.label}</td>
              <td style={tdNum}>
                {r.value !== undefined && r.value !== null
                  ? Number(r.value).toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })
                  : "—"}
              </td>
              <td style={td}>{unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "10px 12px",
  fontSize: "0.85rem",
  color: "#333",
  borderBottom: "1px solid #eee",
};
const td = {
  padding: "10px 12px",
  fontSize: "0.95rem",
  color: "#222",
  borderBottom: "1px solid #f3f3f3",
};
const tdNum = { ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" };

export default function App() {
  const { data, loading, error, reload } = useMetals();

  const currency = data?.currency || "INR";
  const unit = data?.unit || "g";
  const metalTime = data?.timestamps?.metal
    ? new Date(data.timestamps.metal).toLocaleString()
    : null;

  const cardRows = useMemo(() => {
    const m = data?.metals || {};
    return PRIMARY_METALS.map((cfg) => ({
      label: cfg.label,
      value: m[cfg.key],
    }));
  }, [data]);

  const indiaRows = useMemo(() => {
    const m = data?.metals || {};
    return INDIA_BENCHMARKS.map((cfg) => ({
      label: cfg.label,
      value: m[cfg.key],
    })).filter((r) => r.value !== undefined);
  }, [data]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f9",
        color: "#111",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#fff",
          borderBottom: "1px solid #e9e9e9",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>
              Metals Dashboard
            </div>
            <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>
              Live INR prices per gram (via metals.dev)
            </div>
          </div>
          <button
            onClick={reload}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
              background: "#fafafa",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
        {loading && (
          <div style={{ padding: 8, opacity: 0.7 }}>Loading latest prices…</div>
        )}
        {error && (
          <div
            style={{
              padding: 10,
              background: "#fee",
              color: "#900",
              border: "1px solid #f5c2c2",
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            {error}
          </div>
        )}

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {cardRows.map((r) => (
            <Card
              key={r.label}
              title={r.label}
              value={r.value}
              unit={`${currency}/${unit}`}
            />
          ))}
        </div>

        {/* Optional: India benchmarks */}
        {indiaRows.length > 0 && (
          <section style={{ marginTop: 24 }}>
            <h3 style={{ margin: "8px 0 12px", fontSize: "1.1rem" }}>
              India Benchmarks (LBMA/MCX/IBJA)
            </h3>
            <Table
              rows={indiaRows}
              unit={`${currency}/${unit}`}
            />
          </section>
        )}

        {/* Footer info */}
        <section style={{ marginTop: 24, fontSize: "0.85rem", opacity: 0.75 }}>
          {metalTime && (
            <div>
              Last updated (metal feed): <strong>{metalTime}</strong>
            </div>
          )}
          <div style={{ marginTop: 6 }}>
            Note: Some industrial metals (e.g., steel, brass) are often quoted as
            indices or per-ton contracts and may not appear in every feed. This
            page shows whatever keys your API returns under <code>metals</code>.
          </div>
        </section>
      </main>
    </div>
  );
}
