import create from "zustand";
import { IMsg, IMsgsStore } from "../types";

const useMsgs = create<IMsgsStore>((set) => ({
    msgs: null,
    setMsgs: (msgs: IMsg[] | null) => set((state) => ({ msgs })),
    setMsgsUsingCallbackFn: (fn: (msgs: IMsg[]) => IMsg[]) => set((state) => ({ msgs: fn(state.msgs ? state.msgs : [])})),
}))

export default useMsgs