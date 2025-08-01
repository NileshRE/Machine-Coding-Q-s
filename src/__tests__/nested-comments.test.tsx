import NestedComment from "@components/Features/Nested-Comments";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Nested Comment Component", () => {
  beforeEach(() => {
    render(<NestedComment />);
  });
  it("renders nested component with heading", () => {
    expect(screen.getByText("Nested Comments")).toBeInTheDocument();
  });

  it("renders comment button", () => {
    const button = screen.getByLabelText("Comment");
    expect(button).toBeInTheDocument();
  });

  it("renders input field", () => {
    const cmntInput = screen.getByPlaceholderText("Write a comment...");
    expect(cmntInput).toBeInTheDocument();
  });

  it("should show a comment on writing and clicking of comment btn", async () => {
    const cmntInput = screen.getByPlaceholderText("Write a comment...");
    const btn = screen.getByLabelText("Comment");
    fireEvent.change(cmntInput, { target: { value: "My First Comment" } });
    fireEvent.click(btn);
    const cmntText = await screen.findByText("My First Comment");
    expect(cmntText).toBeInTheDocument();
  });

  it("should show a reply on a comment", async () => {
    const cmntInput = screen.getByPlaceholderText("Write a comment...");
    const btn = screen.getByLabelText("Comment");
    fireEvent.change(cmntInput, { target: { value: "My First Comment" } });
    fireEvent.click(btn);
    const replyInput = screen.getByPlaceholderText("Write a reply...");
    const replyBtn = screen.getByLabelText("Reply");
    fireEvent.change(replyInput, { target: { value: "My First Reply" } });
    fireEvent.click(replyBtn);
    const replyText = await screen.findByText("My First Reply");
    expect(replyText).toBeInTheDocument();
  });
});
