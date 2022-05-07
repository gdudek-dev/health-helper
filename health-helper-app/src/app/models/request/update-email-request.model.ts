export interface UpdateEmailRequest {
    sessionKey: string;
    password: string;
    newEmail: string;
}