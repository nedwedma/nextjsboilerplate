import { env } from "@/src/lib/env";

const MAILEROO_API_URL = "https://smtp.maileroo.com/send";

export type SendEmailParams = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendEmail({ to, subject, text, html }: SendEmailParams) {
  const apiKey = env.MAILEROO_API_KEY;
  const fromEmail = env.EMAIL_FROM;

  if (!apiKey || !fromEmail) {
    throw new Error("Email service is not configured (MAILEROO_API_KEY, EMAIL_FROM)");
  }
  if (!text && !html) {
    throw new Error("Email requires a text or html body");
  }

  const formData = new FormData();
  formData.append("from", fromEmail);
  formData.append("to", to);
  formData.append("subject", subject);
  if (text) formData.append("plain", text);
  if (html) formData.append("html", html);

  const response = await fetch(MAILEROO_API_URL, {
    method: "POST",
    headers: { "X-API-Key": apiKey },
    body: formData,
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || `Failed to send email (status ${response.status})`);
  }
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
