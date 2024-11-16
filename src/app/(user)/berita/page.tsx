"use client";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

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

  const SkeletonCard = () => (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
      <div className="p-5">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="h-8 bg-primary/50 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="mx-5 md:mx-20 my-28">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">
          PCNA Ajibarang News
        </h1>
        <p className="text-gray-600 mb-2 md:mb-4">
          Berita terkini tentang PCNA Ajibarang.
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mt-16">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : articles.map((article) => (
              <div
                key={article.id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg flex flex-col"
              >
                <div className="w-full h-[240px] relative">
                  <Image
                    className="rounded-t-lg object-cover"
                    layout="fill"
                    width={0}
                    height={0}
                    src={article.image}
                    alt={article.title}
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-sm text-gray-600">
                    {formatDistanceToNow(new Date(article.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 mt-4">
                    {article.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
                    {article.content}
                  </p>
                  <div className="mt-auto">
                    <Link
                      href={`/berita/${article.id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary/50 focus:ring-4 focus:outline-none focus:ring-primary/60"
                    >
                      Baca Selengkapnya
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
