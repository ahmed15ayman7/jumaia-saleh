"use server";
import nodemailer from "nodemailer";

export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  const transport = nodemailer.createTransport({
    host: "smtp.hostinger.com", // عنوان خادم SMTP الخاص بـ Hostinger
    port: 465, // عادةً ما يكون 465 لـ SSL أو 587 لـ TLS
    secure: true, // true إذا كنت تستخدم SSL
    auth: {
      user: EMAIL_USER, // الإيميل الخاص بك (info@bezrah.org)
      pass: EMAIL_PASS, // كلمة المرور الخاصة بالإيميل
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("SMTP Configuration Verified:", testResult);
  } catch (error) {
    console.error("SMTP Verification Failed:", { error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      html: body,
    });
    console.log("Email Sent Successfully:", sendResult);
  } catch (error) {
    console.error("Failed to Send Email:", error);
  }
}