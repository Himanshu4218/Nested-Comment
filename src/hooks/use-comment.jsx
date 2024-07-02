import { comment } from "postcss";
import { useCommentData } from "../context/CommentContext";
import { v4 as uuid } from "uuid";

function useComment() {
  const { commentData, setCommentData } = useCommentData();

  const insertComment = (commentData, commentId, newComment) => {
    return commentData.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, replies: [...comment.replies, newComment] };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertComment(comment.replies, commentId, newComment),
        };
      } else {
        return comment;
      }
    });
  };

  const addComment = (commentId, content) => {
    const newComment = {
      id: uuid(),
      content: content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setCommentData((prevComments) =>
        insertComment(prevComments, commentId, newComment)
      );
    } else {
      setCommentData((prevComments) => [newComment, ...prevComments]);
    }
  };

  const removeNode = (tree, commentId) => {
    return tree.reduce((acc, comment) => {
      if (comment.id === commentId) {
        return acc;
      } else if (comment.replies && comment.replies.length > 0) {
        comment.replies = removeNode(comment.replies, commentId);
      }

      return [...acc, comment];
    }, []);
  };

  const editNode = (tree, commentId, content) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content: content,
          timestamp: new Date().toISOString(),
        };
      } else if (comment.replies && comment.replies.length > 0) {
        comment.replies = editNode(comment.replies, commentId, content);
      }

      return comment;
    });
  };

  const removeComment = (commentId) => {
    setCommentData((prevComments) => removeNode(prevComments, commentId));
  };

  const editComment = (commentId, content) => {
    setCommentData((prevComments) =>
      editNode(prevComments, commentId, content)
    );
  };

  const likeNode = (tree, commentId) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          votes: comment.votes + 1,
        };
      } else if (comment.replies && comment.replies.length > 0) {
        comment.replies = likeNode(comment.replies, commentId);
      }

      return comment;
    });
  };

  const unlikeNode = (tree, commentId) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          votes: comment.votes - 1,
        };
      } else if (comment.replies && comment.replies.length > 0) {
        comment.replies = unlikeNode(comment.replies, commentId);
      }

      return comment;
    });
  };

  const likeComment = (commentId) => {
    setCommentData((prevComments) => likeNode(prevComments, commentId));
  };

  const unlikeComment = (commentId) => {
    setCommentData((prevComments) => unlikeNode(prevComments, commentId));
  };

  return {
    commentData,
    addComment,
    removeComment,
    editComment,
    likeComment,
    unlikeComment,
  };
}

export default useComment;
