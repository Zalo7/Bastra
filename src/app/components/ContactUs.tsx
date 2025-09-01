"use client";

import { useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
  // honeypot anti-spam (dejar vacío)
  company: string;
};

export default function ContactUs() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
    company: "",
  });
  const [status, setStatus] = useState<"" | "sending" | "ok" | "error">("");
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", { // ⬅️ cambio clave
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", phone: "", email: "", message: "", company: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error || "No pudimos enviar tu mensaje.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Error de red. Intentá de nuevo.");
      setStatus("error");
    }
  };

  return (
    <section className="min-h-screen bg-[url('/images/fondo-para-el-sitio-web.jpg')] bg-cover bg-center flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#810010] bg-[#edebdd] p-8 shadow-lg">
        <h2 className="mb-6 text-center font-[PT-Bold] text-3xl text-[#810010]">
          ¡Contactanos!
        </h2>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {/* Honeypot (oculto para bots) */}
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <label className="block">
            <span className="mb-1 block text-sm text-[#810010]">Nombre</span>
            <input
              type="text"
              name="name"
              required
              placeholder="Tu nombre"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-lg border border-[#810010] p-3 outline-none ring-0 focus:ring-2 focus:ring-[#810010]"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-[#810010]">Celular</span>
            <input
              type="tel"
              name="phone"
              placeholder="+54 9 ..."
              value={form.phone}
              onChange={onChange}
              pattern="^[0-9+\s()-]{6,}$"
              className="w-full rounded-lg border border-[#810010] p-3 outline-none ring-0 focus:ring-2 focus:ring-[#810010]"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-[#810010]">Correo</span>
            <input
              type="email"
              name="email"
              required
              placeholder="tu@email.com"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-lg border border-[#810010] p-3 outline-none ring-0 focus:ring-2 focus:ring-[#810010]"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-[#810010]">Mensaje</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Contanos sobre tu proyecto"
              value={form.message}
              onChange={onChange}
              className="w-full resize-y rounded-lg border border-[#810010] p-3 outline-none ring-0 focus:ring-2 focus:ring-[#810010]"
            />
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
            {status === "error" && <p className="text-red-700">{errorMsg}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
