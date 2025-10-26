"use client";

import { useState } from "react";
import { siteConfig } from "../config";
import Modal from "./Modal";

export default function Education() {
  const hasEducation = siteConfig.education && siteConfig.education.length > 0;
  const accentColor = siteConfig.accentColor;

  const [modalOpen, setModalOpen] = useState(false);
  const [attachments, setAttachments] = useState<{ name: string; file: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!hasEducation) return null;

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

  return (
    <section id="education" className="p-8 sm:p-12 md:p-16 lg:p-24">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Header */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold text-gray-900">
              Education
            </h2>
            <div
              className="w-[75px] h-[5px] mt-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </div>

          {/* Education List */}
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {siteConfig.education.map((edu) => (
                <div
                  key={edu.degree}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 hover:shadow-md transition-shadow duration-300 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-base sm:text-lg" style={{ color: accentColor }}>
                        {edu.school}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
                      {edu.dateRange}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {edu.achievements.map((achievement: string) => (
                      <li key={achievement} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-600">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {edu.attachments && edu.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                      {edu.attachments.map((attachment: any, index: number) => (
                        <button
                          key={attachment.name}
                          onClick={() => handleOpen(edu.attachments!, index)}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-900 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-gray-700 cursor-pointer"
                        >
                          {"View " + attachment.name}
                        </button>
                      ))}
                    </div>
                  )}
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
}
