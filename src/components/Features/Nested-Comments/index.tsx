import Heading from "@components/Common/Heading";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type CommentType = {
  id: string;
  text: string;
  replies: CommentType[];
};
const Comment = ({
  comment,
  onReply,
}: {
  comment: CommentType;
  onReply: (id: string, replyText: string) => void;
}) => {
  const [replyInput, setReplyInput] = useState<string>("");
  const handleAddReply = () => {
    if (replyInput.trim()) {
      onReply(comment.id, replyInput);
      setReplyInput("");
    }
  };
  return (
    <div className="ml-4 mt-4">
      <p className="text-gray-700">{comment.text}</p>
      <div className="flex gap-2 mt-2">
        <input
          value={replyInput}
          onChange={(e) => setReplyInput(e.target.value)}
          placeholder="Write a reply..."
          className="border-b-2 px-2 py-1 text-sm focus-within:outline-none"
        />
        <button
          onClick={handleAddReply}
          className="px-2 text-sm text-blue-500 cursor-pointer"
          aria-label="Reply"
        >
          Reply
        </button>
      </div>
      <div className="ml-4">
        {comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} onReply={onReply} />
        ))}
      </div>
    </div>
  );
};

const NestedComment = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [input, setInput] = useState<string>("");
  const addComment = () => {
    if (input.trim()) {
      setComments([...comments, { id: uuidv4(), text: input, replies: [] }]);
      setInput("");
    }
  };
  const addReply = (id: string, replyText: string) => {
    const addReplyRecursive = (comments: CommentType[]): CommentType[] => {
      return comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              { id: uuidv4(), text: replyText, replies: [] },
            ],
          };
        }
        return {
          ...comment,
          replies: addReplyRecursive(comment.replies),
        };
      });
    };
    setComments(addReplyRecursive(comments));
  };

  return (
    <div>
      <Heading heading="Nested Comments" />
      <div className="flex gap-2 mb-4 w-2/4 mx-auto my-8">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border-b-2 px-2 py-1 border-gray-400 focus-within:outline-none"
        />
        <button
          onClick={addComment}
          className="border px-2 text-gray-500 rounded-full cursor-pointer"
          aria-label="Comment"
        >
          Comment
        </button>
      </div>
      <div className="w-2/4 mx-auto">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onReply={addReply} />
        ))}
      </div>
    </div>
  );
};

export default NestedComment;
