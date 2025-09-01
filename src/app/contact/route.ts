import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = { name: string; phone?: string; email: string; message: string; company?: string };

function esc(s: string) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    // Honeypot
    if (body.company) return NextResponse.json({ ok: true });

    const { name, phone = "", email, message } = body;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
    if (!name || !emailOk || !message) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const TO = process.env.CONTACT_TO ?? "bastrastudio@gmail.com";
    const FROM = process.env.CONTACT_FROM ?? "noreply@bastrastudio.com";
    const KEY = process.env.RESEND_API_KEY;

    // Si no hay API key, no falles: acepta el mensaje
    if (!KEY) {
      console.log("Contacto recibido (sin Resend):", body);
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(KEY);

    const html = `
      <h2>Nuevo contacto desde bastrastudio.com</h2>
      <p><b>Nombre:</b> ${esc(name)}</p>
      <p><b>Email:</b> ${esc(email)}</p>
      <p><b>Teléfono:</b> ${esc(phone)}</p>
      <p><b>Mensaje:</b><br/>${esc(message).replace(/\n/g,"<br/>")}</p>
    `;

    // 📩 a Bastra
    await resend.emails.send({
      from: `Bastra Website <${FROM}>`,
      to: [TO],
      replyTo: email,            // ← FIX aquí
      subject: `Nuevo contacto: ${name}`,
      html,
    });

    // Auto-reply (opcional)
    if (process.env.SEND_AUTOREPLY !== "false") {
      await resend.emails.send({
        from: `Bastra Studio <${FROM}>`,
        to: [email],
        subject: "¡Gracias por contactarnos!",
        html: `<p>Hola ${esc(name)},</p>
               <p>Recibimos tu mensaje y te responderemos a la brevedad.</p>
               <p>— Equipo Bastra</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "No se pudo enviar" }, { status: 500 });
  }
}
