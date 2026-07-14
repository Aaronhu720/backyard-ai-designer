"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import AdminGuard from "@/components/AdminGuard";
import { PROJECT_STATUSES } from "@/lib/constants";

interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  status: string;
  budgetRange: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new_lead: { bg: "#DBEAFE", text: "#1E40AF" },
  contacted: { bg: "#FEF3C7", text: "#92400E" },
  quoted: { bg: "#EDE9FE", text: "#5B21B6" },
  closed_won: { bg: "#D1FAE5", text: "#065F46" },
  closed_lost: { bg: "#FEE2E2", text: "#991B1B" },
};

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  );
}

function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => { setLeads(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setLeads(getDemoLeads()); setLoading(false); });
  }, []);

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);
  const statusCounts = PROJECT_STATUSES.map((s) => ({
    ...s, count: leads.filter((l) => l.status === s.id).length,
  }));

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F3" }}>
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-normal" style={{ color: "#1B3A2D" }}>
              Lead dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: "#9A8E82" }}>
              {leads.length} total leads
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.location.reload()} className="btn-secondary text-sm py-2 px-4">
              Refresh
            </button>
            <button
              onClick={() => { localStorage.removeItem("admin_token"); router.push("/admin/login"); }}
              className="btn-secondary text-sm py-2 px-4"
              style={{ color: "#991B1B" }}
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {statusCounts.map((s) => {
            const colors = STATUS_COLORS[s.id] || { bg: "#F3F4F6", text: "#374151" };
            return (
              <button
                key={s.id}
                onClick={() => setFilter(filter === s.id ? "all" : s.id)}
                className={`card p-4 text-left transition-all hover:shadow-md ${filter === s.id ? "ring-2 ring-forest-500" : ""}`}
              >
                <div className="text-2xl font-bold" style={{ color: "#2A2520" }}>{s.count}</div>
                <div className="mt-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: colors.bg, color: colors.text }}>
                    {s.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ fontVariantNumeric: "tabular-nums" }}>
              <thead>
                <tr style={{ background: "#FAF7F3", borderBottom: "1px solid #EDE7DE" }}>
                  {["Customer", "Contact", "Location", "Budget", "Status", "Date", ""].map((h, i) => (
                    <th key={h || i} className={`py-3 px-5 text-xs font-bold uppercase tracking-wider ${
                      h === "" ? "text-right" : "text-left"
                    } ${["Contact", "Date"].includes(h) ? "hidden md:table-cell" : ""} ${h === "Location" ? "hidden lg:table-cell" : ""}`}
                    style={{ color: "#9A8E82" }}>{h || "Action"}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="py-12 text-center" style={{ color: "#9A8E82" }}>Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="py-12 text-center" style={{ color: "#9A8E82" }}>
                    No leads found.{" "}
                    {filter !== "all" && <button onClick={() => setFilter("all")} className="underline" style={{ color: "#2D4A3E" }}>Show all</button>}
                  </td></tr>
                ) : filtered.map((lead) => {
                  const status = PROJECT_STATUSES.find((s) => s.id === lead.status);
                  const colors = STATUS_COLORS[lead.status] || { bg: "#F3F4F6", text: "#374151" };
                  return (
                    <tr key={lead.id} style={{ borderBottom: "1px solid #EDE7DE" }} className="hover:bg-sand-50/50">
                      <td className="py-3 px-5 font-semibold" style={{ color: "#2A2520" }}>{lead.customerName}</td>
                      <td className="py-3 px-5 hidden md:table-cell">
                        <div style={{ color: "#6B5F54" }}>{lead.email}</div>
                        <div className="text-xs" style={{ color: "#B5AA9F" }}>{lead.phone}</div>
                      </td>
                      <td className="py-3 px-5 hidden lg:table-cell" style={{ color: "#6B5F54" }}>{lead.city}, {lead.state}</td>
                      <td className="py-3 px-5" style={{ color: "#6B5F54" }}>{formatBudget(lead.budgetRange)}</td>
                      <td className="py-3 px-5">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: colors.bg, color: colors.text }}>
                          {status?.label || lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-xs hidden md:table-cell" style={{ color: "#B5AA9F" }}>
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-5 text-right">
                        <Link href={`/admin/project/${lead.id}`} className="text-sm font-semibold" style={{ color: "#2D4A3E" }}>
                          View &rarr;
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatBudget(range: string) {
  const map: Record<string, string> = { "5k_10k": "$5K–$10K", "10k_20k": "$10K–$20K", "20k_50k": "$20K–$50K", "50k_plus": "$50K+", "not_sure": "Not Sure" };
  return map[range] || range;
}

function getDemoLeads(): Lead[] {
  return [
    { id: "demo-1", customerName: "John Smith", email: "john@example.com", phone: "(555) 123-4567", city: "Los Angeles", state: "CA", status: "new_lead", budgetRange: "20k_50k", createdAt: new Date().toISOString() },
    { id: "demo-2", customerName: "Sarah Johnson", email: "sarah@example.com", phone: "(555) 987-6543", city: "San Diego", state: "CA", status: "contacted", budgetRange: "10k_20k", createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: "demo-3", customerName: "Mike Williams", email: "mike@example.com", phone: "(555) 456-7890", city: "Phoenix", state: "AZ", status: "quoted", budgetRange: "50k_plus", createdAt: new Date(Date.now() - 172800000).toISOString() },
  ];
}
