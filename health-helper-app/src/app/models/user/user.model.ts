import { UserInfoDTO } from "./user-info.model";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    userInfoDTO: UserInfoDTO;
}