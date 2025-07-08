// lib/email.ts
import nodemailer from 'nodemailer';

// إنشاء transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // لا تستخدم NEXT_PUBLIC لأنها ستكون مكشوفة في المتصفح
    pass: process.env.EMAIL_PASS,
  },
});

// تعريف نوع البراميتر
interface SendConfirmationEmailProps {
  email: string;
  verificationCode: string;
}

// دالة إرسال الإيميل
export const sendConfirmationEmail = async ({
  email,
  verificationCode,
}: SendConfirmationEmailProps): Promise<void> => {
  try {
    const mailOptions = {
      from: `"Aber App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Aber - Email Verification',
      text: `Hi there,

Thank you for joining Aber! 🎉

Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Confirmation email sent successfully');
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
    throw error;
  }
};
