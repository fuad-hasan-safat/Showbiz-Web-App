import React, { useState, useEffect } from 'react';
import { FaCommentDots } from 'react-icons/fa';

export default function CommentButton({ contentID, initialCommentCount, apiBasePath, onCommentAdded }) {
  const [commentCount, setCommentCount] = useState(initialCommentCount);

  useEffect(() => {
    setCommentCount(initialCommentCount);
  }, [contentID, initialCommentCount]);

  const handleComment = async () => {
    if (!localStorage.getItem('access_token')) {
      alert("Please login to comment on this content");
      return;
    }

    const commentText = prompt("Enter your comment:");
    if (!commentText || commentText.trim() === "") {
      // alert("Comment cannot be empty."); // Optionally, provide feedback or just return
      return;
    }

    const userId = localStorage.getItem('user_uuid');

    try {
      const response = await fetch(`${apiBasePath}/comments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          userId: userId,
          contentId: contentID,
          comment: commentText
        })
      });

      const data = await response.json();

      if (response.ok && data.status) {
        setCommentCount(prevCount => (prevCount || 0) + 1);
        if (onCommentAdded) {
            onCommentAdded(); // Callback to potentially update parent state if needed elsewhere
        }
        alert("Comment posted successfully!");
      } else {
        alert(data.message || "Failed to post comment. Please try again.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("An error occurred while posting your comment.");
    }
  };

  return (
    <button onClick={handleComment} className="flex flex-col items-center">
      <FaCommentDots className="text-2xl" />
      <span>{commentCount === undefined || commentCount === null ? 0 : commentCount}</span>
    </button>
  );
}