"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Mengambil ID dari URL
import { formatDistanceToNow } from "date-fns";

interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function ArticleDetail() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams(); // Mendapatkan id dari URL

  // Fetch single article by ID
  const fetchArticle = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/article?id=${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch article.");
      }
      const data = await res.json();
      setArticle(data.article);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchArticle(id as string);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!article) return <p>Article not found.</p>;

  // Fungsi untuk memformat konten artikel menjadi paragraf
  const formatContentToParagraphs = (content: string) => {
    // Misalnya, jika konten dipisahkan dengan \n atau <br> dan kita ingin membagi menjadi paragraf
    return content.split("\n").map((para, index) => (
      <p key={index} className="mb-4">
        {para}
      </p>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="mb-4 text-blue-500"
        onClick={() => window.history.back()}
      >
        Back to Articles
      </button>
      <div className="border p-4 rounded shadow">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {formatDistanceToNow(new Date(article.createdAt), {
            addSuffix: true,
          })}
        </p>

        {/* Menampilkan konten artikel dalam bentuk paragraf */}
        {formatContentToParagraphs(article.content)}
      </div>
    </div>
  );
}
