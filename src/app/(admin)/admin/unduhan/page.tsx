"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DownloadItem {
  id: string;
  name: string;
  createdAt: string;
  file?: string;
}

export default function ManageUnduhan() {
  const router = useRouter(); // Inisialisasi useRouter
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [downloadToDelete, setDownloadToDelete] = useState<string | null>(null);
  const [downloadToEdit, setDownloadToEdit] = useState<DownloadItem | null>(
    null
  );

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const fetchDownloads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/unduhan`,
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        setDownloads(data.downloads || []);
      } else {
        console.error("Failed to fetch downloads");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !file) {
      alert("Harap lengkapi semua form.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/unduhan`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Dokumen berhasil ditambahkan!");
        setIsModalOpen(false);
        setName("");
        setFile(null);
        fetchDownloads();
      } else {
        toast.error("Gagal menambahkan dokumen.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menambahkan dokkumen.");
    }
  };

  const handleEdit = (download: DownloadItem) => {
    setDownloadToEdit(download);
    setName(download.name);
    setFile(null); // Mengosongkan file yang lama
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert("Harap lengkapi semua bidang.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);

    if (file) {
      formData.append("file", file); // Menambahkan file baru jika ada
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/unduhan?id=${downloadToEdit?.id}`,
        {
          method: "PUT", // Menggunakan method PUT untuk update
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Dokumen berhasil diperbarui!");
        setIsModalOpen(false);
        setName("");
        setFile(null);
        setDownloadToEdit(null);
        setIsEditMode(false);
        fetchDownloads();
      } else {
        toast.error("Gagal memperbarui Dokumen.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat memperbarui dokumen.");
    }
  };

  const handleDelete = (id: string) => {
    setDownloadToDelete(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!downloadToDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/unduhan?id=${downloadToDelete}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setDownloads(
          downloads.filter((download) => download.id !== downloadToDelete)
        );
        setIsConfirmDeleteModalOpen(false);
        setDownloadToDelete(null);
        toast.success("Dokumen berhasil dihapus!");
      } else {
        toast.error("Gagal menghapus dokumen.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menghapus dokumen.");
    }
  };

  const cancelDelete = () => {
    setIsConfirmDeleteModalOpen(false);
    setDownloadToDelete(null);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/masuk");
    }
    fetchDownloads();
  }, [status, router]);

  return (
    <div className="flex-1 p-4 sm:ml-[270px] sm:mr-10 my-10 rounded-lg bg-white h-screen">
      <div className="my-4">
        <p className="text-xl font-semibold">
          Selamat datang, {session?.user?.name || "User"}! 👋
        </p>
      </div>
      <Breadcrumb />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Kelola Dokumen</h1>
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition"
        >
          Tambah Unduhan
        </button>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <p>Memuat data...</p>
        ) : (
          <table className="w-full text-left text-gray-600 border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {downloads.length > 0 ? (
                downloads.map((download) => (
                  <tr key={download.id}>
                    <td className="px-4 py-2">{download.name}</td>
                    <td className="px-4 py-2">
                      {new Date(download.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(download)}
                        className="bg-primary px-3 py-2 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(download.id)}
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
                    Tidak ada data unduhan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit Unduhan" : "Tambah Unduhan"}
            </h2>
            <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
              <label className="block mb-2">Nama Dokumen</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="block mt-4 mb-2">Pilih File</label>
              <input
                type="file"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                onChange={handleFileChange}
              />
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                >
                  {isEditMode ? "Perbarui" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Confirm Delete */}
      {isConfirmDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
            <p>Apakah Anda yakin ingin menghapus dokumen ini?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
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
