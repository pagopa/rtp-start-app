import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { RtpVersion } from "src/models/RtpVersion";
import { MessageStatus } from "src/stores/message.store";
import OKPage from ".";

const useSearchMock = vi.fn();
let messageStatus: MessageStatus = "default";

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  useSearch: (...args: unknown[]) => useSearchMock(...args),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, string>) =>
      params ? `${key} ${JSON.stringify(params)}` : key,
  }),
}));

vi.mock("src/stores/message.store", () => ({
  default: () => ({ messageStatus }),
}));

vi.mock("src/components/CopyClipboard", () => ({
  default: ({ textToCopy }: { textToCopy: string }) => <div data-testid="rtp-code">{textToCopy}</div>,
}));

vi.mock("src/components/StatusUpdateButton", () => ({
  StatusUpdateButton: ({ type, rtpId, label }: { type: string; rtpId: string; label: string }) => (
    <button data-testid="status-update-button" data-type={type} data-rtp-id={rtpId}>{label}</button>
  ),
}));

const RTP_ID = "588a3f73-02c3-4fd4-b2bf-5dfa1a17c3bc";

const renderPage = (status: MessageStatus, search: Record<string, string | undefined> = {}) => {
  messageStatus = status;
  useSearchMock.mockReturnValue(search);
  return render(<OKPage />);
};

describe("OKPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each(["statusUpdated", "statusUpdateCancelled"] as const)(
    "after %s shows title, RTP id and the reason code",
    (status) => {
      renderPage(status, { rtpId: RTP_ID, version: RtpVersion.V4, reason: "AC04" });

      expect(screen.getByText(`OK.${status}.title`)).toBeInTheDocument();
      expect(screen.getByText(`OK.${status}.reason {"reason":"AC04"}`)).toBeInTheDocument();
      expect(screen.getByTestId("rtp-code")).toHaveTextContent(RTP_ID);
      expect(screen.getByText(`OK.${status}.button`)).toBeInTheDocument();
      expect(screen.queryByTestId("status-update-button")).not.toBeInTheDocument();
    },
  );

  it.each(["statusUpdated", "statusUpdateCancelled"] as const)(
    "after %s without a reason code shows the no-reason message",
    (status) => {
      renderPage(status, { rtpId: RTP_ID, version: RtpVersion.V4 });

      expect(screen.getByText(`OK.${status}.noReason`)).toBeInTheDocument();
    },
  );

  it("after a v4.0 cancellation shows the Status Update Cancel button", () => {
    renderPage("deleted", { rtpId: RTP_ID, version: RtpVersion.V4 });

    expect(screen.getByText("OK.deleted.body")).toBeInTheDocument();
    const button = screen.getByTestId("status-update-button");
    expect(button).toHaveTextContent("OK.deleted.statusUpdateCancelButtonV4");
    expect(button).toHaveAttribute("data-type", "statusUpdateCancel");
    expect(button).toHaveAttribute("data-rtp-id", RTP_ID);
    expect(screen.queryByTestId("rtp-code")).not.toBeInTheDocument();
  });

  it.each([
    { name: "a v3.2 cancellation", status: "deleted" as const, search: { rtpId: RTP_ID, version: RtpVersion.V3 } },
    { name: "a cancellation without RTP id", status: "deleted" as const, search: { version: RtpVersion.V4 } },
    { name: "a generic success", status: "default" as const, search: { rtpId: RTP_ID, version: RtpVersion.V4 } },
  ])("does not show the Status Update Cancel button after $name", ({ status, search }) => {
    renderPage(status, search);

    expect(screen.queryByTestId("status-update-button")).not.toBeInTheDocument();
  });
});
