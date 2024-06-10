"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import {
  SessionAuth,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "supertokens-node";
import AllUsers from "@/components/AllUsers";
import Message from "@/components/message/Message";

export async function getUser() {
  const { data } = await axios.get<User>("/api/get-user");
  return data;
}

export default function page() {
  const session = useSessionContext();
  const { data: userInfo } = useQuery({
    queryFn: getUser,
    queryKey: [session],
  });
  return (
    <SessionAuth>
      <div className="bg-primary px-6 h-screen">
        <div className="h-[120px]">
          <div className="h-[20px]"></div>
          <Navbar user={userInfo} />
        </div>
        <div className="flex space-x-6">
          <AllUsers user={userInfo} />
          <Message user={userInfo} />
        </div>
      </div>
    </SessionAuth>
  );
}
