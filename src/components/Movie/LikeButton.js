import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

export default function LikeButton({ contentID, initialLikeCount, initialIsLikedByUser, apiBasePath }) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLikedByUser);

  useEffect(() => {
    setLikeCount(initialLikeCount);
    setIsLiked(initialIsLikedByUser);
  }, [contentID, initialLikeCount, initialIsLikedByUser]);

  const handleLike = async () => {
    if (!localStorage.getItem('access_token')) {
      alert("Please login to like this content");
      return;
    }

    // Store the current liked state before the API call
    const wasLiked = isLiked;

    try {
      const res = await fetch(`${apiBasePath}/favorite/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          userId: localStorage.getItem('user_uuid'),
          contentId: contentID,
        })
      });
      const data = await res.json();

      if (data.status) {
        const newIsLiked = data.isLiked;
        setIsLiked(newIsLiked);
        // Update like count based on the transition
        setLikeCount(prevLocalLikeCount => {
          if (newIsLiked && !wasLiked) { // Transitioned from not liked to liked
            return (prevLocalLikeCount || 0) + 1;
          } else if (!newIsLiked && wasLiked) { // Transitioned from liked to not liked
            return (prevLocalLikeCount || 0) - 1;
          }
          return prevLocalLikeCount; // No change in like status that warrants a count change, or count already reflects
        });
      } else {
        alert(data.message || "Failed to update like status.");
      }
    } catch (error) {
      console.error("Error updating like status:", error);
      alert("An error occurred while updating like status.");
    }
  };

  return (
    <button onClick={handleLike} className="flex flex-col items-center">
      <FaHeart className={`text-2xl ${isLiked ? 'text-[#FE2C55]' : 'text-[#ffffff]'}`} />
      <span>{likeCount === undefined || likeCount === null ? 0 : likeCount}</span>
    </button>
  );
}