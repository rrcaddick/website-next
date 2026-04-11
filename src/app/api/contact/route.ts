import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildEmailHtml } from "@/lib/email/buildEmailHtml";
import { buildEmailText } from "@/lib/email/buildEmailText";

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

  // Subject with variable replacement
  const subject = formConfig.subjectTemplate.replace(
    /\{\{(.*?)\}\}/g,
    (_, key) => (fields[key.trim()] as string) || "",
  );

  // Build text (fallback)
  const text = buildEmailText(fields as Record<string, string>);

  // Build HTML
  const html = `
      <p style="font-family:Arial,sans-serif;">${emailTemplate.intro}</p>
      ${buildEmailHtml(fields as Record<string, string>)}
      <p style="font-family:Arial,sans-serif;">${emailTemplate.footer}</p>
    `;

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
      text, // fallback
      html, // 👈 THIS is the upgrade
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
