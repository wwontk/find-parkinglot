import styled from "@emotion/styled";
import Nav from "../../components/common/Nav";
import { onChildAdded, ref } from "firebase/database";
import { database } from "../../firebase";
import { useEffect, useState } from "react";
import useUserStore from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import useChatroomStore from "../../stores/useChatroomStore";

interface UserObjectType {
  image: string;
  name: string;
  uid: string;
}

const ChattingPage = () => {
  const navigate = useNavigate();
  const usersRef = ref(database, "users");
  const { userInfo } = useUserStore();
  const { setChatroomInfo } = useChatroomStore();

  const [users, setUsers] = useState<UserObjectType[]>([]);

  useEffect(() => {
    if (userInfo?.uid) {
      addUsersListener(userInfo.uid);
    }
  }, [userInfo?.uid]);

  const addUsersListener = (currentUserId: string) => {
    const usersArray: Array<UserObjectType> = [];

    onChildAdded(usersRef, (DataSnapshot) => {
      if (currentUserId !== DataSnapshot.key) {
        const user = DataSnapshot.val();
        user["uid"] = DataSnapshot.key;
        usersArray.push(user);

        const newUsersArray = [...usersArray];
        setUsers(newUsersArray);
      }
    });
  };

  const getChatRoomId = (userId: string) => {
    const currentUserId = userInfo.uid;

    if (!currentUserId) return;

    return userId > currentUserId
      ? `${userId}_${currentUserId}`
      : `${currentUserId}_${userId}`;
  };

  const changeChatRoom = (user: UserObjectType) => {
    const chatRoomId = getChatRoomId(user.uid);
    const chatRoomData = {
      id: chatRoomId,
      name: user.name,
    };
    setChatroomInfo(chatRoomData);
    navigate(`/chat/${chatRoomId}`);
  };

  const renderUsersList = (users: UserObjectType[]) => {
    return (
      users.length > 0 &&
      users.map((user) => (
        <button
          className="flex items-center p-2"
          key={user.name}
          onClick={() => changeChatRoom(user)}
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user.image}
            alt={user.name}
          />
          <div className="ml-4 font-medium">{user.name}</div>
        </button>
      ))
    );
  };

  return (
    <>
      <ChattingHeader>
        <HeaderTitle>채팅방 목록</HeaderTitle>
      </ChattingHeader>
      <ChattingList>{renderUsersList(users)}</ChattingList>
      <Nav />
    </>
  );
};

export default ChattingPage;

const ChattingHeader = styled.div`
  margin: 0.5rem;
  display: flex;
`;

const HeaderTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;

const ChattingList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 0.5rem;
`;
