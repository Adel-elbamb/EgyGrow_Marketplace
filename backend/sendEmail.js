import nodemailer from "nodemailer.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: `"EgyGrow Test" <${process.env.EMAIL_USER}>`,
  to: "ao268314@gmail.com", // غيره لبريدك عشان تشوف الرسالة
  subject: "Test Email from EgyGrow App",
  html: `<h1>Hello!</h1><p>This is a test email from your Node.js app.</p>`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("❌ Error:", error);
  } else {
    console.log("✅ Email sent:", info.response);
  }
});

// import nodemailer from "nodemailer";

// export const sendEmail = async (to, subject, htmlContent) => {
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"EgyGrow" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html: htmlContent,
//   };

//   await transporter.sendMail(mailOptions);
// };
