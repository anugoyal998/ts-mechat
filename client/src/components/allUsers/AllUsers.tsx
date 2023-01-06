import React, { useState } from "react";
import { IWhoAmIResponse } from "../../api";

import useAuth from "../../states/useAuth";

import Card from "./Card";
import Searchbar from "./Searchbar";

interface IProps {
  allUsersState: IWhoAmIResponse[] | undefined;
  allUsersStateCopy: IWhoAmIResponse[] | undefined;
  setAllUsersState: React.Dispatch<
    React.SetStateAction<IWhoAmIResponse[] | undefined>
  >;
}

const DummyData = [
  {
    providers: [
      {
        name: "",
        profilePhotoURL: "",
        provider: "",
        isEmailPassword: false,
      },
    ],
    username: "",
    _id: "",
  },
  {
    providers: [
      {
        name: "",
        profilePhotoURL: "",
        provider: "",
        isEmailPassword: false,
      },
    ],
    username: "",
    _id: "",
  },
  {
    providers: [
      {
        name: "",
        profilePhotoURL: "",
        provider: "",
        isEmailPassword: false,
      },
    ],
    username: "",
    _id: "",
  },
  {
    providers: [
      {
        name: "",
        profilePhotoURL: "",
        provider: "",
        isEmailPassword: false,
      },
    ],
    username: "",
    _id: "",
  },
  {
    providers: [
      {
        name: "",
        profilePhotoURL: "",
        provider: "",
        isEmailPassword: false,
      },
    ],
    username: "",
    _id: "",
  },
];

const AllUsers: React.FC<IProps> = ({
  allUsersState,
  setAllUsersState,
  allUsersStateCopy,
}) => {
  const [search, setSearch] = useState<string>("");
  const username = useAuth((state) => state.auth.username);

  return (
    <div
      className="bg-mBlack-100 rounded-md shadow-xl p-3"
      style={{ width: "400px !important" }}
    >
      <Searchbar
        value={search}
        setSearch={setSearch}
        setAllUsersState={setAllUsersState}
        allUsersStateCopy={allUsersStateCopy}
      />
      <div
        className="w-full overflow-y-scroll mt-3 scrollbar-hide"
        style={{
          height: "calc(100vh - 220px)",
        }}
      >
        {allUsersState
          ? allUsersState?.map((user, index) =>
              user.username != username ? (
                <Card key={index.toString()} user={user} />
              ) : null
            )
          : DummyData?.map((user, index) => (
              <Card key={index.toString()} user={user} dummy />
            ))}
      </div>
    </div>
  );
};

export default AllUsers;
