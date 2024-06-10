import { sessionGaurd } from "@/lib/sessionGaurd";
import { NextRequest, NextResponse } from "next/server";
import supertokens from "supertokens-node";

export async function GET(request: NextRequest) {
  return sessionGaurd(request, async (request, err, session) => {
    const userId = session.getUserId();
    let userInfo = await supertokens.getUser(userId);
    if (!userInfo) {
      return NextResponse.json("User not found", { status: 400 });
    }
    return NextResponse.json(userInfo);
  });
}
