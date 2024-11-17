"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  image?: string;
}

export default function ManageBerita() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [articleToEdit, setArticleToEdit] = useState<Article | null>(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/article`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
      } else {
        console.error("Failed to fetch articles");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !image) {
      alert("Harap lengkapi semua bidang.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/article`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Berita berhasil ditambahkan!");
        setIsModalOpen(false);
        setTitle("");
        setContent("");
        setImage(null);
        fetchArticles();
      } else {
        toast.error("Gagal menambahkan berita.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menambahkan berita.");
    }
  };

  const handleEdit = (article: Article) => {
    setArticleToEdit(article);
    setTitle(article.title);
    setContent(article.content);
    setImage(null);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Harap lengkapi semua bidang.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    } else if (articleToEdit?.image) {
      formData.append("image", articleToEdit.image);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/article?id=${articleToEdit?.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Berita berhasil diperbarui!");
        setIsModalOpen(false);
        setTitle("");
        setContent("");
        setImage(null);
        setArticleToEdit(null);
        setIsEditMode(false);
        fetchArticles();
      } else {
        toast.error("Gagal memperbarui berita.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat memperbarui berita.");
    }
  };

  const handleDelete = (id: string) => {
    setArticleToDelete(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/article?id=${articleToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setArticles(
          articles.filter((article) => article.id !== articleToDelete)
        );
        setIsConfirmDeleteModalOpen(false);
        setArticleToDelete(null);
        toast.success("Berita berhasil dihapus!");
      } else {
        toast.error("Gagal menghapus berita.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menghapus berita.");
    }
  };

  const cancelDelete = () => {
    setIsConfirmDeleteModalOpen(false);
    setArticleToDelete(null);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="flex-1 p-4 sm:ml-72 sm:mr-10 my-10 rounded-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Kelola Berita</h1>
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition"
        >
          Tambah Berita
        </button>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <p>Memuat data...</p>
        ) : (
          <table className="w-full text-left text-gray-600 border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.length > 0 ? (
                articles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-4 py-2">{article.title}</td>
                    <td className="px-4 py-2">
                      {new Date(article.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-2 space-x-1">
                      <button
                        onClick={() => handleEdit(article)}
                        className="bg-primary px-3 py-2 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="bg-red-500 px-3 py-2 text-white rounded-md"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-center">
                    Tidak ada data berita.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add or Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit Berita" : "Tambah Berita"}
            </h2>
            <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Judul
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Konten
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  rows={4}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gambar
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleFileChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  {isEditMode ? "Update" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {isConfirmDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Yakin ingin menghapus berita ini?
            </h3>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
