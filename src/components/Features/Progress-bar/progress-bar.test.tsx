import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("Progress Bar", () => {
  it("renders orange background color", async () => {
    render(<ProgressBar width={60} />);
    const bar = await screen.findByText("60%");
    expect(bar).toHaveClass("bg-orange-400");
  });

  it("renders green background color", async () => {
    render(<ProgressBar width={80} />);
    const bar = await screen.findByText("80%");
    expect(bar).toHaveClass("bg-green-400");
  });

  it("render red background color", async () => {
    render(<ProgressBar width={15} />);
    const bar = await screen.findByText("15%");
    expect(bar).toHaveClass("bg-red-500");
  });
});
