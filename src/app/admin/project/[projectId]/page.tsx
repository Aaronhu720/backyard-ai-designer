"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import AdminGuard from "@/components/AdminGuard";
import { PROJECT_STATUSES } from "@/lib/constants";

interface ProjectDetail {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  backyardSize: string;
  currentCondition: string;
  selectedStyles: string[];
  selectedFeatures: string[];
  budgetRange: string;
  status: string;
  createdAt: string;
  images: { id: string; imageUrl: string; imageType: string; label?: string }[];
  estimates: { lowEstimate: number; highEstimate: number; estimateDetailsJson: string }[];
  notes: { id: string; note: string; createdAt: string }[];
}

export default function AdminProjectDetailPage() {
  return (
    <AdminGuard>
      <ProjectDetail />
    </AdminGuard>
  );
}

function ProjectDetail() {
  const { projectId } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => { setProject(data); setStatus(data.status); setLoading(false); })
      .catch(() => { setProject(getDemoDetail()); setStatus("new_lead"); setLoading(false); });
  }, [projectId]);

  async function updateStatus(newStatus: string) {
    setStatus(newStatus);
    try { await fetch(`/api/projects/${projectId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus }) }); } catch {}
  }

  async function addNote() {
    if (!newNote.trim()) return;
    try {
      await fetch(`/api/projects/${projectId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ addNote: newNote }) });
      if (project) setProject({ ...project, notes: [...project.notes, { id: Date.now().toString(), note: newNote, createdAt: new Date().toISOString() }] });
      setNewNote("");
    } catch {}
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F3" }}>
      <div className="animate-spin w-8 h-8 border-4 border-t-transparent rounded-full" style={{ borderColor: "#2D4A3E", borderTopColor: "transparent" }} />
    </div>
  );
  if (!project) return null;

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F3" }}>
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <button onClick={() => router.push("/admin")} className="flex items-center gap-2 text-sm mb-6 transition-colors" style={{ color: "#9A8E82" }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl font-normal" style={{ color: "#1B3A2D" }}>{project.customerName}</h1>
            <p className="text-sm" style={{ color: "#9A8E82" }}>{project.address}, {project.city}, {project.state} {project.zipCode}</p>
          </div>
          <select
            value={status}
            onChange={(e) => updateStatus(e.target.value)}
            className="input-field w-auto text-sm py-2"
          >
            {PROJECT_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Contact */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-normal mb-4" style={{ color: "#1B3A2D" }}>Contact information</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Email", value: project.email },
                  { label: "Phone", value: project.phone },
                  { label: "Address", value: `${project.address}, ${project.city}, ${project.state} ${project.zipCode}` },
                  { label: "Submitted", value: new Date(project.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
                ].map((f) => (
                  <div key={f.label}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9A8E82" }}>{f.label}</span>
                    <p className="font-medium mt-0.5" style={{ color: "#2A2520" }}>{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-normal mb-4" style={{ color: "#1B3A2D" }}>Design preferences</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9A8E82" }}>Backyard</span>
                  <p className="font-medium mt-0.5 capitalize" style={{ color: "#2A2520" }}>{project.backyardSize} &middot; {project.currentCondition}</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9A8E82" }}>Styles</span>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {project.selectedStyles.map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full capitalize" style={{ background: "#EEF4F0", color: "#2D4A3E" }}>{s.replace(/_/g, " ")}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9A8E82" }}>Features</span>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {project.selectedFeatures.map((f) => (
                      <span key={f} className="text-xs px-2.5 py-1 rounded-full capitalize" style={{ background: "#FAF7F3", color: "#6B5F54", border: "1px solid #EDE7DE" }}>{f.replace(/_/g, " ")}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-normal mb-4" style={{ color: "#1B3A2D" }}>
                Photos ({project.images.filter((i) => i.imageType === "uploaded").length} uploaded, {project.images.filter((i) => i.imageType === "generated").length} generated)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.images.map((img) => (
                  <div key={img.id} className="relative">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden" style={{ background: "#EDE7DE" }}>
                      <img src={img.imageUrl} alt={img.label || "Photo"} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={img.imageType === "generated" ? { background: "#2D4A3E", color: "white" } : { background: "rgba(0,0,0,0.5)", color: "white" }}>
                        {img.imageType === "generated" ? "AI Generated" : "Uploaded"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {project.estimates.length > 0 && (
              <div className="card p-6">
                <h2 className="font-display text-lg font-normal mb-4" style={{ color: "#1B3A2D" }}>Estimate</h2>
                <div className="text-center p-4 rounded-xl" style={{ background: "#EEF4F0" }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#5B7F63" }}>Total range</p>
                  <p className="text-lg font-bold font-mono" style={{ color: "#2D4A3E" }}>
                    ${project.estimates[0].lowEstimate.toLocaleString()} – ${project.estimates[0].highEstimate.toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            <div className="card p-6">
              <h2 className="font-display text-lg font-normal mb-4" style={{ color: "#1B3A2D" }}>Notes</h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {project.notes.length === 0 && <p className="text-sm" style={{ color: "#B5AA9F" }}>No notes yet.</p>}
                {project.notes.map((note) => (
                  <div key={note.id} className="p-3 rounded-xl text-sm" style={{ background: "#FAF7F3" }}>
                    <p style={{ color: "#4A4340" }}>{note.note}</p>
                    <p className="text-xs mt-1" style={{ color: "#B5AA9F" }}>{new Date(note.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addNote()}
                  placeholder="Add a note..."
                  className="input-field text-sm py-2"
                />
                <button onClick={addNote} className="btn-primary py-2 px-4 text-sm">Add</button>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-lg font-normal mb-4" style={{ color: "#1B3A2D" }}>Quick actions</h2>
              <div className="space-y-2">
                <a href={`mailto:${project.email}`} className="btn-secondary w-full text-sm py-2.5 justify-center">Send email</a>
                <a href={`tel:${project.phone}`} className="btn-secondary w-full text-sm py-2.5 justify-center">Call customer</a>
                <button onClick={() => router.push(`/result/${project.id}`)} className="btn-secondary w-full text-sm py-2.5 justify-center">View design result</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getDemoDetail(): ProjectDetail {
  return {
    id: "demo-1", customerName: "John Smith", email: "john@example.com", phone: "(555) 123-4567",
    address: "1234 Oak Avenue", city: "Los Angeles", state: "CA", zipCode: "90210",
    backyardSize: "medium", currentCondition: "Old patio",
    selectedStyles: ["modern", "family_friendly"],
    selectedFeatures: ["patio_pavers", "artificial_turf", "pergola", "patio_heater", "landscape_lighting"],
    budgetRange: "20k_50k", status: "new_lead", createdAt: new Date().toISOString(),
    images: [
      { id: "1", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400", imageType: "uploaded", label: "Wide view" },
      { id: "2", imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400", imageType: "generated", label: "Concept 1" },
      { id: "3", imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400", imageType: "generated", label: "Concept 2" },
    ],
    estimates: [{ lowEstimate: 15300, highEstimate: 44240, estimateDetailsJson: "{}" }],
    notes: [{ id: "n1", note: "Customer called, interested in the Modern Patio concept.", createdAt: new Date().toISOString() }],
  };
}
