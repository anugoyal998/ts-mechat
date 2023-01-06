import create from "zustand";
import { IIsSettingsModalOpenStore } from "../types";

const useIsSettingsModalOpen = create<IIsSettingsModalOpenStore>((set) => ({
  isSettingsModalOpen: false,
  setIsSettingsModalOpen: (isSettingsModalOpen: boolean) =>
    set((state) => ({ isSettingsModalOpen })),
  setIsSettingsModalOpenUsingCallbackFn: (
    fn: (isSettingsModalOpen: boolean) => boolean
  ) => set((state) => ({ isSettingsModalOpen: fn(state.isSettingsModalOpen) })),
}));

export default useIsSettingsModalOpen;
