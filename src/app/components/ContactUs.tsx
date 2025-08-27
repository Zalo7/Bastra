"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent!");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("Error sending message");
      }
    } catch (err) {
      setStatus("Error sending message");
    }
  };

  return (
    <section className="min-h-screen bg-[url('/images/fondo-para-el-sitio-web.jpg')] flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full bg-[#edebdd] p-8 rounded-2xl shadow-lg border border-[#810010]">
        <h2 className="text-3xl font-bold text-[#810010] mb-6 text-center">Contactanos!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tu Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[#810010] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#810010]"
          />
           <input
            type="text"
            name="phone"
            placeholder="Tu Celular"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[#810010] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#810010]"
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[#810010] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#810010]"
          />
          <textarea
            name="message"
            placeholder="Contanos sobre tu proyecto"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-3 border border-[#810010] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#810010]"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#810010] text-[#EDEBDD] font-bold py-3 rounded-lg hover:bg-[#5e000c] transition-colors"
          >
            Enviar
          </button>
        </form>
        {status && <p className="text-center mt-4 text-[#810010]">{status}</p>}
      </div>
    </section>
  );
}
