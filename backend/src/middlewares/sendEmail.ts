import nodemailer from 'nodemailer';

interface sendEmailProps {
  email: string;
  token: string;
}

export default async function sendEmail(props: sendEmailProps) {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: Number(process.env.PORT),
    auth: {
      user: process.env.USERT,
      pass: process.env.PASS
    }
  });


  const info = await transporter.sendMail({
    from: 'Happy Support <happy@suport.com>',
    to: props.email,
    subject: 'Recuperação de senha ✔',
    text: `Olá aqui está o token para recuperar sua senha: ${props.token}`,
    html: `Olá aqui está o token para recuperar sua senha: <b>${props.token}</b>.`
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} 
