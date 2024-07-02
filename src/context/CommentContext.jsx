import comments from "../data/comments.json";
import { createContext, useContext, useState } from "react";

const CommentContext = createContext();

export const useCommentData = () => useContext(CommentContext);

export default function CommentContextProvider({ children }) {
  const [commentData, setCommentData] = useState(comments);
  return (
    <CommentContext.Provider value={{ commentData, setCommentData }}>
      {children}
    </CommentContext.Provider>
  );
}
