import { UserInfo } from "./user-info.model";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    userInfo: UserInfo;
}