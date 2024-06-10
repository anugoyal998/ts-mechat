import { withSession } from "supertokens-node/nextjs";
import { NextResponse, NextRequest } from "next/server";
import { ensureSuperTokensInit } from "@/app/config/backend";
import { SessionContainer } from "supertokens-node/recipe/session";

ensureSuperTokensInit();

export function sessionGaurd(
  request: NextRequest,
  fn: (
    request: NextRequest,
    err: Error | undefined,
    session: SessionContainer
  ) => NextResponse | Promise<NextResponse>
) {
  if (request.headers.has("x-user-id")) {
    console.warn(
      "The FE tried to pass x-user-id, which is only supposed to be a backend internal header. Ignoring."
    );
    request.headers.delete("x-user-id");
  }

  return withSession(request, async (err, session) => {
    if (err) {
      return NextResponse.json(err, { status: 500 });
    }
    if (!session) {
      return new NextResponse("Authentication required", { status: 401 });
    }
    return await fn(request, err, session);
  });
}
