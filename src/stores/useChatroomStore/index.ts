import { create } from "zustand";

interface ChatroomInfoType {
  id: string | undefined;
  name: string;
}

interface ChatroomInfoState {
  chatroomInfo: ChatroomInfoType;
}

interface ChatroomInfoActions {
  setChatroomInfo: (chatroomInfo: ChatroomInfoType) => void;
  deleteChatroomInfo: () => void;
}

const defaultState = {
  id: "",
  name: "",
};

const useChatroomStore = create<ChatroomInfoState & ChatroomInfoActions>(
  (set) => ({
    chatroomInfo: defaultState,
    setChatroomInfo: (chatroomInfo: ChatroomInfoType) => {
      set({ chatroomInfo });
    },
    deleteChatroomInfo: () => {
      set({ chatroomInfo: defaultState });
    },
  })
);

export default useChatroomStore;
