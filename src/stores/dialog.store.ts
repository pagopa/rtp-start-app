import { create } from 'zustand';

export type DialogProps = {
    title: string
    content: React.ReactNode
}

type DialogStoreType = {
  dialog: DialogProps | null
  openDialog: (dialogState: DialogProps) => void
  closeDialog: () => void
}

export const useDialogStore = create<DialogStoreType>((set) => ({
  dialog: null,
  openDialog: (dialog: DialogProps) => set(() => ({ dialog })),
  closeDialog: () => set({ dialog: null }),
}));

export const useDialog = () => {
  const openDialog = useDialogStore((state) => state.openDialog);
  const closeDialog = useDialogStore((state) => state.closeDialog);

  return { openDialog, closeDialog };
};