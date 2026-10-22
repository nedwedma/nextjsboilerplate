import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { contactSchema } from '@/src/lib/zod';
import { escapeHtml, sendEmail } from '@/src/lib/email';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid contact form data', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const contact = await prisma.contact.create({
      data: { name, email, subject, message },
    });

    try {
      await sendEmail({
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'your-email@example.com',
        subject: `New Contact Request: ${subject}`,
        html: `
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
        `,
      });
    } catch (error) {
      console.error('Failed to send contact notification email', error);
    }

    return NextResponse.json({ id: contact.id });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
