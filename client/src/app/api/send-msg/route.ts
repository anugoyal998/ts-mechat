import { pool } from "@/db";
import { sessionGaurd } from "@/lib/sessionGaurd";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  return sessionGaurd(request, async (request, err, session) => {
    const userId = session.getUserId();
    const body = await request.json();
    const schema = z
      .object({
        reciever: z.string(),
        msg: z.string(),
        msgType: z.string(),
        id: z.string().uuid(),
        createdat: z.string(),
      })
      .strict();
    const { reciever, msg, msgType, id, createdat } = schema.parse(body);
    await pool.query(
      `insert into chattable (sender, reciever, msg, msgType, id, createdat) values ($1,$2,$3,$4,$5,$6)`,
      [userId, reciever, msg, msgType, id, createdat]
    );
    return NextResponse.json("OK", { status: 200 });
  });
}
