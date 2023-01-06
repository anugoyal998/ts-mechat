import React from "react";
import useAuth from "../../states/useAuth";

const SettingsComponent = () => {
  const auth = useAuth((state) => state.auth);
  return <div></div>;
};

export default SettingsComponent