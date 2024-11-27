"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";
import Breadcrumb from "@/components/atoms/breadcrumb";

// Tipe data untuk Program
interface Program {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
}

export default function ManageProker() {
  const { data: session, status } = useSession();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | "">(
    ""
  ); // Tipe modal: "add", "edit", "delete"
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all data (API untuk mendapatkan data program)
    const fetchData = async () => {
      const res = await fetch("/api/program");
      const data = await res.json();
      if (data?.proker) {
        setPrograms(data.proker);
      }
    };

    fetchData();
  }, []);

  // Handle Add Program
  const handleAddProgram = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("content", newContent);
    if (newImage) {
      formData.append("image", newImage);
    }

    const res = await fetch("/api/program", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (result?.article) {
      setPrograms([...programs, result.article]);
      setNewTitle("");
      setNewContent("");
      setNewImage(null);
      setIsModalOpen(false); // Close modal after submit
    } else {
      alert("Failed to add program");
    }
  };

  // Handle Edit Program
  const handleEditProgram = async (e: FormEvent) => {
    e.preventDefault();
    if (editId) {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("content", editContent);
      if (editImage) {
        formData.append("image", editImage);
      }

      const res = await fetch(`/api/program?id=${editId}`, {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();
      if (result?.article) {
        const updatedPrograms = programs.map((program) =>
          program.id === editId ? result.article : program
        );
        setPrograms(updatedPrograms);
        setEditId(null);
        setEditTitle("");
        setEditContent("");
        setEditImage(null);
        setIsModalOpen(false); // Close modal after submit
      } else {
        alert("Failed to update program");
      }
    }
  };

  // Handle Delete Program
  const handleDeleteProgram = async () => {
    if (deleteId) {
      const res = await fetch(`/api/program?id=${deleteId}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (result?.message) {
        setPrograms(programs.filter((program) => program.id !== deleteId));
        setIsModalOpen(false); // Close modal after delete
      } else {
        alert("Failed to delete program");
      }
    }
  };

  // Open Modal based on Type (Add, Edit, Delete)
  const openModal = (
    type: "add" | "edit" | "delete",
    programId: string | null = null
  ) => {
    setModalType(type);
    if (type === "edit" && programId) {
      const program = programs.find((p) => p.id === programId);
      if (program) {
        setEditId(program.id);
        setEditTitle(program.title);
        setEditContent(program.content);
      }
    } else if (type === "delete" && programId) {
      setDeleteId(programId);
    }
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setEditTitle("");
    setEditContent("");
    setEditImage(null);
    setDeleteId(null);
  };

  return (
    <main className="flex-1 p-4 sm:ml-72 sm:mr-10 my-10 rounded-lg bg-white">
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
        <h1 className="text-2xl font-semibold text-gray-800">Kelola Program</h1>
        <button
          onClick={() => openModal("add")}
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition"
        >
          Tambah Program
        </button>
      </div>

      {/* Table for Programs */}
      <div className="overflow-x-auto">
        {programs.length === 0 ? (
          <p>No programs found</p>
        ) : (
          <table className="w-full text-left text-gray-600 border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 ">Nama</th>
                <th className="px-4 py-2 ">Program</th>
                <th className="px-4 py-2 ">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id}>
                  <td className="px-4 py-2">{program.title}</td>
                  <td className="px-4 py-2 ">{program.content}</td>

                  <td className="px-4 py-2 space-x-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => openModal("edit", program.id)}
                      className="bg-primary px-3 py-2 text-white rounded-md"
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => openModal("delete", program.id)}
                      className="bg-red-500 px-3 py-2 text-white rounded-md"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Add/Edit Program */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">
              {modalType === "add"
                ? "Tambah Program"
                : modalType === "edit"
                ? "Sunting Program"
                : "Hapus Program"}
            </h2>

            {modalType !== "delete" ? (
              <form
                onSubmit={
                  modalType === "add" ? handleAddProgram : handleEditProgram
                }
              >
                <div>
                  <label htmlFor="title" className="block mb-2">
                    Nama
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={modalType === "add" ? newTitle : editTitle}
                    onChange={(e) =>
                      modalType === "add"
                        ? setNewTitle(e.target.value)
                        : setEditTitle(e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="content"
                    className="block text-sm font-semibold"
                  >
                    Program
                  </label>
                  <textarea
                    id="content"
                    value={modalType === "add" ? newContent : editContent}
                    onChange={(e) =>
                      modalType === "add"
                        ? setNewContent(e.target.value)
                        : setEditContent(e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    rows={4}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-semibold"
                  >
                    Gambar
                  </label>
                  <input
                    id="image"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      if (modalType === "add") {
                        setNewImage(file);
                      } else {
                        setEditImage(file);
                      }
                    }}
                    className="border p-2 w-full mt-2"
                    accept="image/*"
                  />
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                  >
                    {modalType === "add"
                      ? "Tambah Program"
                      : "Simpan Perubahan"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-end">
                <button
                  onClick={handleDeleteProgram}
                  className="p-2 bg-red-500 text-white rounded mr-2"
                >
                  Hapus Program
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 bg-gray-300 text-black rounded"
                >
                  Batal
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
