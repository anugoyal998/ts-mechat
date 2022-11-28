import create from "zustand";
import { ICurrentChatState, ICurrentChatStore } from "../types";

const useCurrentChat = create<ICurrentChatStore>((set) => ({
  currentChat: undefined,
  setCurrentChat: (currentChat: ICurrentChatState) => set((state) => ({ currentChat })),
}));

export default useCurrentChat;
