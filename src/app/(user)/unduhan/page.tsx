"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Download() {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
  const [filteredFiles, setFilteredFiles] = useState([]); // State untuk file yang difilter

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    // Filter file berdasarkan pencarian
    if (searchTerm.trim() === "") {
      setFilteredFiles(files);
    } else {
      setFilteredFiles(
        files.filter((file: any) =>
          file.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, files]);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/unduhan");
      const data = await response.json();
      if (response.ok) {
        setFiles(data.downloads || []);
        setFilteredFiles(data.downloads || []); // Inisialisasi dengan semua file
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update nilai pencarian
  };

  return (
    <div className="mx-5 md:mx-20 my-28">
      <div className="text-center">
        <h1 className="text-2xl md:text-[42px] font-semibold mb-2">Unduhan</h1>
        <h5 className="text-base md:text-lg">
          Unduh berkas resmi hanya di sini
        </h5>
      </div>

      <div className="bg-primary rounded-md px-7 md:px-14 py-4 md:py-8 mt-10 flex flex-col md:flex-row justify-between items-center">
        <p className="text-lg md:text-2xl text-white mb-4 md:mb-0">
          Tersedia {filteredFiles.length} Berkas
        </p>

        <form className="w-full md:w-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="search"
              id="default-search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Telusuri File"
              required
            />
          </div>
        </form>
      </div>

      {filteredFiles.length > 0 ? (
        <div className="border-b border-neutral-300 py-6 px-7 md:px-14 ">
          {filteredFiles.map((file: any, index) => (
            <div className="flex items-center justify-between" key={file.id}>
              <div className="flex gap-6 items-center">
                <p>{index + 1}</p>
                <p className="text-base text-gray-500">{file.name}</p>
              </div>
              <Link
                href={file.file}
                download
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/50"
              >
                Download
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mt-6">
          Tidak ada file yang sesuai dengan pencarian.
        </p>
      )}
    </div>
  );
}
