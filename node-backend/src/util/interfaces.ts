export interface ITokenData{
    id:string
    email: string
}
export interface ILoginData{
    email: string
    password: string
}
export interface ISignUpData{
    username:string
    name:string
    email: string
    password: string
}

export interface IPostData{
    caption : string,
    location: string | null
    tags:[{tagName:string}]
}