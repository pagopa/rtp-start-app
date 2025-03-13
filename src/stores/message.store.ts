import { create } from 'zustand';

export type MessageStatus = "default" | "unauthorized" | "deleted";

export type IMessage = {
  value: MessageStatus
}

export type MessageStore = {
  messageStatus: MessageStatus;
  setMessageStatus: (value: MessageStatus) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messageStatus: "default",
  setMessageStatus: (value: MessageStatus) => set({ messageStatus: value }),
}));

export default useMessageStore;