'use server';

import { z } from 'zod';
import prisma from '@/src/lib/prisma';
import { contactSchema } from '@/src/lib/zod';
import { escapeHtml, sendEmail } from '@/src/lib/email';
import { env } from '@/src/lib/env';

type ContactInput = z.infer<typeof contactSchema>;

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
  values?: ContactInput;
};

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: hidden field that real users never fill in.
  if (formData.get('website')) {
    return { status: 'success', message: 'Message sent successfully!' };
  }

  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    subject: String(formData.get('subject') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: ContactFormState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactInput;
      fieldErrors[field] ??= issue.message;
    }
    return { status: 'error', message: 'Please check your input.', fieldErrors, values };
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await prisma.contact.create({
      data: { name, email, subject, message },
    });
  } catch (error) {
    console.error('Failed to store contact request', error);
    return { status: 'error', message: 'Failed to send message. Please try again later.', values };
  }

  try {
    await sendEmail({
      to: env.NEXT_PUBLIC_CONTACT_EMAIL || 'your-email@example.com',
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

  return { status: 'success', message: 'Message sent successfully!' };
}
