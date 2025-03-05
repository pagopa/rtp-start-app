import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CopyClipboard from ".";

// Verify import component from mui-italia
const actualModule = await vi.importActual<typeof import("@pagopa/mui-italia")>("@pagopa/mui-italia");

// Mock component CopyToClipboardButton
vi.mock("@pagopa/mui-italia", () => ({
  CopyToClipboardButton: ({ value }: { value: string }) => (
    <button data-testid="copy-button" onClick={() => navigator.clipboard.writeText(value)}>
      Copy
    </button>
  ),
}));

describe("CopyClipboard", () => {

  it("should import CopyToClipboardButton from @pagopa/mui-italia", () => {
    expect(actualModule.CopyToClipboardButton).toBeDefined();
  });

  it("should render the text to copy", () => {
    const textToCopy = "Text to copy";

    render(<CopyClipboard textToCopy={textToCopy} />);

    // Check that the text is displayed
    const renderedText = screen.getByText(textToCopy);
    expect(renderedText).toBeInTheDocument();
  });

  it("should render the copy button", () => {
    render(<CopyClipboard textToCopy="Text to copy" />);

    // Check that the copy button is present
    const copyButton = screen.getByTestId("copy-button");
    expect(copyButton).toBeInTheDocument();
  });

  it("should copy text when the copy button is clicked", async () => {
    const textToCopy = "Text to copy";

    render(<CopyClipboard textToCopy={textToCopy} />);

    const copyButton = screen.getByTestId("copy-button");

    // Mock della clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });

    fireEvent.click(copyButton);

    // Make sure the text is copied
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);
  });

  it("should render the text with the correct typography variant", () => {
    const textToCopy = "Tetx to copy";

    render(<CopyClipboard textToCopy={textToCopy} />);

    // Verify that the text has the MUI Typography class for "body2"
    const renderedText = screen.getByText(textToCopy);
    expect(renderedText).toHaveClass("MuiTypography-body2");
  });
});