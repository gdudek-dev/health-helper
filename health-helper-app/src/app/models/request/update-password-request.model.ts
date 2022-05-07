export interface UpdatePasswordRequest {
    sessionKey: string;
    password: string;
    newPassword: string;
}
