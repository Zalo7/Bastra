"use client";

import { useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
  company: string; // honeypot
};

type ErrorState = Partial<Record<keyof Omit<FormState, "company">, string>>;

export default function ContactUs() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
    company: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [status, setStatus] = useState<"" | "sending" | "ok" | "error">("");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (f: FormState): ErrorState => {
    const e: ErrorState = {};
    if (!f.name.trim()) e.name = "Ingresá tu nombre.";
    if (!f.phone.trim()) e.phone = "Ingresá tu celular.";
    else if (!/^[0-9+\s()-]{6,}$/.test(f.phone)) e.phone = "Formato de celular inválido.";
    if (!f.email.trim()) e.email = "Ingresá tu correo.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Correo inválido.";
    if (!f.message.trim()) e.message = "Contanos sobre tu proyecto.";
    return e;
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));

    // limpieza rápida del error de ese campo
    if (errors[name as keyof ErrorState]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ErrorState];
        return next;
      });
    }
  };

  const focusFirstError = (e: ErrorState) => {
    const firstKey = Object.keys(e)[0];
    if (!firstKey) return;
    const el = document.getElementById(`field-${firstKey}`);
    if (el?.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
    if ((el as HTMLInputElement | HTMLTextAreaElement)?.focus) {
      (el as HTMLInputElement | HTMLTextAreaElement).focus();
    }
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setStatus("");
    setErrorMsg("");

    const v = validate(form);
    if (Object.keys(v).length) {
      setErrors(v);
      setStatus("error");
      setErrorMsg("Completá los campos requeridos.");
      focusFirstError(v);
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", phone: "", email: "", message: "", company: "" });
        setErrors({});
        setErrorMsg("");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(
          data?.error || "No se pudo enviar el mensaje. Probá nuevamente en unos segundos."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("No se pudo enviar el mensaje. Revisá tu conexión e intentá de nuevo.");
    }
  };

  const baseInput =
    "w-full rounded-lg border p-3 outline-none ring-0 focus:ring-2";
  const okBorder = "border-[#810010] focus:ring-[#810010]";
  const errBorder = "border-red-600 focus:ring-red-600";

  return (
    <section className="min-h-screen bg-[url('/images/fondo-para-el-sitio-web.jpg')] bg-cover bg-center flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#810010] bg-[#edebdd] p-8 shadow-lg">
        <h2 className="mb-6 text-center font-[PT-Bold] text-3xl text-[#810010]">
          ¡Contactanos!
        </h2>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {/* Honeypot */}
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          {/* Nombre */}
          <label className="block">
            <span className="mb-1 block text-sm text-[#810010]">Nombre</span>
            <input
              id="field-name"
              type="text"
              name="name"
              required
              placeholder="Tu nombre"
              value={form.name}
              onChange={onChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
              className={`${baseInput} ${errors.name ? errBorder : okBorder}`}
            />
            {errors.name && (
              <small id="err-name" className="mt-1 block text-sm text-red-700">
                {errors.name}
              </small>
            )}
          </label>

          {/* Celular */}
          <label className="block">
            <span className="mb-1 block text-sm text-[#810010]">Celular</span>
            <input
              id="field-phone"
              type="tel"
              name="phone"
              required
              placeholder="+54 9 ..."
              value={form.phone}
              onChange={onChange}
              pattern="^[0-9+\s()-]{6,}$"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "err-phone" : undefined}
              className={`${baseInput} ${errors.phone ? errBorder : okBorder}`}
            />
            {errors.phone && (
              <small id="err-phone" className="mt-1 block text-sm text-red-700">
                {errors.phone}
              </small>
            )}
          </label>

          {/* Correo */}
          <label className="block">
            <span className="mb-1 block text-sm text-[#810010]">Correo</span>
            <input
              id="field-email"
              type="email"
              name="email"
              required
              placeholder="tu@email.com"
              value={form.email}
              onChange={onChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              className={`${baseInput} ${errors.email ? errBorder : okBorder}`}
            />
            {errors.email && (
              <small id="err-email" className="mt-1 block text-sm text-red-700">
                {errors.email}
              </small>
            )}
          </label>

          {/* Mensaje */}
          <label className="block">
            <span className="mb-1 block text-sm text-[#810010]">Mensaje</span>
            <textarea
              id="field-message"
              name="message"
              required
              rows={5}
              placeholder="Contanos sobre tu proyecto"
              value={form.message}
              onChange={onChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "err-message" : undefined}
              className={`${baseInput} ${errors.message ? errBorder : okBorder} resize-y`}
            />
            {errors.message && (
              <small id="err-message" className="mt-1 block text-sm text-red-700">
                {errors.message}
              </small>
            )}
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-lg bg-[#810010] py-3 font-[PT-Bold] text-[#edebdd] transition-colors disabled:opacity-60 hover:bg-[#5e000c]"
          >
            {status === "sending" ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#edebdd]/40 border-t-[#edebdd]" />
                Enviando…
              </span>
            ) : (
              "Enviar"
            )}
          </button>

          <div aria-live="polite" className="min-h-[1.5rem] text-center">
            {status === "ok" && (
              <p className="text-green-700">¡Mensaje enviado! Te respondemos pronto.</p>
            )}
            {status === "error" && (
              <p className="text-red-700">{errorMsg}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
