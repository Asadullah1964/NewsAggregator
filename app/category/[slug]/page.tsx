'use client';

import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';

type Article = {
  title: string;
  url: string;
  description?: string;
  urlToImage?: string;
  publishedAt?: string;
  source: { name: string };
};

export default function CategoryPage() {
  // Read dynamic route and query params in a Client Component
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  const slug = params.slug;
  const pageParam = searchParams.get('page') ?? '1';

  const [articles, setArticles] = useState<Article[]>([]);
  const [bookmarkedUrls, setBookmarkedUrls] = useState<string[]>([]);
  const [page, setPage] = useState<number>(() => Math.max(1, parseInt(pageParam, 10)));

  // Ensure this is defined in env and Vercel project settings
  const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;

  // Build the request URL once per dependency change
  const requestUrl = useMemo(() => {
    const u = new URL('https://newsapi.org/v2/top-headlines');
    u.searchParams.set('country', 'us');
    u.searchParams.set('category', slug);
    u.searchParams.set('pageSize', '10');
    u.searchParams.set('page', String(page));
    u.searchParams.set('apiKey', apiKey ?? '');
    return u.toString();
  }, [slug, page, apiKey]);

  useEffect(() => {
    let cancelled = false;

    const fetchArticles = async () => {
      if (!apiKey) {
        console.error('Missing NEXT_PUBLIC_NEWSAPI_KEY');
        setArticles([]);
        return;
      }
      try {
        const { data } = await axios.get(requestUrl);
        if (!cancelled) {
          setArticles(data.articles || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(`Failed to fetch news for category ${slug}:`, error);
          setArticles([]);
        }
      }
    };

    fetchArticles();

    // bookmarks
    const stored = JSON.parse(localStorage.getItem('bookmarks') || '[]') as Article[];
    setBookmarkedUrls(stored.map((a) => a.url));

    return () => {
      cancelled = true;
    };
  }, [requestUrl, slug, apiKey]);

  const toggleBookmark = (article: Article) => {
    const stored = JSON.parse(localStorage.getItem('bookmarks') || '[]') as Article[];
    let updated: Article[];

    if (bookmarkedUrls.includes(article.url)) {
      updated = stored.filter((a) => a.url !== article.url);
    } else {
      updated = [...stored, article];
    }

    localStorage.setItem('bookmarks', JSON.stringify(updated));
    setBookmarkedUrls(updated.map((a) => a.url));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 capitalize text-gray-900 dark:text-white">
        {slug} News
      </h1>

      {articles.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No articles found for this category.
        </p>
      ) : (
        <>
          <ul className="grid gap-6 md:grid-cols-2">
            {articles.map((article, index) => {
              const isBookmarked = bookmarkedUrls.includes(article.url);
              return (
                <li
                  key={index}
                  className="border rounded-lg p-4 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg relative"
                >
                  <button
                    onClick={() => toggleBookmark(article)}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    className={`absolute top-3 right-3 p-1 rounded-full transition ${
                      isBookmarked
                        ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {isBookmarked ? '★' : '☆'}
                  </button>

                  {article.urlToImage && (
                    <Image
                      src={article.urlToImage}
                      alt={article.title}
                      width={800}
                      height={400}
                      className="w-full h-40 object-cover rounded mb-3"
                      loading="lazy"
                      // if external domains, configure next.config.js images.domains
                      unoptimized
                    />
                  )}

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-primary-700 dark:text-primary-400 mb-1 block hover:underline"
                  >
                    {article.title}
                  </a>

                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {article.description}
                  </p>
                  <small className="text-gray-500 dark:text-gray-400">
                    {article.source.name} •{' '}
                    {article.publishedAt && new Date(article.publishedAt).toLocaleString()}
                  </small>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-center mt-8 space-x-3">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`px-3 py-1 rounded border ${
                page <= 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            <span className="px-3 py-1 rounded border select-none">{page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded border hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
