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

export async function sendConfirmationEmail(to: string, name: string, date: string, time: string, status: string = 'confirmed') {
  const isConfirmed = status === 'confirmed';
  
  const mailOptions = {
    from: `"Derya Yurdusay Nail Art" <${process.env.EMAIL_USER}>`,
    to,
    subject: isConfirmed ? 'Randevunuz Onaylandı! - Derya Yurdusay Nail Art' : 'Randevu Güncellemesi - Derya Yurdusay Nail Art',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #2D1B22; background-color: #FFF5F7;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 30px; overflow: hidden; box-shadow: 0 20px 40px rgba(212, 90, 138, 0.1);">
          <div style="padding: 40px; text-align: center; background: ${isConfirmed ? '#D45A8A' : '#666'};">
            <h1 style="color: white; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">
              ${isConfirmed ? 'Randevu Onayı' : 'Randevu Bilgilendirme'}
            </h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #D45A8A; margin-top: 0;">Merhaba ${name},</h2>
            <p style="line-height: 1.6; font-size: 16px;">
              ${isConfirmed 
                ? 'Harika haberler! Derya Yurdusay Nail Art Studio\'daki randevunuz başarıyla onaylandı. Sizinle tanışmak için sabırsızlanıyoruz.' 
                : 'Maalesef randevunuz şu anda onaylanamadı veya iptal edildi. Başka bir zaman dilimi için tekrar deneyebilir veya bizimle iletişime geçebilirsiniz.'}
            </p>
            
            <div style="background: #FDF2F8; border-left: 5px solid #D45A8A; padding: 25px; border-radius: 15px; margin: 30px 0;">
              <p style="margin: 0 0 10px 0;"><strong>Tarih:</strong> ${date}</p>
              <p style="margin: 0;"><strong>Saat:</strong> ${time}</p>
            </div>

            <p style="font-size: 14px; color: #666; font-style: italic;">
              * Not: Randevunuza 10 dakika önceden gelmeniz, işleminizden maksimum verim almanızı sağlar.
            </p>

            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #EEE; text-align: center;">
              <p style="margin: 0; font-weight: bold;">Derya Yurdusay Nail Art Studio</p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #AAA;">Üçtutlar Mah. Osmancık Cd. Çorum</p>
            </div>
          </div>
        </div>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}
