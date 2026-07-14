"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import { PHOTO_LABELS } from "@/lib/constants";

interface UploadedPhoto {
  file: File;
  preview: string;
  label: string;
}

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  function addFiles(files: FileList | null) {
    if (!files) return;
    setError("");
    const newPhotos: UploadedPhoto[] = [];
    const currentCount = photos.length;
    for (let i = 0; i < files.length && currentCount + newPhotos.length < 10; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 10 * 1024 * 1024) {
        setError("Each photo must be under 10MB.");
        continue;
      }
      const label = PHOTO_LABELS[currentCount + newPhotos.length] || `Photo ${currentCount + newPhotos.length + 1}`;
      newPhotos.push({ file, preview: URL.createObjectURL(file), label });
    }
    setPhotos((prev) => [...prev, ...newPhotos]);
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleContinue() {
    if (photos.length < 3) {
      setError("Please upload at least 3 photos of your backyard.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      photos.forEach((p) => {
        formData.append("photos", p.file);
        formData.append("labels", p.label);
      });

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed. Please try again.");
        setUploading(false);
        return;
      }

      sessionStorage.setItem("projectPhotos", JSON.stringify(data.uploaded));
      router.push("/design-preferences");
    } catch {
      setError("Upload failed. Please check your connection and try again.");
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F3" }}>
      <Header />
      <StepIndicator current={2} />

      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-normal mb-2" style={{ color: "#1B3A2D" }}>
            Show us your space.
          </h1>
          <p style={{ color: "#9A8E82" }}>
            Upload 3–10 photos from different angles for the best results.
          </p>
        </div>

        {/* Photo Guide */}
        <div className="card p-5 mb-6" style={{ background: "#EEF4F0", border: "1px solid #D5E5DA" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#1B3A2D" }}>
            Recommended angles
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {PHOTO_LABELS.map((label) => (
              <div key={label} className="flex items-center gap-2 text-sm" style={{ color: "#5B7F63" }}>
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Drop Zone */}
        <div
          className={`card p-12 text-center cursor-pointer transition-all mb-6 border-2 border-dashed ${
            dragOver ? "border-forest-500 bg-forest-50" : "border-sand-300 hover:border-sand-500"
          } ${uploading ? "pointer-events-none opacity-50" : ""}`}
          style={{ borderRadius: 16 }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => addFiles(e.target.files)} />
          <div className="w-14 h-14 mx-auto mb-4 bg-forest-50 rounded-2xl flex items-center justify-center">
            <svg className="w-7 h-7 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 3.75 3.75 0 013.07 5.592M6.75 19.5H17.25" />
            </svg>
          </div>
          <p className="font-semibold mb-1" style={{ color: "#2A2520" }}>
            Drop photos here or click to browse
          </p>
          <p className="text-sm" style={{ color: "#9A8E82" }}>
            JPG, PNG up to 10MB each &middot; {photos.length}/10 uploaded
          </p>
        </div>

        {error && (
          <div className="text-sm px-4 py-3 rounded-xl mb-6" style={{ background: "#FEF2F2", color: "#DC2626" }}>
            {error}
          </div>
        )}

        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {photos.map((photo, i) => (
              <div key={i} className="relative group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden" style={{ background: "#EDE7DE" }}>
                  <img src={photo.preview} alt={photo.label} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                  {photo.label}
                </div>
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={() => router.back()} className="btn-secondary flex-1" disabled={uploading}>Back</button>
          <button onClick={handleContinue} className="btn-primary flex-1" disabled={uploading}>
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Uploading photos...
              </>
            ) : (
              "Continue to design preferences"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
