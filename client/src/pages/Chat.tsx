import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import Cookies from "js-cookie";
import { IUserDetailsState } from "../types";

import { allUsers as allUsersApi, whoAmI as whoAmIApi } from "../api";

import myAlert from "../utils/myAlert";
import AllUsers from "../components/allUsers/AllUsers";
import Message from "../components/message/Message";
import Modal from "../components/Modal";
import Settings from "../components/settings/Settings";
import useIsSettingsModalOpen from "../states/useIsSettingsModalOpen";

const Chat: React.FC = () => {
  const [userDetails, setUserDetails] = useState<IUserDetailsState>();
  const [allUsersState, setAllUsersState] = useState<IUserDetailsState[]>();
  const [allUsersStateCopy, setAllUsersStateCopy] =
    useState<IUserDetailsState[]>();
  const [
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    setIsSettingsModalOpenUsingCallbackFn,
  ] = useIsSettingsModalOpen((state) => [
    state.isSettingsModalOpen,
    state.setIsSettingsModalOpen,
    state.setIsSettingsModalOpenUsingCallbackFn,
  ]);

  useEffect(() => {
    (async () => {
      const accessToken = Cookies.get("accessToken") as string;
      try {
        const responses = await Promise.all([
          await whoAmIApi(accessToken),
          await allUsersApi(accessToken),
        ]);
        setUserDetails(responses[0].data);
        setAllUsersState(responses[1].data);
        setAllUsersStateCopy(responses[1].data);
      } catch (err) {
        myAlert(err);
      }
    })();
  }, []);

  return (
    <>
      <div className="bg-mBlack-300 px-6 h-screen">
        <div className="h-[120px]">
          <div className="h-[20px]"></div>
          <Navbar userDetails={userDetails} />
        </div>
        <div className="flex space-x-6">
          <AllUsers
            allUsersState={allUsersState}
            allUsersStateCopy={allUsersStateCopy}
            setAllUsersState={setAllUsersState}
          />
          <Message />
        </div>
      </div>
      {/* <Modal
        isOpen={isSettingsModalOpen}
        setIsOpen={setIsSettingsModalOpen}
        setIsOpenUsingCallbackFn={setIsSettingsModalOpenUsingCallbackFn}
      >
        <Settings />
      </Modal> */}
    </>
  );
};

export default Chat;
