import axios from "axios";
import NewsList from "../../components/news/NewsList";

type Article = {
  source: { name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
};

type TrendingProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function TrendingPage({ searchParams }: TrendingProps) {
  // ✅ Await searchParams first
  const resolvedParams = await searchParams;
  const page = Math.max(1, parseInt(resolvedParams?.page ?? "1", 10));

  const apiKey = process.env.NEWSAPI_KEY!;
  const url = `https://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&pageSize=10&page=${page}&apiKey=${apiKey}`;

  let articles: Article[] = [];

  try {
    const { data } = await axios.get(url);
    articles = Array.isArray(data.articles) ? data.articles : [];
  } catch (err) {
    console.error("Failed to fetch trending news:", err);
    articles = [];
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Trending News
      </h1>

      {articles.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No trending articles found.</p>
      ) : (
        <NewsList articles={articles} />
      )}

      <div className="flex justify-center mt-8 space-x-3">
        <a
          href={`/trending?page=${page - 1}`}
          className={`px-3 py-1 rounded border ${
            page <= 1 ? "opacity-50 pointer-events-none" : ""
          }`}
          aria-disabled={page <= 1}
        >
          Previous
        </a>
        <span className="px-3 py-1 rounded border select-none">{page}</span>
        <a
          href={`/trending?page=${page + 1}`}
          className="px-3 py-1 rounded border"
        >
          Next
        </a>
      </div>
    </>
  );
}
