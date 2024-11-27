// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// interface Program {
//   id: string;
//   title: string;
//   content: string;
//   image: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export default function ProgramTerlaksana() {
//   const [programs, setPrograms] = useState<Program[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchPrograms() {
//       try {
//         const response = await fetch("/api/program"); // URL endpoint API
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data: Program[] = await response.json();
//         setPrograms(data);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message);
//         setLoading(false);
//       }
//     }
//     fetchPrograms();
//   }, []);

//   return (
//     <div className="mx-5 md:mx-20 my-10">
//       <h1 className="text-2xl font-semibold mb-5">Program Terlaksana</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 md:mt-16">
//         {programs.map((program) => (
//           <div
//             key={program.id}
//             className="max-w-sm bg-white border border-gray-200 rounded-lg flex flex-col"
//           >
//             <div className="w-full h-[240px] relative">
//               <Image
//                 className="rounded-t-lg object-cover"
//                 layout="fill"
//                 width={0}
//                 height={0}
//                 src={program.image}
//                 alt={program.title}
//               />
//             </div>
//             <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 mt-4">
//               {program.title}
//             </h5>
//             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
//               {program.content}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Program {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProgramTerlaksana() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("/api/program")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); // Debug respons
        if (Array.isArray(data.proker)) {
          setPrograms(data.proker); // Ambil array `proker` dari respons
        } else {
          console.error("Unexpected response structure:", data);
        }
      })
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);

  return (
    <div className="mx-5 md:mx-20 my-10">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">
          Program Kerja Terlaksana
        </h1>
        <p className="text-gray-600 mb-2 md:mb-4">
          Telusuri Program Terlaksana PCNA Ajibarang.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 md:mt-16">
        {programs.length > 0 ? (
          <ul className="max-w-sm bg-white border border-gray-200 rounded-lg flex flex-col">
            {programs.map((program) => (
              <li key={program.id}>
                <div className="w-full h-[240px] relative">
                  <Image
                    className="rounded-t-lg object-cover"
                    layout="fill"
                    width={0}
                    height={0}
                    src={program.image}
                    alt={program.title}
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 mt-4">
                    {program.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
                    {program.content}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">Belum ada program yang tersedia.</p>
        )}
      </div>
    </div>
  );
}
