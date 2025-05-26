import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    if (!body.to || !body.subject || (!body.text && !body.html)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILEROO_API_KEY;
    const fromEmail = process.env.EMAIL_FROM;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    if (!fromEmail) {
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    const mailerooApiUrl = "https://smtp.maileroo.com/send";
    const formData = new FormData();

    formData.append("from", fromEmail);
    formData.append("to", body.to);
    formData.append("subject", body.subject);
    if (body.text) formData.append("plain", body.text);
    if (body.html) formData.append("html", body.html);

    const response = await fetch(mailerooApiUrl, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return NextResponse.json(
        { error: result.message || 'Failed to send email' },
        { status: response.status }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: result.message 
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 