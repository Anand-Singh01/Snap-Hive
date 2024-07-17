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
  name: string;
}

export interface ILoginResponse extends ICurrentUser {}
export interface ISignUpResponse extends ILoginResponse {}

export interface ICreatePostData {
  caption: string | null;
  postImage: File | null;
  location: string | null;
  tags: string | null;
}

export interface ICurrentUser {
  username: string | null;
  userId: string | null;
  name: string | null;
  email: string | null;
  profilePic: string | null;
}

export interface IErrorState {
  errorMessage: { msg: string } | string | null;
  status: number | null;
}

export interface IUserState {
  user: ICurrentUser;
}

export interface ICurrPage {
  name: "Home" | "Explore" | "People" | "Saved" | "Create Post";
}

export interface IErrorResponse {
  error: { msg: string };
  status: number;
}
export interface ILoader {
  isLoading: boolean;
}

export interface ICreatePostResponse {
  msg: string;
}
export interface ILogoutResponse extends ICreatePostResponse {}

export interface IPostedBy {
  id: string;
  name: string;
  profile: {
    id: string;
    profilePic: string;
  };
}

export interface ILikedBy extends IPostedBy {}

export interface IComment {
  id: string;
  comment: string;
  commentBy: IPostedBy;
}

export interface ITag {
  id: string;
  tagName: string;
}
export interface ISinglePost {
  id: string;
  caption: string;
  location: string;
  postImage: string;
  totalLikes: number;
  totalComments: number;
  createdAt: string;
}
export interface IPostInitialState
  extends ILikedPosts,
    IFetchRecentPostPostResponse {}

export interface ILikedPosts {
  likedPosts: Array<{
    id: string;
  }>;
}

export interface IFetchRecentPostPostResponse {
  posts: Array<
    ISinglePost & {
      postedBy: IPostedBy;
      tags: ITag[];
    }
  >;
}
