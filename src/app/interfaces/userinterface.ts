export interface Register {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

export interface Login {
    username: string;
    email: string;
    password: string;
}

export interface GoogleLogin{
    access_token: string;
    code: string;
    id_token: string;
}
