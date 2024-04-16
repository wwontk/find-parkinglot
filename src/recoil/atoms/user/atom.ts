import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userInfo",
  storage: localStorage,
});

export const userAtom = atom({
  key: "userAtom",
  default: {
    uid: "",
    email: "",
    nickname: "",
    profileImg: "",
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
