import FileExplorer from "@components/Features/File-explorer";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("FileExplorer Component", () => {
  it("renders correctly with heading", () => {
    render(<FileExplorer />);
    expect(screen.getByText("File Explorer")).toBeInTheDocument();
    expect(screen.getByText("My Project")).toBeInTheDocument();
  });

  it("toggles folder open and close", () => {
    render(<FileExplorer />);
    const expandBtns = screen.getAllByLabelText("expand folder");
    fireEvent.click(expandBtns[0]);
    const collapseBtn = screen.getAllByLabelText("collapse folder");
    expect(collapseBtn[0]).toBeInTheDocument();
  });

  it("displays input when add file button is clicked", () => {
    render(<FileExplorer />);
    const addFileBtns = screen.getAllByLabelText("add file");
    fireEvent.click(addFileBtns[0]);
    expect(screen.getByPlaceholderText("Enter file name")).toBeInTheDocument();
  });

  it("displays file details when file is selected", async () => {
    render(<FileExplorer />);
    fireEvent.click(screen.getByLabelText("add file"));
    fireEvent.change(screen.getByPlaceholderText("Enter file name"), {
      target: { value: "details.ts" },
    });
    fireEvent.click(screen.getByLabelText("add file"));

    await waitFor(() => {
      expect(screen.getByText("details.ts")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText("view file"));

    expect(
      await screen.findByText("Here you can view the content of details.ts.")
    ).toBeInTheDocument();
  });
});
