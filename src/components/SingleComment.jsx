import { useState } from "react";
import useComment from "../hooks/use-comment";

export default function SingleComment({ comment, isReply, setIsReply }) {
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { removeComment, editComment, likeComment, unlikeComment } =
    useComment();
  const d = new Date(comment.timestamp);
  const date = d.toLocaleDateString();
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const handleRemoveComment = (commentId) => {
    removeComment(commentId);
  };

  const handleKeyDown = (e, commentId) => {
    if (e.key === "Enter") {
      editComment(commentId, editContent);
      setEdit(false);
    }
  };

  const handleLike = (commentId) => {
    likeComment(commentId);
  };

  const handleUnLike = (commentId) => {
    unlikeComment(commentId);
  };

  return (
    <div className="p-3 bg-gray-100 rounded">
      {edit ? (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full p-2 grow border border-gray-300 rounded outline-none"
          row={3}
          cols={15}
          onBlur={() => setEdit(false)}
          onKeyDown={(e) => handleKeyDown(e, comment.id)}
          placeholder="Add a new comment..."
        />
      ) : (
        <p className="font-semibold text-lg">{comment.content}</p>
      )}
      <div className="flex flex-col gap-0 text-sm font-medium text-gray-500 mb-2">
        <span>Votes: {comment.votes}</span>
        <span>
          {date} {time}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleLike(comment.id)}
          className="bg-sky-500 text-white rounded px-2 py-1"
        >
          👍
        </button>
        <button
          onClick={() => handleUnLike(comment.id)}
          className="bg-sky-500 text-white rounded px-2 py-1"
        >
          👎
        </button>
        <button
          onClick={() => setIsReply((prev) => !prev)}
          className="bg-sky-500 text-white rounded px-2 py-1"
        >
          {isReply ? "Hide Replies" : "Reply"}
        </button>
        <button
          onClick={() => setEdit(true)}
          className="bg-sky-500 text-white rounded px-2 py-1"
        >
          Edit
        </button>
        <button
          onClick={() => handleRemoveComment(comment.id)}
          className="bg-sky-500 text-white rounded px-2 py-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
