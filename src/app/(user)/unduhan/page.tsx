"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState, useEffect } from "react";

interface File {
  id: string;
  name: string;
  file: string;
}

export default function Download() {
  const [files, setFiles] = useState<File[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFiles, setFilteredFiles] = useState<File[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 5;

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    // Filter files based on search term
    if (searchTerm.trim() === "") {
      setFilteredFiles(files);
    } else {
      setFilteredFiles(
        files.filter((file) =>
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
        setFilteredFiles(data.downloads || []); // Initialize with all files
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update search term
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleGoButtonClick = () => {
    const pageInput = document.getElementById("page-input") as HTMLInputElement;
    const pageNumber = parseInt(pageInput.value, 10);
    handlePageChange(pageNumber);
  };

  // Slice the files for the current page
  const displayedFiles = filteredFiles.slice(
    (currentPage - 1) * filesPerPage,
    currentPage * filesPerPage
  );

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

      {displayedFiles.length > 0 ? (
        <div>
          {displayedFiles.map((file, index) => (
            <div
              className="border-b border-neutral-300 py-3 md:py-4 px-4 md:px-14 flex items-center justify-between"
              key={file.id}
            >
              <div className="flex gap-6 items-center">
                <p>{(currentPage - 1) * filesPerPage + index + 1}</p>
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

      {/* Pagination Controls */}
      <nav
        className="flex justify-between rounded-md shadow-sm mt-8"
        aria-label="Pagination"
      >
        <div className="flex items-center gap-2">
          <Link href="#" onClick={() => handlePageChange(currentPage - 1)}>
            <p className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              <ArrowLeftIcon className="w-4 h-4" />
            </p>
          </Link>

          {Array.from({ length: totalPages }, (_, index) => (
            <Link
              key={index + 1}
              href="#"
              onClick={() => handlePageChange(index + 1)}
            >
              <p
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "text-gray-900 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </p>
            </Link>
          ))}

          <Link href="#" onClick={() => handlePageChange(currentPage + 1)}>
            <p className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Next</span>
              <ArrowRightIcon className="w-4 h-4" />
            </p>
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Pergi ke halaman
          </label>
          <input
            type="number"
            id="page-input"
            min={1}
            max={totalPages}
            className="bg-gray-50 text-gray-900 text-sm rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 block w-12 h-10 p-2.5"
            defaultValue={currentPage}
          />
          <button
            onClick={handleGoButtonClick}
            className="bg-primary rounded-lg px-4 py-2 text-white"
          >
            Pergi
          </button>
        </div>
      </nav>
    </div>
  );
}
