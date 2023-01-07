import Cookies from "js-cookie";
import React, { useState } from "react";
import {
  IUpdateProfileBody,
  IUpdateProfileProvider,
  updateProfile as updateProfileApi,
} from "../../api";
import { refreshTokenFunction } from "../../hooks/useRefresh";
import useUnload from "../../hooks/useUnload";
import { IChanged, IChangedProvider } from "../../pages/Settings";
import useAuth from "../../states/useAuth";
import { IUserDetailsState } from "../../types";
import myAlert from "../../utils/myAlert";
import uploadToCloudinary from "../../utils/uploadToCloudinary";
import Provider from "./Provider";

interface IProps {
  changed: IChanged;
  setChanged: React.Dispatch<React.SetStateAction<IChanged>>;
  userDetails: IUserDetailsState;
}

type IFilesToUpload = {
  index: number;
  file: File;
};

const SettingsComponent: React.FC<IProps> = ({
  changed,
  setChanged,
  userDetails,
}) => {
  const token = Cookies.get("accessToken") as string;
  const refrehToken = Cookies.get("refreshToken") as string;
  const setAuth = useAuth((state) => state.setAuth);
  const [loading, setLoading] = useState<Boolean>(false);

  useUnload((e: any) => {
    e.preventDefault();
    e.returnValue = "";
  });

  const handleSaveChanges = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!changed.name) {
      myAlert("Name can't be empty");
      return;
    }
    setLoading(true);
    let filesToUpload: IFilesToUpload[] = [];
    changed.providers.forEach((provider, index) => {
      if (provider.file) filesToUpload.push({ file: provider.file, index });
    });
    try {
      let updatedProviders: IUpdateProfileProvider[] = changed.providers.map(
        (provider) => ({
          profilePhotoURL: provider.profilePhotoURL,
          provider: provider.provider,
        })
      );
      if (filesToUpload && filesToUpload.length) {
        const responses = await Promise.all(
          filesToUpload.map(
            async (e) =>
              await uploadToCloudinary(e?.file as File, e?.index as number)
          )
        );
        const newProviders: IChangedProvider[] = changed.providers.map(
          (provider, index) => {
            const findProvider = responses.find((e) => e.index === index);
            return {
              ...provider,
              profilePhotoURL: findProvider
                ? findProvider.profilePhotoURL
                : provider.profilePhotoURL,
            };
          }
        );
        setChanged((prev) => ({ ...prev, providers: newProviders }));
        updatedProviders = newProviders.map((provider) => ({
          profilePhotoURL: provider.profilePhotoURL,
          provider: provider.provider,
        }));
      }
      const payload: IUpdateProfileBody = {
        name: changed.name,
        providers: updatedProviders,
      };
      const { data } = await updateProfileApi(payload, token);
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);
      setLoading(false);
      window.location.reload();
    } catch (err) {
      setLoading(false);
      myAlert(err);
    }
  };

  return (
    <div className="fcc">
      <div className="w-[600px]">
        <p className="text-2xl font-bold text-white">Edit Profile</p>
        <hr className="my-2 border-gray-500" />
        {/* name */}
        <div className="my-3">
          <p>Name</p>
          <div className="border border-gray-500 rounded-lg mt-1">
            <input
              type="text"
              value={changed.name}
              className="w-full p-2 bg-mBlack-100 rounded-lg outline-none text-white"
              onChange={(e) =>
                setChanged((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
        </div>
        {/* name */}
        {/* username */}
        <div className="my-3">
          <p>Username</p>
          <div className="border border-gray-500 rounded-lg mt-1">
            <input
              type="text"
              value={userDetails.username.split("@")[0]}
              className="w-full p-2 bg-mBlack-100 rounded-lg outline-none text-white"
            />
          </div>
        </div>
        {/* username */}
        {/* providers */}
        <div>
          <p>Connected Accounts</p>
          {changed.providers.map((provider, index) => (
            <Provider
              key={index.toString()}
              index={index}
              changed={changed}
              setChanged={setChanged}
              userDetails={userDetails}
            />
          ))}
        </div>
        {/* providers */}
        {/* Save Changes */}
        <button
          className={`w-full my-3 btn-mechat-orange ${
            loading && "cursor-not-allowed bg-mBlack-300 opacity-60"
          }`}
          onClick={handleSaveChanges}
          disabled={loading as boolean}
        >
          Save Changes
        </button>
        {/* Save Changes */}
      </div>
    </div>
  );
};

export default SettingsComponent;
