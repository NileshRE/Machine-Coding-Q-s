import { render, screen, waitFor } from "@testing-library/react";
import ProgressBar from "../components/Features/Progress-bar/ProgressBar";

describe("Progress Bar", () => {
  it("renders orange background color", async () => {
    render(<ProgressBar width={60} />);
    const bar = screen.getByTestId("progress-bar-60");
    await waitFor(
      () => {
        expect(bar).toHaveClass("bg-orange-400");
      },
      { timeout: 300 }
    );
  });

  it("renders green background color", async () => {
    render(<ProgressBar width={80} />);
    const bar = screen.getByTestId("progress-bar-80");
    await waitFor(
      () => {
        expect(bar).toHaveClass("bg-green-400");
      },
      { timeout: 300 }
    );
  });

  it("render red background color", async () => {
    render(<ProgressBar width={15} />);
    const bar = screen.getByTestId("progress-bar-15");
    await waitFor(
      () => {
        expect(bar).toHaveClass("bg-red-500");
      },
      { timeout: 300 }
    );
  });
});
