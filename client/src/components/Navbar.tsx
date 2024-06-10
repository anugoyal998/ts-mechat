import React from "react";
import { BsChatQuote } from "react-icons/bs";
import { FiChevronDown, FiLogOut, FiSettings } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { signOut } from "supertokens-auth-react/recipe/session";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { User } from "supertokens-node";
import Image from "next/image";
import { getProfilePhoto } from "@/lib/getProfilePhoto";
import { useRouter } from "next/navigation";

const NavUser = ({ user }: { user: User }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-between border px-3 py-2 rounded-md border-gray-400 cursor-pointer">
          <div className="flex justify-center items-center space-x-2">
            <Image
              src={getProfilePhoto(user)}
              alt="user-photo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="text-sm w-24 truncate">
                {user.emails?.[0]?.split("@")?.[0]}
              </p>
            </div>
          </div>
          <div>
            <FiChevronDown />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-5 bg-secondary w-48 rounded-md shadow-2xl text-white">
        <DropdownMenuItem className="w-full hover:opacity-75 cursor-pointer flex space-x-2 items-center p-3">
          <BiUserCircle className="text-3xl" />
          <p className="truncate">{user.emails?.[0]}</p>
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          className="w-full hover:opacity-75 cursor-pointer flex items-center space-x-2 p-3"
          onClick={(e) => router.push("/settings")}
        >
          <FiSettings className="text-xl" />
          <p className="truncate">Settings</p>
        </DropdownMenuItem> */}
        <DropdownMenuItem
          className="w-full hover:opacity-75 cursor-pointer flex items-center space-x-2 p-3"
          onClick={async (e) => {
            await signOut();
            router.push("/auth");
          }}
        >
          <FiLogOut className="text-xl" />
          <p className="truncate">Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function Navbar({ user }: { user: User | undefined }) {
  return (
    <div className="flex justify-between items-center bg-secondary px-5 py-2 rounded-lg shadow-2xl text-white">
      <Link
        href="/"
        className="flex justify-center items-center space-x-2 cursor-pointer"
      >
        <BsChatQuote className="text-3xl" />
        <span className="font-semibold">MeChat</span>
      </Link>
      {user && <NavUser user={user} />}
    </div>
  );
}
