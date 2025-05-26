import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      },
    });

    // Send email notification via email API route
    const emailResponse = await fetch(`${process.env.BETTER_AUTH_URL}/api/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'your-email@example.com',
        subject: `New Contact Request: ${body.subject}`,
        html: `
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Subject:</strong> ${body.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message}</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
        console.error('Failed to send notification email');
    }

    return NextResponse.json(contact);
  } catch {
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
} 