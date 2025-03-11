import { create } from 'zustand';

export type MessageStore = {
  messageStatus: "default" | "unauthorized";
  setMessageStatus: (value: "default" | "unauthorized") => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messageStatus: 'default',
  setMessageStatus: (value: "default" | "unauthorized") => set({ messageStatus: value }),
}));

export default useMessageStore;