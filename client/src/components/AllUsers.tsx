import React, { useState } from "react";
import { TGETUSERS } from "@/types/api.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useDebounce from "@/lib/useDebounce";
import { HiSearch } from "react-icons/hi";
import { User } from "supertokens-node";
import { useCurrentChat, useMsgs } from "@/zustand";
import Image from "next/image";
import { getProfilePhoto } from "@/lib/getProfilePhoto";
import { Button } from "./ui/button";

async function getUsers(
  limit: number,
  nextPaginationToken: string,
  search: string,
  setPrevPaginationToken: React.Dispatch<React.SetStateAction<string>>
) {
  const { data } = await axios.get<TGETUSERS>(
    `/api/get-users?limit=${limit}${
      nextPaginationToken !== ""
        ? `&nextPaginationToken=${nextPaginationToken}`
        : ""
    }${search !== "" ? `&search=${search}` : ""}`
  );
  if (data.nextPaginationToken) {
    setPrevPaginationToken(data.nextPaginationToken);
  } else {
    setPrevPaginationToken("");
  }
  return data.users;
}

export default function AllUsers({ user }: { user: User | undefined }) {
  const [limit, setLimit] = useState(100);
  const [nextPaginationToken, setNextPaginationToken] = useState("");
  const [prevPaginationToken, setPrevPaginationToken] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { currentChat, setCurrentChat } = useCurrentChat();
  const { setMsgs } = useMsgs();
  const { data: users } = useQuery({
    queryFn: async () =>
      await getUsers(
        limit,
        nextPaginationToken,
        debouncedSearch,
        setPrevPaginationToken
      ),
    queryKey: [limit, nextPaginationToken, debouncedSearch],
    placeholderData: (previousData) => previousData,
  });
  return (
    <div
      className="bg-secondary rounded-md shadow-xl p-3"
      style={{ width: "400px !important" }}
    >
      <div className="flex items-center bg-primary rounded-3xl">
        <input
          type="search"
          placeholder="Search..."
          className="w-full px-5 py-2 bg-primary outline-none rounded-3xl text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="px-5">
          <HiSearch className="text-white" />
        </div>
      </div>
      <div
        className="w-full overflow-y-scroll mt-3 scrollbar-hide"
        style={{ height: "calc(100vh - 220px)" }}
      >
        {users?.map((_user) =>
          _user.id !== user?.id ? (
            <div
              key={_user.id}
              className={`my-4 flex items-center justify-between p-3 rounded-md w-full hover:bg-[#25262b] cursor-pointer ${
                _user.id === currentChat?.id ? "bg-[#25262b]" : "bg-primary"
              }`}
              onClick={(e) => {
                setMsgs([]);
                setCurrentChat(_user);
              }}
            >
              <div className="flex items-center space-x-2 w-full">
                <Image
                  src={getProfilePhoto(_user)}
                  alt="user-photo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="w-full">
                  <p className="w-full truncate text-white">
                    {_user.emails?.[0]?.split("@")?.[0]}
                  </p>
                </div>
              </div>
            </div>
          ) : null
        )}
        {prevPaginationToken !== "" && (
          <Button
            className="w-full"
            onClick={(e) => setNextPaginationToken(prevPaginationToken)}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
