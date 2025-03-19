import { create } from 'zustand';

export type CodeError = "422" | "504" | "generic";
export type MessageStatus = "default" | "unauthorized" | "deleted";

export type MessageStore = {
  messageStatus: MessageStatus;
  codeError: CodeError | undefined;
  setMessageStatus: (value: MessageStatus, codeError?: CodeError) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messageStatus: 'default',
  codeError: 'generic',
  setMessageStatus: (value: MessageStatus, codeError?: CodeError) => set({ messageStatus: value, codeError: codeError}),
}));

export default useMessageStore;