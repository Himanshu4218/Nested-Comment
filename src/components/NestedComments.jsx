import { useState } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import useComment from "../hooks/use-comment";

export default function NestedComments() {
  const [selected, setSelected] = useState("newest");
  const { commentData, setCommentData } = useComment();

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    switch (value) {
      case "newest":
        setCommentData(
          [...commentData].sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          )
        );
        break;
      case "oldest":
        setCommentData(
          [...commentData].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )
        );
        break;
      case "mostVoted":
        setCommentData([...commentData].sort((a, b) => a.votes < b.votes));
        break;
      default:
        setCommentData(commentData);
    }
  };
  return (
    <div>
      <CommentForm commentId={undefined} />
      <div className="my-2">
        <span className="text-[18px]">Sort by: </span>
        <select
          className="bg-gray-200 p-1 outline-none rounded"
          value={selected}
          onChange={handleChange}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostVoted">Most Voted</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 px-3 py-1 shadow">
        {commentData.map((comment) => {
          return <Comments key={comment.id} comment={comment} />;
        })}
      </div>
    </div>
  );
}
