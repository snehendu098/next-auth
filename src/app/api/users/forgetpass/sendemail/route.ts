import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "No User Found", success: false });
    }

    await sendEmail({
      email,
      emailType: "FORGOT",
      userId: user?._id?.toString(),
    });
    return NextResponse.json({ message: "Email has been sent", success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
