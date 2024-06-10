import { User } from "supertokens-node"

export type TGETUSERS = {
    users: User[];
    nextPaginationToken?: string;
}