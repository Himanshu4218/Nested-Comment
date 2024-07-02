import { useState } from "react";
import SingleComment from "./SingleComment";
import CommentForm from "./CommentForm";

export default function Comments({ comment }) {
  const [isReply, setIsReply] = useState(false);
  return (
    <>
      <SingleComment
        comment={comment}
        isReply={isReply}
        setIsReply={setIsReply}
      />
      {isReply && <CommentForm isReply={isReply} commentId={comment.id} />}
      <div className="pl-2">
        {isReply &&
          comment.replies &&
          comment.replies.length > 0 &&
          comment.replies.map((comm) => (
            <Comments key={comm.id} comment={comm} />
          ))}
      </div>
    </>
  );
}
