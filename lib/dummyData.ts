// lib/dummyData.ts

export interface NewsItem {
  title: string;
  description: string;
  image: string;
  category: string;
}

export const trendingNews: NewsItem[] = [
  {
    title: "AI is Reshaping the Future of Work",
    description: "Experts weigh in on how AI will impact jobs by 2030.",
    image: "https://source.unsplash.com/random/400x300?ai",
    category: "Technology",
  },
  {
    title: "Olympics 2025: Records Set in Tokyo",
    description: "Athletes from around the world break boundaries.",
    image: "https://source.unsplash.com/random/400x300?sports",
    category: "Sports",
  },
  {
    title: "Climate Change Talks Begin in Paris",
    description: "World leaders unite for a greener tomorrow.",
    image: "https://source.unsplash.com/random/400x300?climate",
    category: "Politics",
  },
];
