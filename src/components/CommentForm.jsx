import { useState } from "react";
import useComment from "../hooks/use-comment";

export default function CommentForm({ isReply = false, commentId }) {
  const [content, setContent] = useState("");
  const { addComment } = useComment();

  const handleSubmit = () => {
    if (content === "") return;
    addComment(commentId, content);
    setContent("");
  };
  return (
    <div className="flex gap-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 grow border border-gray-300 rounded outline-none"
        row={3}
        cols={15}
        placeholder="Add a new comment..."
      />
      <button
        onClick={handleSubmit}
        className="bg-sky-500 text-white transition-transform active:scale-95 rounded p-3"
      >
        {isReply ? "Submit Reply" : "Add Comment"}
      </button>
    </div>
  );
}
