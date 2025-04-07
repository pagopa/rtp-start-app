import { router } from "src/main";
import useMessageStore from "src/stores/message.store";

export function invalidateSession() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  useMessageStore.getState().setMessageStatus('unauthorized');
  return router.navigate({to: '/ko'});
}