import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  formConfig: {
    recipientEmail: string;
    subjectTemplate: string;
    successMessage: string;
    errorMessage: string;
  };
  emailTemplate: {
    intro: string;
    footer: string;
  };
  [key: string]: unknown;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ContactPayload;
  const { formConfig, emailTemplate, ...fields } = body;

  if (!fields.email || !fields.name) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const subject = formConfig.subjectTemplate.replace("{{name}}", typeof fields.name === "string" ? fields.name : "");

  const fieldLines = Object.entries(fields)
    .map(([key, val]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
      return `${label}: ${val}`;
    })
    .join("\n");

  const text = `${emailTemplate.intro}\n\n${fieldLines}\n\n${emailTemplate.footer}`;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: formConfig.recipientEmail || process.env.EMAIL_USER,
      replyTo: typeof fields.email === "string" ? fields.email : undefined,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
