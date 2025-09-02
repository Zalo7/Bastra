import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name: string;
  phone?: string;
  email: string;
  message: string;
  company?: string; // honeypot
};

const isEmail = (x: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x || "");
const esc = (s: string) =>
  String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

export function GET() {
  return NextResponse.json({ ok: true, route: "/api/contact" });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const name = body.name?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const company = body.company?.trim() ?? "";

    if (company) return NextResponse.json({ ok: true }); // honeypot

    if (!name || !phone || !email || !message) {
      return NextResponse.json({ error: "Completá todos los campos requeridos." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "El correo no es válido." }, { status: 400 });
    }

    const KEY = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO ?? "bastrastudio@gmail.com";
    const FROM = process.env.CONTACT_FROM ?? "onboarding@resend.dev";

    if (!KEY) {
      console.error("❌ Falta RESEND_API_KEY");
      return NextResponse.json({ error: "Config de envío no disponible." }, { status: 500 });
    }

    const resend = new Resend(KEY);

    const html = `
      <h2>Nuevo contacto desde bastrastudio.com</h2>
      <p><b>Nombre:</b> ${esc(name)}</p>
      <p><b>Email:</b> ${esc(email)}</p>
      <p><b>Teléfono:</b> ${esc(phone)}</p>
      <p><b>Mensaje:</b><br/>${esc(message).replace(/\n/g, "<br/>")}</p>
    `;

    // Envío a Bastra
    const { data, error } = await resend.emails.send({
      from: `Bastra Website <${FROM}>`,
      to: [TO],
      replyTo: email,
      subject: `Nuevo contacto: ${name}`,
      html,
    });
    if (error) {
      console.error("❌ Resend:", error);
      return NextResponse.json({ error: "No se pudo enviar el email." }, { status: 502 });
    }
    console.log("✅ Resend id:", data?.id);

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
    console.error("❌ Handler:", e);
    return NextResponse.json({ error: "No se pudo enviar el mensaje. Probá nuevamente." }, { status: 500 });
  }
}
