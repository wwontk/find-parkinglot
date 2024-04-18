export interface UserDataType {
  uid: string;
  email: string | null;
  nickname: string | null;
  profileImg: string | null;
  isLogin: boolean;
}

export interface ValidCheckType {
  status: boolean;
  msg: string;
}
