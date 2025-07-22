import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import OtpInput from "./otpInput";

describe("OtpInput Component", () => {
  it("renders the component with 6 inputs", () => {
    render(<OtpInput />);
    const otpInputs = screen.getAllByRole("textbox");
    expect(otpInputs).toHaveLength(6);
  });

  it("focuses on first input on mount", () => {
    render(<OtpInput />);
    const otpInputs = screen.getAllByRole("textbox");
    expect(otpInputs[0]).toHaveFocus();
  });

  it("changes input on pressing tab button", async () => {
    render(<OtpInput />);
    const otpInputs = screen.getAllByRole("textbox");
    expect(otpInputs[0]).toHaveFocus();
    await userEvent.tab();
    expect(otpInputs[1]).toHaveFocus();
  });

  it("accepts numeric input and moves to next field", () => {
    render(<OtpInput />);
    const otpInputs = screen.getAllByRole("textbox");

    fireEvent.change(otpInputs[0], { target: { value: "7" } });
    expect(otpInputs[0]).toHaveValue("7");
    expect(otpInputs[1]).toHaveFocus();

    fireEvent.change(otpInputs[1], { target: { value: "2" } });
    expect(otpInputs[1]).toHaveValue("2");
    expect(otpInputs[2]).toHaveFocus();
  });

  it("only keeps last digit if multiple entered", () => {
    render(<OtpInput />);
    const otpInputs = screen.getAllByRole("textbox");

    fireEvent.change(otpInputs[0], { target: { value: "123" } });
    expect(otpInputs[0]).toHaveValue("3"); // last digit retained
  });

  it("ignores non-numeric input", () => {
    render(<OtpInput />);
    const otpInputs = screen.getAllByRole("textbox");

    fireEvent.change(otpInputs[0], { target: { value: "a" } });
    expect(otpInputs[0]).toHaveValue(""); // non-numeric ignored
  });

  it("goes back to previous input on backspace if input is empty", () => {
    render(<OtpInput />);
    const otpInputs = screen.getAllByRole("textbox");

    fireEvent.change(otpInputs[0], { target: { value: "1" } });
    fireEvent.change(otpInputs[1], { target: { value: "" } });

    // Focus should be on second input now
    expect(otpInputs[1]).toHaveFocus();

    // Fire backspace
    fireEvent.keyDown(otpInputs[1], { key: "Backspace", code: "Backspace" });
    expect(otpInputs[0]).toHaveFocus();
  });
});
