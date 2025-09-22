import { useState, useEffect } from "react";
import { siteConfig } from "../config";

const hasCerts = siteConfig.certificates && siteConfig.certificates.length > 0;

export default function CertificatesSection() {
    const [popupOpen, setPopupOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openPopup = (index) => {
        setCurrentIndex(index);
        setPopupOpen(true);
    };

    const closePopup = () => setPopupOpen(false);

    const handleKeyDown = (e) => {
        if (!popupOpen) return;

        if (e.key === "Escape") closePopup();
        if (e.key === "ArrowRight")
            setCurrentIndex((prev) => (prev + 1) % siteConfig.certificates.length);
        if (e.key === "ArrowLeft")
            setCurrentIndex(
                (prev) =>
                    (prev - 1 + siteConfig.certificates.length) %
                    siteConfig.certificates.length
            );
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [popupOpen]);

    if (!hasCerts) return null;

    return (
        <section id="certificates" className="p-8 sm:p-12 md:p-16 lg:p-24">
            <div>
                <div className="lg:col-span-4 mb-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold text-gray-900">
                        Certificates
                    </h2>
                    <div
                        className="w-[75px] h-[5px] mt-2 rounded-full"
                        style={{ backgroundColor: siteConfig.accentColor }}
                    />
                </div>

              <div className="overflow-x-auto flex gap-6 py-4">
  {siteConfig.certificates.map((cert, index) => (
    <div
      key={index}
      className="flex-none cursor-pointer w-48 sm:w-56 md:w-64"
      onClick={() => openPopup(index)}
    >
      <img
        src={cert.thumbnail}
        alt={cert.name}
        className="w-full h-32 sm:h-40 md:h-44 object-cover rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
      />
      <p className="text-center mt-2 text-sm sm:text-base font-medium text-gray-800 break-words">
        {cert.name}
      </p>
    </div>
  ))}
</div>

            </div>

       {/* Popup Overlay */}
{popupOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-hidden"
  >
    {/* Close Button */}
    <button
      onClick={closePopup}
      className="absolute top-4 right-4 text-white text-5xl font-bold hover:text-gray-300 z-50"
    >
      ×
    </button>

    {/* Left Arrow */}
    <button
      onClick={() =>
        setCurrentIndex(
          (currentIndex - 1 + siteConfig.certificates.length) %
            siteConfig.certificates.length
        )
      }
      className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-gray-300 z-50"
    >
      ‹
    </button>

    {/* Right Arrow */}
    <button
      onClick={() =>
        setCurrentIndex((currentIndex + 1) % siteConfig.certificates.length)
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-gray-300 z-50"
    >
      ›
    </button>

    {/* Image/PDF */}
    <div className="relative max-w-4xl w-full mx-4 flex justify-center items-center">
      <img
        src={siteConfig.certificates[currentIndex].file}
        alt={siteConfig.certificates[currentIndex].name}
        className="rounded-xl max-h-[80vh] object-contain"
      />
    </div>

    {/* Caption */}
    <p className="text-white text-center mt-4 text-lg absolute bottom-8 w-full ">
      {siteConfig.certificates[currentIndex].name}
    </p>
  </div>
)}

        </section>
    );
}
