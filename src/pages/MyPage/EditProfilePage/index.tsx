import { updateProfile } from "firebase/auth";
import TopTitle from "../../../components/common/TopTitle";
import useInput from "../../../hooks/useInput";
import { IoPerson } from "react-icons/io5";
import { MdPhotoCamera } from "react-icons/md";
import { auth, database, db, storage } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDownloadURL, uploadBytes, ref as strRef } from "firebase/storage";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import styled from "@emotion/styled";
import useUserStore from "../../../stores/useUserStore";
import { update, ref } from "firebase/database";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserStore();

  const [nickname, , handleNicknameChange] = useInput(userInfo.nickname);
  const [profileUrl, setProfilUrl] = useState<string | ArrayBuffer | null>(
    userInfo.profileImg
  );

  const [myReview, setMyReview] = useState<string[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "Reviews"),
      where("useruid", "==", userInfo.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => doc.id);
      setMyReview(newArray);
    });
  }, [userInfo.uid]);

  const handleEditProfile = async () => {
    if (!auth.currentUser) return;
    updateProfile(auth.currentUser, {
      displayName: nickname,
      photoURL: String(profileUrl),
    });
    setUserInfo({
      ...userInfo,
      nickname: nickname,
      profileImg: profileUrl,
    });
    update(ref(database, `users/${auth.currentUser.uid}`), {
      image: profileUrl,
    });
    for (let i = 0; i < myReview.length; i++) {
      const ref = doc(db, "Reviews", myReview[i]);
      await updateDoc(ref, {
        nickname: nickname,
        profileImg: profileUrl,
      });
    }
    alert("프로필 수정이 완료되었습니다.");
    navigate("/mypage");
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageRef = strRef(
      storage,
      `images/${file.name}+${file.lastModified}`
    );
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProfilUrl(url);
      });
    });
  };

  return (
    <>
      <TopTitle text="프로필 수정" />
      <Container>
        <div className="relative">
          {profileUrl ? (
            <>
              <ProfileImg src={`${profileUrl}`} alt="프로필이미지" />
            </>
          ) : (
            <ProfileBasic>
              <IoPerson size={70} color="white" />
            </ProfileBasic>
          )}
          <FileInputLabel htmlFor="editProfile">
            <MdPhotoCamera />
          </FileInputLabel>
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
          <NicknameInput
            type="text"
            value={`${nickname}`}
            onChange={handleNicknameChange}
          />
        </div>
        <UpdateButton onClick={handleEditProfile}>완료</UpdateButton>
      </Container>
    </>
  );
};

export default EditProfilePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
  gap: 1rem;
`;

const ProfileImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
`;

const ProfileBasic = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 9999px;
  background-color: rgb(226 232 240);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileInputLabel = styled.label`
  width: 1.5rem;
  height: 1.5rem;
  background-color: rgb(161 161 170);
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.875rem;
  line-height: 1.25rem;
  position: absolute;
  bottom: 0;
  right: 0.5rem;
  cursor: pointer;
`;

const NicknameInput = styled.input`
  border-width: 1px;
  width: 18rem;
  padding: 0.5rem;
  border-radius: 1rem;
`;

const UpdateButton = styled.button`
  width: 18rem;
  background-color: rgb(24 37 61);
  color: white;
  padding: 0.5rem;
  border-radius: 1rem;
`;
