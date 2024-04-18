import { useRecoilState, useResetRecoilState } from "recoil";
import { userAtom } from "../../recoil/atoms/user/atom";
import { UserDataType } from "../../types/User";

const useUserState = () => {
  const [userState, setUserState] = useRecoilState(userAtom);
  const resetUser = useResetRecoilState(userAtom);

  const updateUser = (userInfo: UserDataType) => {
    setUserState({
      ...userInfo,
    });
  };

  return {
    userState,
    setUserState,
    updateUser,
    resetUser,
  };
};

export default useUserState;
