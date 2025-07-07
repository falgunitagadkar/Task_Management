export interface ILoginRequest
{
    email : string;
    password : string;
}

export interface IUser
{
    id : number;
    username : string;
    email : string;
    password : string;
}

export interface IGoogleLogin
{
    idToken : string;
}
