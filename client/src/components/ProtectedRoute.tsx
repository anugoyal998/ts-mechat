import { getSSRSession } from "supertokens-node/nextjs";
import { SessionContainer } from "supertokens-node/recipe/session";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { TryRefreshComponent } from "./tryRefreshClientComponent";
import { ensureSuperTokensInit } from "@/app/config/backend";

ensureSuperTokensInit();

async function getSSRSessionHelper(): Promise<{
  session: SessionContainer | undefined;
  hasToken: boolean;
  hasInvalidClaims: boolean;
  error: Error | undefined;
}> {
  let session: SessionContainer | undefined;
  let hasToken = false;
  let hasInvalidClaims = false;
  let error: Error | undefined = undefined;

  try {
    ({ session, hasToken, hasInvalidClaims } = await getSSRSession(
      cookies().getAll(),
      headers()
    ));
  } catch (err: any) {
    error = err;
  }
  return { session, hasToken, hasInvalidClaims, error };
}

export async function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, hasToken, hasInvalidClaims, error } =
    await getSSRSessionHelper();

  if (error) {
    return (
      <div>
        Something went wrong while trying to get the session. Error -{" "}
        {error.message}
      </div>
    );
  }

  // `session` will be undefined if it does not exist or has expired
  if (!session) {
    if (!hasToken) {
      /**
       * This means that the user is not logged in. If you want to display some other UI in this
       * case, you can do so here.
       */
      return redirect("/auth");
    }

    /**
     * `hasInvalidClaims` indicates that session claims did not pass validation. For example if email
     * verification is required but the user's email has not been verified.
     */
    if (hasInvalidClaims) {
      /**
       * This means that one of the session claims is invalid. You should redirect the user to
       * the appropriate page depending on which claim is invalid.
       */
      return <div>Invalid Session Claims</div>;
    } else {
      /**
       * This means that the session does not exist but we have session tokens for the user. In this case
       * the `TryRefreshComponent` will try to refresh the session.
       *
       * To learn about why the 'key' attribute is required refer to: https://github.com/supertokens/supertokens-node/issues/826#issuecomment-2092144048
       */
      return <TryRefreshComponent key={Date.now()} />;
    }
  }

  return <>{children}</>
}
