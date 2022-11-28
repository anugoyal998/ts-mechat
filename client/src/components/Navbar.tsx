import React from "react";
import NavUser from "./NavUser";

import { BsChatQuote } from "react-icons/bs";

import { IUserDetailsState } from "../types";

interface IProps {
  userDetails: IUserDetailsState | undefined;
}

const Navbar: React.FC<IProps> = ({ userDetails }) => {
  return (
    <div className="flex items-center justify-between bg-mBlack-100 px-5 py-2 rounded-lg shadow-2xl text-white">
      <a className="fcc space-x-2 cursor-pointer" href="/">
        <BsChatQuote className="text-3xl" />
        <span className="font-semibold">MeChat</span>
      </a>
      <NavUser userDetails={userDetails} />
    </div>
  );
};

export default Navbar;
