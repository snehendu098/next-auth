import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // console.log(reqBody);

    // check if user exits
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exits" });
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPass,
    });

    const savedUser = await newUser.save();
    //    console.log(savedUser);
    //    send email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "Created User Succesfully",
      success: true,
      savedUser,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
