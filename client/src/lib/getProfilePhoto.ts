import { User } from "supertokens-node";

export function getProfilePhoto(user: User){
    const email = user.emails?.[0]
    return `https://ui-avatars.com/api/?name=${email}&background=random`
}
