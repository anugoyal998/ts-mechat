import create from "zustand"
import { IActiveUser, IActiveUsersStore } from "../types"

const useActiveUsers = create<IActiveUsersStore>((set) => ({
    activeUsers: undefined,
    setActiveUsers: (activeUsers: IActiveUser[]) => set((state) => ({ activeUsers }))
}))

export default useActiveUsers