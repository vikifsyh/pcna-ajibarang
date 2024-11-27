"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Breadcrumb from "@/components/atoms/breadcrumb";

interface File {
  id: string;
  name: string;
  file: string;
}

interface Article {
  id: string;
  title: string;
  content: string;
}

interface Program {
  id: string;
  name: string;
  content: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [files, setFiles] = useState<File[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetchFiles();
    fetchArticles();
    fetchPrograms(); 
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/unduhan");
      const data = await response.json();
      if (response.ok) {
        setFiles(data.downloads || []);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/article");
      const data = await response.json();
      if (response.ok) {
        setArticles(data.articles || []);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await fetch("/api/program");
      const data = await response.json();
      if (response.ok) {
        setPrograms(data.programs || []);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  return (
    <main className="flex-1 p-4 sm:ml-72 sm:mr-10 my-10 rounded-lg bg-white h-screen">
      <div className="my-4">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <p className="text-xl font-semibold">
            Selamat datang, {session.user?.name || "User"}! 👋
          </p>
        ) : (
          <p>Please log in.</p>
        )}
      </div>
      <Breadcrumb />
      <div className="grid grid-cols-3 gap-4">
        {/* Menampilkan jumlah unduhan */}
        <div className="bg-primary/40 p-4 rounded-lg text-center text-white">
          <p className="text-lg font-semibold">File Unduhan</p>
          <p className="text-2xl">{files.length}</p>
        </div>

        {/* Menampilkan jumlah artikel */}
        <div className="bg-primary/40 p-4 rounded-lg text-center text-white">
          <p className="text-lg font-semibold">Jumlah Artikel</p>
          <p className="text-2xl">{articles.length}</p>
        </div>

        {/* Menampilkan jumlah program */}
        <div className="bg-primary/40 p-4 rounded-lg text-center text-white">
          <p className="text-lg font-semibold">Jumlah Program</p>
          <p className="text-2xl">{programs.length}</p>
        </div>
      </div>
    </main>
  );
}
