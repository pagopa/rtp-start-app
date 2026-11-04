import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StatusUpdatePage } from ".";

const navigateMock = vi.fn();
const sendMock = vi.fn();
const useSendStatusUpdateMock = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("src/hooks/useSendStatusUpdate", () => ({
  useSendStatusUpdate: (...args: unknown[]) => useSendStatusUpdateMock(...args),
}));

const RTP_ID = "588a3f73-02c3-4fd4-b2bf-5dfa1a17c3bc";

const getInput = () => screen.getByLabelText("StatusUpdatePage.resourceIdLabel");

describe("StatusUpdatePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSendStatusUpdateMock.mockReturnValue({ send: sendMock, isPending: false, isError: false });
  });

  it.each(["statusUpdate", "statusUpdateCancel"] as const)("renders the %s form", (type) => {
    render(<StatusUpdatePage type={type} />);

    expect(useSendStatusUpdateMock).toHaveBeenCalledWith(type);
    expect(screen.getByText(`StatusUpdatePage.${type}.title`)).toBeInTheDocument();
    expect(screen.getByText(`StatusUpdatePage.${type}.submitButton`)).toBeInTheDocument();
  });

  it("prefills the resource id and sends it on submit", async () => {
    render(<StatusUpdatePage type="statusUpdate" defaultResourceId={RTP_ID} />);

    expect(getInput()).toHaveValue(RTP_ID);
    fireEvent.click(screen.getByText("StatusUpdatePage.statusUpdate.submitButton"));

    await waitFor(() => expect(sendMock).toHaveBeenCalledWith(RTP_ID));
  });

  it("sends the typed resource id without surrounding spaces", async () => {
    render(<StatusUpdatePage type="statusUpdateCancel" />);

    fireEvent.change(getInput(), { target: { value: `  ${RTP_ID}  ` } });
    fireEvent.click(screen.getByText("StatusUpdatePage.statusUpdateCancel.submitButton"));

    await waitFor(() => expect(sendMock).toHaveBeenCalledWith(RTP_ID));
  });

  it("does not send an empty resource id", async () => {
    render(<StatusUpdatePage type="statusUpdate" />);

    fireEvent.click(screen.getByText("StatusUpdatePage.statusUpdate.submitButton"));

    expect(await screen.findByText("StatusUpdatePage.validation.resourceId.required")).toBeInTheDocument();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("does not send a resource id that is not a UUID", async () => {
    render(<StatusUpdatePage type="statusUpdate" />);

    fireEvent.change(getInput(), { target: { value: "not-a-uuid" } });
    fireEvent.click(screen.getByText("StatusUpdatePage.statusUpdate.submitButton"));

    expect(await screen.findByText("StatusUpdatePage.validation.resourceId.uuid")).toBeInTheDocument();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("shows the error alert when the request fails", () => {
    useSendStatusUpdateMock.mockReturnValue({ send: sendMock, isPending: false, isError: true });

    render(<StatusUpdatePage type="statusUpdate" />);

    expect(screen.getByText("StatusUpdatePage.error")).toBeInTheDocument();
  });

  it("disables the submit button while the request is pending", () => {
    useSendStatusUpdateMock.mockReturnValue({ send: sendMock, isPending: true, isError: false });

    render(<StatusUpdatePage type="statusUpdate" />);

    expect(screen.getByRole("button", { name: /StatusUpdatePage.statusUpdate.submitButton/ })).toBeDisabled();
  });

  it("goes back to the creation page", () => {
    render(<StatusUpdatePage type="statusUpdate" />);

    fireEvent.click(screen.getByText("StatusUpdatePage.backButton"));

    expect(navigateMock).toHaveBeenCalledWith({ to: "/" });
  });
});
