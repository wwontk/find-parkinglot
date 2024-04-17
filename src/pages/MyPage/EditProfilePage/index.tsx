import { updateProfile } from "firebase/auth";
import TopTitle from "../../../components/common/TopTitle";
import useInput from "../../../hooks/useInput";
import useUserState from "../../../hooks/userUserState";
import { IoPerson } from "react-icons/io5";
import { MdPhotoCamera } from "react-icons/md";
import { auth, storage } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { userState, updateUser } = useUserState();

  const [nickname, , handleNicknameChange] = useInput(userState.nickname);
  const [profileUrl, setProfilUrl] = useState<string | ArrayBuffer | null>(
    userState.profileImg
  );

  const handleEditProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: nickname,
      photoURL: profileUrl,
    });
    updateUser({
      ...userState,
      nickname: nickname,
      profileImg: profileUrl,
    });
    alert("프로필 수정이 완료되었습니다.");
    navigate("/mypage");
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageRef = ref(storage, `images/${file.name}+${file.lastModified}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProfilUrl(url);
      });
    });
  };

  return (
    <>
      <TopTitle text="프로필 수정" />
      <div className="flex flex-col items-center mt-40 gap-4">
        <div className="relative">
          {profileUrl ? (
            <>
              <img
                className="w-32 h-32 rounded-full flex items-center justify-center object-cover"
                src={`${profileUrl}`}
                alt="프로필이미지"
              />
            </>
          ) : (
            <div className="w-32 h-32 rounded-full bg-slate-200 flex items-center justify-center">
              <IoPerson size={70} color="white" />
            </div>
          )}
          <label
            htmlFor="editProfile"
            className="w-6 h-6 bg-zinc-400 rounded-full flex justify-center items-center text-white text-sm absolute bottom-0 right-2 cursor-pointer"
          >
            <MdPhotoCamera />
          </label>
          <input
            type="file"
            accept="image/*"
            name="editProfile"
            id="editProfile"
            className="hidden"
            onChange={handleProfileChange}
          />
        </div>
        <div>
          <p className="font-semibold">Nickname</p>
          <input
            type="text"
            className="border w-72 p-2 rounded-2xl"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <button
          className="w-72 bg-theme-color text-white p-2 rounded-2xl"
          onClick={handleEditProfile}
        >
          완료
        </button>
      </div>
    </>
  );
};

export default EditProfilePage;
