import { FormEvent, useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import useInput from "../../../hooks/useInput";
import useChatroomStore from "../../../stores/useChatroomStore";
import {
  child,
  off,
  onChildAdded,
  push,
  ref as dbRef,
  serverTimestamp,
  set,
} from "firebase/database";
import { database } from "../../../firebase";
import useUserStore from "../../../stores/useUserStore";
import Message from "../../../components/Chatting/Message";

interface MessageObjectType {
  timestamp: number;
  contentMsg: string;
  user: {
    id: string;
    image: string;
    name: string;
  };
}

const MessagePage = () => {
  const [content, setContent, handleChangeContent] = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  const { chatroomInfo } = useChatroomStore();
  const { userInfo } = useUserStore();

  const [messages, setMessages] = useState<MessageObjectType[]>([]);

  const messageEndRef = useRef<null | HTMLDivElement>(null);

  const messagesRef = dbRef(database, "messages");

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content) {
      return;
    }
    setIsLoading(true);
    try {
      await set(
        push(child(messagesRef, String(chatroomInfo.id))),
        createMessage()
      );
      setIsLoading(false);
      setContent("");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const createMessage = () => {
    const message = {
      timestamp: serverTimestamp(),
      contentMsg: content,
      user: {
        id: userInfo.uid,
        name: userInfo.nickname,
        image: userInfo.profileImg,
      },
    };

    return message;
  };

  useEffect(() => {
    if (chatroomInfo.id) {
      addMessagesListener(chatroomInfo.id);
    }

    return () => {
      off(messagesRef);
    };
  }, [chatroomInfo.id]);

  const addMessagesListener = (chatRoomId: string) => {
    const messagesArray: Array<MessageObjectType> = [];

    onChildAdded(child(messagesRef, chatRoomId), (DataSnapshot) => {
      messagesArray.push(DataSnapshot.val());
      const newMessagesArray = [...messagesArray];

      setMessages(newMessagesArray);
    });
  };

  const renderMessages = (messages: MessageObjectType[]) => {
    return (
      messages.length > 0 &&
      messages.map((message) => (
        <Message key={message.timestamp} message={message} />
      ))
    );
  };

  return (
    <>
      <div
        className={`flex justify-center font-bold text-2xl items-center max-w-default w-full m-auto h-20 fixed top-0 left-0 right-0 z-10 bg-white
        `}
      >
        {chatroomInfo.name}
      </div>
      <div className="mt-20 mb-16">
        {renderMessages(messages)}
        <div ref={messageEndRef}></div>
      </div>
      <div
        className={`flex max-w-default w-full m-auto h-16 fixed bottom-0 left-0 right-0  z-10
         bg-white drop-shadow-md p-2 gap-2
        `}
      >
        <form
          className="flex flex-1 justify-between items-center gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={String(content)}
            className="flex-1 bg-slate-200 p-2 rounded"
            placeholder="메세지를 입력하세요"
            onChange={handleChangeContent}
          />
          <button
            className="w-8 h-8 bg-theme-color rounded-full text-white flex items-center justify-center"
            disabled={isLoading}
          >
            <IoIosSend />
          </button>
        </form>
      </div>
    </>
  );
};

export default MessagePage;
