import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import { IUserDetailsState } from "../types";
import { whoAmI as whoAmIApi } from "../api";
import myAlert from "../utils/myAlert";
import SettingsComponent from "../components/settings/SettingsComponent";

export type IChangedProvider = {
  provider: string;
  profilePhotoURL: string;
  file: File | null;
};

export type IChanged = {
  name: string;
  providers: IChangedProvider[];
};

const Settings: React.FC = () => {
  const [userDetails, setUserDetails] = useState<IUserDetailsState>();
  const [changed, setChanged] = useState<IChanged>({
    name: "",
    providers: [],
  });
  useEffect(() => {
    (async () => {
      const accessToken = Cookies.get("accessToken") as string;
      try {
        const responses = await Promise.all([await whoAmIApi(accessToken)]);
        setUserDetails(responses[0].data);
        setChanged({
          name: responses[0].data.providers[0].name,
          providers: responses[0].data.providers.map((provider) => ({
            provider: provider.provider,
            profilePhotoURL: provider.profilePhotoURL,
            file: null,
          })),
        });
      } catch (err) {
        myAlert(err);
      }
    })();
  }, []);

  return (
    <div className="bg-mBlack-300 px-6">
      <div className="h-[120px]">
        <div className="h-[20px]"></div>
        <Navbar userDetails={userDetails} />
      </div>
      {userDetails ? (
        <SettingsComponent
          changed={changed}
          setChanged={setChanged}
          userDetails={userDetails}
        />
      ) : null}
    </div>
  );
};

export default Settings;
