"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import { BACKYARD_SIZES, CURRENT_CONDITIONS } from "@/lib/constants";

export default function StartPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    backyardSize: "",
    currentCondition: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.customerName.trim()) errs.customerName = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state.trim()) errs.state = "State is required";
    if (!form.zipCode.trim()) errs.zipCode = "ZIP code is required";
    if (!form.backyardSize) errs.backyardSize = "Select a size";
    if (!form.currentCondition) errs.currentCondition = "Select a condition";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    sessionStorage.setItem("projectForm", JSON.stringify(form));
    router.push("/upload");
  }

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F3" }}>
      <Header />
      <StepIndicator current={1} />

      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-normal mb-2" style={{ color: "#1B3A2D" }}>
            Tell us about your backyard.
          </h1>
          <p style={{ color: "#9A8E82" }}>
            A few property details help us shape recommendations to your space and local context.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          {/* Main form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact fields */}
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { field: "customerName", label: "Full name", placeholder: "Taylor Morgan", type: "text" },
                { field: "email", label: "Email", placeholder: "taylor@example.com", type: "email" },
                { field: "phone", label: "Phone", placeholder: "(512) 555-0184", type: "tel" },
                { field: "address", label: "Property address", placeholder: "1800 Garden Lane", type: "text", full: true },
                { field: "city", label: "City", placeholder: "Austin", type: "text" },
                { field: "state", label: "State", placeholder: "TX", type: "text" },
                { field: "zipCode", label: "ZIP code", placeholder: "78701", type: "text" },
              ].map((f) => (
                <div key={f.field} className={"full" in f ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#2A2520" }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    className={`input-field ${errors[f.field] ? "!border-red-400" : ""}`}
                    placeholder={f.placeholder}
                    value={form[f.field as keyof typeof form]}
                    onChange={(e) => update(f.field, e.target.value)}
                  />
                  {errors[f.field] && (
                    <p className="text-red-500 text-xs mt-1">{errors[f.field]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Backyard Size */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: "#2A2520" }}>
                How large is the backyard?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {BACKYARD_SIZES.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => update("backyardSize", size.id)}
                    className={`chip ${form.backyardSize === size.id ? "chip-active" : ""} flex items-center gap-2 justify-center`}
                  >
                    <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      form.backyardSize === size.id ? "border-forest-500" : "border-sand-400"
                    }`}>
                      {form.backyardSize === size.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-forest-500" />
                      )}
                    </span>
                    {size.label}
                  </button>
                ))}
              </div>
              {errors.backyardSize && (
                <p className="text-red-500 text-xs mt-1">{errors.backyardSize}</p>
              )}
            </div>

            {/* Current Condition */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: "#2A2520" }}>
                What is there today?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CURRENT_CONDITIONS.map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => update("currentCondition", cond)}
                    className={`chip ${form.currentCondition === cond ? "chip-active" : ""} flex items-center gap-2 justify-center`}
                  >
                    <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      form.currentCondition === cond ? "border-forest-500" : "border-sand-400"
                    }`}>
                      {form.currentCondition === cond && (
                        <span className="w-1.5 h-1.5 rounded-full bg-forest-500" />
                      )}
                    </span>
                    {cond}
                  </button>
                ))}
              </div>
              {errors.currentCondition && (
                <p className="text-red-500 text-xs mt-1">{errors.currentCondition}</p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full text-base py-4">
              Continue to photos
            </button>
          </form>

          {/* Trust sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 card p-6 space-y-5" style={{ background: "#FAF7F3", border: "1px solid #EDE7DE" }}>
              <h3 className="font-display text-lg font-normal" style={{ color: "#1B3A2D" }}>
                Your information stays with your project.
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#9A8E82" }}>
                We use these details to organize your design and help our team follow up when you request a consultation. Nothing is shared externally.
              </p>
              <div className="pt-4 border-t" style={{ borderColor: "#EDE7DE" }}>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-forest-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <p className="text-xs leading-relaxed" style={{ color: "#9A8E82" }}>
                    You can refine your design choices before generating concepts.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
