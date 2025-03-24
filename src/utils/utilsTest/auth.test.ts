import { router } from "src/main";
import useMessageStore from "src/stores/message.store";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { invalidateSession } from "../auth.utils";

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

describe("invalidateSession", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should remove tokens and update the message status", () => {
    const setMessageStatusMock = useMessageStore.getState().setMessageStatus;

    invalidateSession();

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(localStorage.getItem('errro')).toBeNull();

    expect(setMessageStatusMock).toHaveBeenCalledWith('unauthorized');

    expect(router.navigate).toHaveBeenCalledWith({ to: '/ko' });
  });
});
