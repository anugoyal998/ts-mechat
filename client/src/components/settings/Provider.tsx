import React from "react";
import { IChanged } from "../../pages/Settings";
import { IUserDetailsState } from "../../types";

interface IProps {
  index: number;
  changed: IChanged;
  setChanged: React.Dispatch<React.SetStateAction<IChanged>>;
  userDetails: IUserDetailsState;
}

const Provider: React.FC<IProps> = ({
  index,
  changed,
  setChanged,
  userDetails,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFiles = e.target.files;
    if (imageFiles && imageFiles?.length) {
      const imageSrc = URL.createObjectURL(imageFiles[0]);
      setChanged((prev) => ({
        ...prev,
        providers: prev.providers.map((provider, idx) => ({
          provider: provider.provider,
          profilePhotoURL: idx === index ? imageSrc : provider.profilePhotoURL,
          file: idx === index ? imageFiles[0] : provider.file,
        })),
      }));
    }
  };

  return (
    <div className="flex justify-between items-center bg-mBlack-100 my-3 p-3 border border-gray-500 rounded-lg">
      <div>
        <p className="capitalize text-white">
          {userDetails.providers[index].name}
        </p>
        <p className="capitalize text-xs text-gray-400">
          {userDetails.providers[index].provider}
        </p>
        <input
          type="file"
          className="file-input file-input-xs mt-2 border-gray-500 bg-mBlack-300"
          onChange={handleChange}
          accept="image/*"
        />
      </div>
      <div>
        <img
          src={changed.providers[index].profilePhotoURL}
          alt="proivder/img"
          className="w-16"
        />
      </div>
    </div>
  );
};

export default Provider;
