'use client';

import { useEffect, useState } from 'react';

type Article = {
  source?: { name: string };
  author?: string | null;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt?: string;
};

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  // Load bookmarks on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(stored);
  }, []);

  // Remove bookmark handler
  const handleRemove = (url: string) => {
    const updated = bookmarks.filter((a) => a.url !== url);
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        📑 Your Bookmarks
      </h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No bookmarked articles yet.
        </p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {bookmarks.map((article, i) => (
            <li
              key={i}
              className="relative bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow p-4 hover:ring-2 hover:ring-yellow-400 transition"
            >
              {/* Small bookmark icon (top-right corner) */}
              <button
                onClick={() => handleRemove(article.url)}
                aria-label="Remove bookmark"
                className="absolute top-3 right-3 p-1 rounded-full bg-yellow-400 text-white hover:bg-yellow-500 transition"
              >
                ★
              </button>

              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-44 object-cover rounded mb-3"
                  loading="lazy"
                />
              )}

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-bold text-primary-700 dark:text-primary-400 hover:underline mb-1"
              >
                {article.title}
              </a>

              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {article.description?.slice(0, 100)}...
              </p>

              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{article.source?.name}</span>
                {article.publishedAt && (
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleString()}
                  </time>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
