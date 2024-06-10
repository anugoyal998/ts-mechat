import { sessionGaurd } from "@/lib/sessionGaurd";
import { NextRequest, NextResponse } from "next/server";
import { getUsersNewestFirst } from "supertokens-node";

export async function GET(request: NextRequest) {
  return sessionGaurd(request, async (request) => {
    const limit = parseInt(request.nextUrl.searchParams.get("limit") ?? "100");
    let nextPaginationToken =
      request.nextUrl.searchParams.get("nextPaginationToken") ?? undefined;
    let search = request.nextUrl.searchParams.get("search") ?? undefined;
    if (Number.isNaN(limit)) {
      return NextResponse.json("Invalid Limit Parameter", { status: 400 });
    }
    let usersResponse = await getUsersNewestFirst({
      tenantId: "public",
      limit,
      ...(nextPaginationToken && { nextPaginationToken }),
      ...(search && {
        query: {
          email: search,
        },
      }),
    });
    let users = usersResponse.users;
    nextPaginationToken = usersResponse.nextPaginationToken;
    return NextResponse.json({
      users,
      ...(nextPaginationToken && { nextPaginationToken }),
    });
  });
}
