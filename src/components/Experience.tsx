"use client";

import { useState } from "react";
import { siteConfig } from "../config";
import Modal from "./Modal";

export default function Experience() {
  const hasExperience =
    siteConfig.experience && siteConfig.experience.length > 0;

  const [modalOpen, setModalOpen] = useState(false);
  const [attachments, setAttachments] = useState<{ name: string; file: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleOpen = (newAttachments: { name: string; file: string }[], index: number) => {
    setAttachments(newAttachments);
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % attachments.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + attachments.length) % attachments.length);
  };

  if (!hasExperience) return null;

  return (
    <section id="experience" className="p-8 sm:p-12 md:p-16 lg:p-24">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold text-gray-900">
              Experience
            </h2>
            <div
              className="w-[75px] h-[5px] mt-2 rounded-full"
              style={{ backgroundColor: siteConfig.accentColor }}
            />
          </div>

          <div className="lg:col-span-8">
            <div className="relative">
              {siteConfig.experience.map((exp: any, index: number) => (
                <div className="relative mb-12 last:mb-0" key={index}>
                  {/* Timeline dot at top of card */}
                  <div
                    className="absolute left-1/2 -top-2 w-4 h-4 bg-white border-2 rounded-full -translate-x-1/2 z-20 transition-all duration-300"
                    style={{
                      borderColor: siteConfig.accentColor,
                      backgroundColor: siteConfig.accentColor,
                    }}
                  />

                  {/* Connecting line below card */}
                  {index < siteConfig.experience.length - 1 && (
                    <div className="absolute left-1/2 bottom-0 w-0.5 h-12 bg-gray-300 -translate-x-1/2 translate-y-full z-10" />
                  )}

                  {/* Experience card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 hover:shadow-md transition-shadow duration-300 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                          {exp.title}
                        </h3>
                        <p
                          className="text-base sm:text-lg"
                          style={{ color: siteConfig.accentColor }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
                        {exp.dateRange}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.bullets.map((bullet: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0" />
                          <span className="text-sm sm:text-base text-gray-600">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Attachments */}
                    {exp.attachments && exp.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                        {exp.attachments.map(
                          (attachment: any, aIndex: number) => (
                            <button
                              key={attachment.name}
                              onClick={() =>
                                handleOpen(exp.attachments!, aIndex)
                              }
                              className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-900 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-gray-700 cursor-pointer"
                            >
                              {"View " + attachment.name}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal
          open={modalOpen}
          items={attachments}
          currentIndex={currentIndex}
          onClose={() => setModalOpen(false)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

    </section>
  );
};
