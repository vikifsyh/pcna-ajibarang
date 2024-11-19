import React from "react";

export default function VisiMisi() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-l from-[#01A54D] to-white px-5 py-10 lg:px-20 lg:py-[113px]">
        <div>
          <h1 className="md:text-5xl text-2xl font-bold text-black text-center">
            Visi PCNA Ajibarang
          </h1>
          <p className="md:text-lg text-sm text-center text-black my-2">
            Pimpinan Cabang Nasyiatul Aisyiyah Ajibarang
          </p>
        </div>
        <div className="bg-gradient-to-l from-white to-transparent px-9 py-10 max-w-2xl rounded-md text-right mt-7 md:mt-0">
          <p className="md:text-lg text-base text-black">
            "Terbentuknya putri Islam yang berarti bagi keluarga, bangsa, dan
            agama menuju terwujudnya masyarakat Islam yang sebenar-benarnya"
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-[#01A54D] to-white px-5 py-10 lg:px-20 lg:py-20">
        <div className="block lg:hidden">
          <h1 className="md:text-5xl text-2xl font-bold text-black md:text-right text-center">
            Misi PCNA Ajibarang
          </h1>
          <p className="md:text-lg text-sm md:text-right text-center text-black my-2">
            Pimpinan Cabang Nasyiatul Aisyiyah Ajibarang
          </p>
        </div>
        <div>
          <div className="bg-gradient-to-r from-white to-transparent px-9 py-10 max-w-3xl rounded-md text-left mt-[10px]">
            <p className="md:text-lg text-base text-black">
              Melaksanakan dakwah Islam amar ma'ruf nahi munkar dalam membina
              putri Islam yang berarti bagi agama, bangsa, dan negara menuju
              terwujudnya masyarakat yang sebenar-benarnya.
            </p>
          </div>
          <div className="bg-gradient-to-r from-white to-transparent px-9 py-10 max-w-3xl rounded-md text-left mt-[10px]">
            <p className="md:text-lg text-base text-black">
              Melaksanakan pencerahan dan pemberdayaan perempuan menuju
              masyarakat yang menjunjung tinggi harkat, martabat dan nilai-nilai
              kemanusiaan yang sesuai dengan ajaran Islam.
            </p>
          </div>
          <div className="bg-gradient-to-r from-white to-transparent px-9 py-10 max-w-3xl rounded-md text-left mt-[10px]">
            <p className="md:text-lg text-base text-black">
              Menyelenggarakan amal usaha dan meningkatkan peran Nasyiatul
              'Aisyiyah sebagai pelopor, pelangsung dan penyempurna perjuangan
              Muhammadiyah.
            </p>
          </div>
        </div>
        <div className="hidden lg:block">
          <h1 className="md:text-5xl text-2xl font-bold text-black md:text-right text-center">
            Misi PCNA Ajibarang
          </h1>
          <p className="md:text-lg text-sm md:text-right text-center text-black my-2">
            Pimpinan Cabang Nasyiatul Aisyiyah Ajibarang
          </p>
        </div>
      </div>
    </>
  );
}
