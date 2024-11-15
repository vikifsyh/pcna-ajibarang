"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

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
  const [recommendations, setRecommendations] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams(); // Mendapatkan id dari URL
  const router = useRouter();

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

      // Fetch recommendations (articles excluding the current one)
      const recommendationsRes = await fetch(`/api/article?exclude=${id}`);
      if (!recommendationsRes.ok) {
        throw new Error("Failed to fetch recommendations.");
      }
      const recommendationsData = await recommendationsRes.json();
      setRecommendations(recommendationsData.articles);
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
    return content.split("\n").map((para, index) => (
      <p key={index} className="mb-4 text-justify">
        {para}
      </p>
    ));
  };

  return (
    <div className="mx-5 md:mx-20">
      {/* Kolom Utama (Detail Artikel) */}
      <div className="">
        <Link
          className="mb-4 inline-flex items-center text-base font-medium text-neutral-400"
          href={"/berita"}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Kembali
        </Link>
        <h5 className="text-base md:text-lg text-neutral-400">
          Baca berita terkini seputar PCNA Ajibarang
        </h5>

        <div className="md:flex md:justify-between gap-10">
          <div className="mt-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
            <p className="text-sm text-primary mb-4">
              {formatDistanceToNow(new Date(article.createdAt), {
                addSuffix: true,
              })}
            </p>
            <Image
              src={article.image}
              alt={article.title}
              width={1000}
              height={1000}
              className="w-full h-auto object-cover rounded mb-4"
            />

            {formatContentToParagraphs(article.content)}
          </div>

          {/* Kolom Kanan (Artikel Rekomendasi) */}
          <div className="mt-10 md:mt-4 max-w-lg">
            <h3 className="text-lg font-bold mb-4">Baca berita lainnya</h3>
            <div className="">
              {recommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="flex items-start space-x-4"
                >
                  <Image
                    src={recommendation.image}
                    alt={recommendation.title}
                    className="w-[160px] h-[160px] object-cover rounded"
                    width={1000}
                    height={1000}
                  />
                  <div className="space-y-4 md:space-y-8">
                    <div>
                      <Link
                        href={`/berita/${recommendation.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {recommendation.title}
                      </Link>
                      <p className="text-sm text-gray-600 mt-2">
                        {formatDistanceToNow(
                          new Date(recommendation.createdAt),
                          {
                            addSuffix: true,
                          }
                        )}
                      </p>
                    </div>
                    <button className="inline-flex items-center text-base font-medium px-3 py-2 border rounded-md">
                      Baca berita <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
