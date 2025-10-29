import axios from "axios";

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const url = decodeURIComponent(slug);

  const { data } = await axios.get(url);
  // NewsAPI URLs are external, so you’ll likely just display the link.

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Full Article</h1>
      <p className="mb-4">
        This is an external article. You can read it directly below:
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 underline"
      >
        Open full article
      </a>
    </div>
  );
}
