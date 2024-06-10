// import ThirdPartyWebJs from 'supertokens-web-js/recipe/thirdparty'
// import EmailPasswordWebJs from 'supertokens-web-js/recipe/emailpassword'
// import SessionWebJs from 'supertokens-web-js/recipe/session'
import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import ThirdPartyReact from "supertokens-auth-react/recipe/thirdparty";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import { useRouter } from "next/navigation";

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
  {};

export function setRouter(
  router: ReturnType<typeof useRouter>,
  pathName: string,
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyReact.init({
        signInAndUpFeature: {
          providers: [
            ThirdPartyReact.Google.init(),
            ThirdPartyReact.Github.init(),
          ],
        },
      }),
      EmailPasswordReact.init(),
      SessionReact.init(),
    ],
  };
};
