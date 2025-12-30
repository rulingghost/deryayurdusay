import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendConfirmationEmail(to: string, name: string, date: string, time: string) {
  const mailOptions = {
    from: `"Derya Yurdusay Nail Art" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Randevunuz Onaylandı! - Derya Yurdusay Nail Art',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #D45A8A;">Merhaba ${name},</h2>
        <p>Harika haberler! Randevunuz Derya Yurdusay Nail Art Studio'da onaylandı.</p>
        <div style="background: #FFF9FA; border: 1px solid #D45A8A; padding: 15px; border-radius: 10px; margin: 20px 0;">
          <p><strong>Tarih:</strong> ${date}</p>
          <p><strong>Saat:</strong> ${time}</p>
        </div>
        <p>Sizinle tanışmak için sabırsızlanıyoruz.</p>
        <p>Sevgiler,<br><strong>Derya Yurdusay Nail Art Studio</strong></p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}
