export interface ITokenData {
  id: string;
  email: string;
}
export interface ILoginData {
  email: string;
  password: string;
}
export interface ISignUpData {
  username: string;
  email: string;
  password: string;
}
export interface ICurrentUser {
  username: string | null;
  email: string | null;
  imageUrl: string | null;
}

export interface IErrorState{
  errorMessage: { msg: string } | string | null;
  status: number | null
}

export interface IUserState {
  user: ICurrentUser;
}

export interface ILoginResponse extends ICurrentUser {}
export interface ISignUpResponse extends ILoginResponse {}

export interface IErrorResponse {
  error: { msg: string } ;
  status: number
}
export interface ILoader{
  isLoading:boolean,
}
