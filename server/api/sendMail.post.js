import { readBody } from 'h3';
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
    try {
        // Используем readBody вместо useBody для получения тела запроса
        const body = await readBody(event);
        const { fullname, mail, phone, message } = body;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: 'shakhzod@melbournemasterworks.com.au',
            subject: 'Новая заявка с сайта',
            text: `Имя: ${fullname}\nEmail: ${mail}\nТелефон: ${phone}\nСообщение: ${message}`,
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, info };
    } catch (error) {
        console.error('Ошибка при отправке почты:', error);
        return { success: false, error: error.message };
    }
});