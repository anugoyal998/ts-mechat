import create from "zustand"
import { TAuthState, TAuthStore } from "../types"


const useAuth = create<TAuthStore>(set => ({
    auth: {
        name: '',
        username: '',
        profilePhotoURL: '',
        isAuth: false
    },
    setName: (name: string) => set((state) => ({...state, name })),
    setUsername: (username: string) => set((state) => ({...state, username })),
    setProfilePhotoURL: (profilePhotoURL: string) => set((state) => ({...state, profilePhotoURL })),
    setIsAuth: (isAuth: boolean) => set((state) => ({...state, isAuth })),
    setAuth: (auth: TAuthState) => set((state) => ({ auth }))
}))



export default useAuth