import { router } from "src/main";
import { useDialogStore } from "src/stores/dialog.store";
import useMessageStore from "src/stores/message.store";

export function invalidateSession() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  const dialogState = useDialogStore.getState().dialog;
  if(dialogState) {
    useDialogStore.getState().closeDialog();
  }
  useMessageStore.getState().setMessageStatus('unauthorized');
  return router.navigate({ to: '/ko' });
}