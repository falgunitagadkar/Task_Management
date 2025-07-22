export interface ILoginRequest
{
    email : string;
    password : string;
    rememberMe : boolean;
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
