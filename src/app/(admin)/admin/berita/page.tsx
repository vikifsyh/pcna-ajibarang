"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter untuk redirect
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
  const { data: session, status } = useSession();
  const router = useRouter(); // Inisialisasi useRouter
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/article`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/article`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/article?id=${articleToEdit?.id}`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/article?id=${articleToDelete}`,
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
    // Redirect ke halaman login jika belum login
    if (status === "unauthenticated") {
      router.push("/masuk");
    }
    fetchArticles();
  }, [status, router]); // Tambahkan router di sini

  return (
    <div className="flex-1 p-4 sm:ml-72 sm:mr-10 my-10 rounded-lg bg-white h-screen">
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
                    <td className="px-4 py-2">
                      {article.title.split(" ").slice(0, 5).join(" ")}
                      {article.title.split(" ").length > 5 ? "..." : ""}
                    </td>

                    <td className="px-4 py-2">
                      {new Date(article.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-2 space-x-0 space-y-1 md:space-y-0 md:space-x-1">
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
                  <td colSpan={3} className="text-center py-4">
                    Belum ada berita.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal untuk tambah dan edit berita */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit Berita" : "Tambah Berita"}
            </h2>
            <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Judul
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Konten
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={4}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Gambar
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  {isEditMode ? "Perbarui" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal konfirmasi hapus */}
      {isConfirmDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Apakah Anda yakin ingin menghapus berita ini?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
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
