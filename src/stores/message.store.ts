import { create } from 'zustand';

export type CodeError = "422" | "504" | "generic";

export type MessageStore = {
  messageStatus: "default" | "unauthorized";
  codeError: CodeError | undefined;
  setMessageStatus: (value: "default" | "unauthorized", codeError?: CodeError) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messageStatus: 'default',
  codeError: 'generic',
  setMessageStatus: (value: "default" | "unauthorized", codeError?: CodeError) => set({ messageStatus: value, codeError: codeError}),
}));

export default useMessageStore;