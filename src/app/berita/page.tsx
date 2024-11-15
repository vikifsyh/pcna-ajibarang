"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Fetch all articles
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/article");
      if (!res.ok) {
        throw new Error("Failed to fetch articles.");
      }
      const data = await res.json();
      setArticles(data.articles);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            className="border p-4 rounded shadow hover:shadow-lg cursor-pointer"
            href={`/berita/${article.id}`}
          >
            <Image
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover rounded mb-2"
              width={1000}
              height={1000}
            />
            <h2 className="text-lg font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-600">
              {formatDistanceToNow(new Date(article.createdAt), {
                addSuffix: true,
              })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
