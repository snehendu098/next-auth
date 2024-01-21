import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else {
      const user = await User.findOne({ email });

      await User.findByIdAndUpdate(user._id, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: "roy@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "updatepass"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}<br>Or copy and paste the link in your browser: ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "updatepass"}?token=${hashedToken}</p>`,
    };

    const mailres = transport.sendMail(mailOptions);

    return mailres;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
