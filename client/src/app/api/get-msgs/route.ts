import { pool } from "@/db";
import { sessionGaurd } from "@/lib/sessionGaurd";
import { TMSG } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  return sessionGaurd(request, async (request, err, session) => {
    const sender = session.getUserId();
    const schema = z
      .object({
        reciever: z.string(),
      })
      .strict();
    const { reciever } = schema.parse(await request.json());
    const msgs = await pool.query<TMSG[]>(
      `select * from chattable where (sender = $1 and reciever = $2) or (sender = $2 and reciever = $1) order by createdAt limit 10`,
      [sender, reciever]
    );
    return NextResponse.json(msgs.rows);
  });
}
