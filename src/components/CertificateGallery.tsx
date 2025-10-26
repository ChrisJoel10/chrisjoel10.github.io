import { useState, useEffect } from "react";
import { siteConfig } from "../config";
import Modal from "../components/Modal";

export default function CertificatesSection() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasCerts = siteConfig.certificates?.length > 0;

  const openPopup = (index: number) => {
    setCurrentIndex(index);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % siteConfig.certificates.length);
  const handlePrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + siteConfig.certificates.length) % siteConfig.certificates.length
    );

  useEffect(() => {
    if (popupOpen && window.gtag) {
      const cert = siteConfig.certificates[currentIndex];
      window.gtag("event", "view_certificate", {
        event_category: "engagement",
        event_label: cert.name,
      });
    }
  }, [currentIndex, popupOpen]);

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

      <Modal
        open={popupOpen}
        items={siteConfig.certificates}
        currentIndex={currentIndex}
        onClose={closePopup}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
