import { useRecoilState } from "recoil";
import { userAtom } from "../../recoil/atoms/user/atom";
import { UserDataType } from "../../types/User";

const useUserState = () => {
  const [userState, setUserState] = useRecoilState(userAtom);

  const updateUser = (userInfo: UserDataType) => {
    setUserState({
      ...userInfo,
    });
  };

  return {
    userState,
    setUserState,
    updateUser,
  };
};

export default useUserState;
