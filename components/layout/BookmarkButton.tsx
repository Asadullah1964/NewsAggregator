// components/BookmarkButton.tsx
'use client';

import { useEffect, useState } from "react";

type BookmarkButtonProps = {
  article: {
    title: string;
    url: string;
    urlToImage?: string;
    description?: string;
    source?: { name: string };
    publishedAt?: string;
  };
};

export default function BookmarkButton({ article }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  // Check if the article is already bookmarked
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const exists = stored.some((a: any) => a.url === article.url);
    setBookmarked(exists);
  }, [article.url]);

  const toggleBookmark = () => {
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    let updated;

    if (bookmarked) {
      updated = stored.filter((a: any) => a.url !== article.url);
      setBookmarked(false);
    } else {
      updated = [...stored, article];
      setBookmarked(true);
    }

    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  return (
    <button
      onClick={toggleBookmark}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded select-none cursor-pointer z-10
        ${bookmarked
          ? "bg-yellow-400 text-white"
          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        }
        hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors`}
    >
      {bookmarked ? "★" : "☆"} {bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
