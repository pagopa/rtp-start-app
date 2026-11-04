import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { RtpVersion } from "src/models/RtpVersion";
import { useSendStatusUpdate } from "./useSendStatusUpdate";

const navigateMock = vi.fn();
const mutateMock = vi.fn();
const useStatusUpdateMock = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("src/api/useStatusUpdate", () => ({
  useStatusUpdate: (...args: unknown[]) => useStatusUpdateMock(...args),
}));

const RTP_ID = "588a3f73-02c3-4fd4-b2bf-5dfa1a17c3bc";

const sendAndGetCallbacks = (type: "statusUpdate" | "statusUpdateCancel") => {
  const { result } = renderHook(() => useSendStatusUpdate(type));
  result.current.send(RTP_ID);
  return mutateMock.mock.calls[0][1];
};

describe("useSendStatusUpdate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStatusUpdateMock.mockReturnValue({ mutate: mutateMock, isPending: false, isError: false });
  });

  it("uses the mutation of the given type and exposes its state", () => {
    useStatusUpdateMock.mockReturnValue({ mutate: mutateMock, isPending: true, isError: true });

    const { result } = renderHook(() => useSendStatusUpdate("statusUpdateCancel"));

    expect(useStatusUpdateMock).toHaveBeenCalledWith("statusUpdateCancel");
    expect(result.current.isPending).toBe(true);
    expect(result.current.isError).toBe(true);
  });

  it("sends the resource id", () => {
    sendAndGetCallbacks("statusUpdate");

    expect(mutateMock).toHaveBeenCalledWith({ resourceId: RTP_ID }, expect.any(Object));
  });

  it.each([
    { type: "statusUpdate" as const, status: "statusUpdated" },
    { type: "statusUpdateCancel" as const, status: "statusUpdateCancelled" },
  ])("on $type success goes to the OK page with result $status and the reason code", ({ type, status }) => {
    const { onSuccess } = sendAndGetCallbacks(type);

    onSuccess({ data: { resourceId: RTP_ID, reason: "AC04" } });

    expect(navigateMock).toHaveBeenCalledWith({
      to: "/ok",
      search: { result: status, rtpId: RTP_ID, version: RtpVersion.V4, reason: "AC04" },
    });
  });

  it.each([null, undefined])("omits the reason when the API returns %s", (reason) => {
    const { onSuccess } = sendAndGetCallbacks("statusUpdate");

    onSuccess({ data: { resourceId: RTP_ID, reason } });

    expect(navigateMock).toHaveBeenCalledWith({
      to: "/ok",
      search: { result: "statusUpdated", rtpId: RTP_ID, version: RtpVersion.V4, reason: undefined },
    });
  });

  it.each([500, 504])("goes to the KO page on a %s error", (status) => {
    const { onError } = sendAndGetCallbacks("statusUpdate");

    onError({ response: { status } });

    expect(navigateMock).toHaveBeenCalledWith({ to: "/ko" });
  });

  it.each([
    { name: "a 4xx error", error: { response: { status: 404 } } },
    { name: "an error without response", error: {} },
  ])("stays on the page on $name", ({ error }) => {
    const { onError } = sendAndGetCallbacks("statusUpdate");

    onError(error);

    expect(navigateMock).not.toHaveBeenCalled();
  });
});
