"use client";

import BookmarkButton from "../layout/BookmarkButton";

type Article = {
  source: { name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
};

export default function NewsList({ articles }: { articles: Article[] }) {
  if (!articles?.length) return null;

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {articles.map((article, i) => (
        <li
          key={i}
          className="relative group bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow overflow-hidden hover:shadow-lg transition"
        >
          {/* Entire card clickable */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            )}

            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-yellow-500 transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-3">
                {article.description}
              </p>

              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{article.source.name}</span>
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleString()}
                </time>
              </div>
            </div>
          </a>

          {/* Smaller Bookmark Button (like before) */}
          <div className="absolute top-2 right-2 z-10">
            <BookmarkButton article={article} />
          </div>
        </li>
      ))}
    </ul>
  );
}
