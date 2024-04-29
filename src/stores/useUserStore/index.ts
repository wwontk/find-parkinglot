import { create } from "zustand";

interface userInfoType {
  email: string | null;
  nickname: string | null;
  profileImg: string | ArrayBuffer | null;
  uid: string | null;
  isLogin: boolean;
}

interface UserInfoState {
  userInfo: userInfoType;
}

interface UserInfoActions {
  setUserInfo: (userinfo: userInfoType) => void;
  deleteUserInfo: () => void;
}

const defaultState = {
  email: "",
  nickname: "",
  profileImg: "",
  uid: "",
  isLogin: false,
};

const useUserStore = create<UserInfoState & UserInfoActions>((set) => ({
  userInfo: defaultState,
  setUserInfo: (userInfo: userInfoType) => {
    set({ userInfo });
  },
  deleteUserInfo: () => {
    set({ userInfo: defaultState });
  },
}));

export default useUserStore;
