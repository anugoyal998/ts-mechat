import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar'
import { IUserDetailsState } from '../types';
import { whoAmI as whoAmIApi } from "../api";
import myAlert from '../utils/myAlert';
import { Settings as TsSettings } from '../components/settings/Settings';

const Settings: React.FC = () => {
  const [userDetails, setUserDetails] = useState<IUserDetailsState>();
  useEffect(() => {
    (async () => {
      const accessToken = Cookies.get("accessToken") as string;
      try {
        const responses = await Promise.all([
          await whoAmIApi(accessToken),
        ]);
        setUserDetails(responses[0].data);
      } catch (err) {
        myAlert(err);
      }
    })();
  }, []);

  return (
    <div className="bg-mBlack-300 px-6 h-screen">
      <div className="h-[120px]">
          <div className="h-[20px]"></div>
          <Navbar userDetails={userDetails} />
      </div>
      <TsSettings />
    </div>
  )
}

export default Settings
