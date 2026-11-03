import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CancelReason } from "generated/apiClient";
import { RtpVersion } from "src/models/RtpVersion";
import { DialogType } from "src/utils/dialog.utils";
import { RtpActions } from "./RtpActions";

const navigateMock = vi.fn();
const openDialogMock = vi.fn();
const getDialogDataMock = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("src/stores/dialog.store", () => ({
  useDialog: () => ({ openDialog: openDialogMock }),
}));

vi.mock("src/utils/dialog.utils", () => ({
  DialogType: { DELETE: "delete" },
  getDialogData: (...args: unknown[]) => getDialogDataMock(...args),
}));

const RTP_ID = "588a3f73-02c3-4fd4-b2bf-5dfa1a17c3bc";

describe("RtpActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows only the v3.2 cancel buttons for an RTP sent with v3.2", () => {
    render(<RtpActions rtpId={RTP_ID} version={RtpVersion.V3} />);

    expect(screen.getByText("OK.rtpParams.cancelModtButtonV3")).toBeInTheDocument();
    expect(screen.getByText("OK.rtpParams.cancelPaidButtonV3")).toBeInTheDocument();
    expect(screen.queryByText("OK.rtpParams.cancelModtButtonV4")).not.toBeInTheDocument();
    expect(screen.queryByText("OK.rtpParams.cancelPaidButtonV4")).not.toBeInTheDocument();
    expect(screen.queryByText("OK.rtpParams.statusUpdateButtonV4")).not.toBeInTheDocument();
  });

  it("shows the v4.0 cancel buttons and Status Update for an RTP sent with v4.0", () => {
    render(<RtpActions rtpId={RTP_ID} version={RtpVersion.V4} />);

    expect(screen.getByText("OK.rtpParams.cancelModtButtonV4")).toBeInTheDocument();
    expect(screen.getByText("OK.rtpParams.cancelPaidButtonV4")).toBeInTheDocument();
    expect(screen.getByText("OK.rtpParams.statusUpdateButtonV4")).toBeInTheDocument();
    expect(screen.queryByText("OK.rtpParams.cancelModtButtonV3")).not.toBeInTheDocument();
    expect(screen.queryByText("OK.rtpParams.cancelPaidButtonV3")).not.toBeInTheDocument();
  });

  it.each([
    { version: RtpVersion.V3, label: "OK.rtpParams.cancelModtButtonV3", reason: CancelReason.MODT },
    { version: RtpVersion.V3, label: "OK.rtpParams.cancelPaidButtonV3", reason: CancelReason.PAID },
    { version: RtpVersion.V4, label: "OK.rtpParams.cancelModtButtonV4", reason: CancelReason.MODT },
    { version: RtpVersion.V4, label: "OK.rtpParams.cancelPaidButtonV4", reason: CancelReason.PAID },
  ])("opens the cancel dialog with $reason and $version", ({ version, label, reason }) => {
    render(<RtpActions rtpId={RTP_ID} version={version} />);

    fireEvent.click(screen.getByText(label));

    expect(getDialogDataMock).toHaveBeenCalledWith(DialogType.DELETE, RTP_ID, reason, version);
    expect(openDialogMock).toHaveBeenCalled();
  });

  it("navigates to the status update form with the RTP id prefilled", () => {
    render(<RtpActions rtpId={RTP_ID} version={RtpVersion.V4} />);

    fireEvent.click(screen.getByText("OK.rtpParams.statusUpdateButtonV4"));

    expect(navigateMock).toHaveBeenCalledWith({
      to: "/status-update",
      search: { resourceId: RTP_ID },
    });
  });
});
