import { TMSG } from "@/types";
import { User } from "supertokens-node";
import { create } from "zustand";

export const useCurrentChat = create<{
  currentChat: User | undefined;
  setCurrentChat: (currentChat: User | undefined) => void;
}>((set) => ({
  currentChat: undefined,
  setCurrentChat: (currentChat) => set((state) => ({ currentChat })),
}));

export const useMsgs = create<{
  msgs: TMSG[] | undefined;
  setMsgs: (msgs: TMSG[] | undefined) => void;
  setMsgsUsingCallbackFn: (fn: (msgs: TMSG[]) => TMSG[]) => void;
}>((set) => ({
  msgs: undefined,
  setMsgs: (msgs) => set((state) => ({ msgs })),
  setMsgsUsingCallbackFn: (fn) =>
    set((state) => ({ msgs: fn(state.msgs ? state.msgs : []) })),
}));

export const useActiveUsers = create<{
  activeUsers: string[] | undefined;
  setActiveUsers: (activeUsers: string[] | undefined) => void;
}>((set) => ({
  activeUsers: undefined,
  setActiveUsers: (activeUsers) => set((state) => ({ activeUsers })),
}));
