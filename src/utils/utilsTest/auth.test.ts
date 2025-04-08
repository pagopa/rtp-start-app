import { router } from "src/main";
import useMessageStore from "src/stores/message.store";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { invalidateSession } from "../auth.utils";
import { useDialogStore } from "src/stores/dialog.store";

vi.mock("src/main", () => ({
  router: {
    navigate: vi.fn(),
  },
}));

vi.mock("src/stores/message.store", () => {
  return {
    default: {
      getState: vi.fn().mockReturnValue({
        setMessageStatus: vi.fn(),
      }),
    },
  };
});

vi.mock("src/stores/dialog.store", () => ({
  useDialogStore: {
    getState: vi.fn().mockReturnValue({
      dialog: true,
      closeDialog: vi.fn(),
    }),
  },
}));

describe("invalidateSession", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should remove tokens and update the message status", () => {
    const setMessageStatusMock = useMessageStore.getState().setMessageStatus;
    const closeDialogMock = useDialogStore.getState().closeDialog;

    invalidateSession();

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();

    expect(setMessageStatusMock).toHaveBeenCalledWith('unauthorized');
    expect(closeDialogMock).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith({ to: '/ko' });
  });
});
