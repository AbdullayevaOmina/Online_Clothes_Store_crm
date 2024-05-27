export interface SignIn{
    email: string;
    password: string;
}

export interface GetParams{
    page: string | number;
    limit: string | number;
    owner_email: string
}
export interface Request {
    sign_in:(data:SignIn)=>any,
}