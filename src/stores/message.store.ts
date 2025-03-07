import { create } from 'zustand';

export type MessageStore = {
  messageStatus: string;
  setMessageStatus: (value: string) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messageStatus: 'deleted',
  setMessageStatus: (value: string) => set({ messageStatus: value }),
}));

export default useMessageStore;