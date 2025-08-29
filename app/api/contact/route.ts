import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { name, email, company, phone, service, message } = formData;
    
    // Validate inputs
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create transport using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // App password, not your regular password
      },
    });
    
    // Format service name for better readability
    const serviceName = service.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    
    // Create email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Can be the same as EMAIL_USER
      replyTo: email,
      subject: `New Contact Form Submission from the Rkicy.com Website: ${serviceName}`,
      html: `
<h2>New Contact Form Submission from the Rkicy.com Website: ${serviceName}</h2>
<p><strong>Service:</strong> ${serviceName}</p>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    // Generate reference number
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    const referenceNumber = `RKY-${timestamp.toString().slice(-6)}-${random}`;
    
    console.log('Message sent: %s', info.messageId);
    
    return NextResponse.json({ 
      success: true, 
      message: "Form submitted successfully", 
      referenceNumber 
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}