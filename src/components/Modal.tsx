import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  items: { file: string; name: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Modal({
  open,
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ModalProps) {
  const currentItem = items[currentIndex];

  // Keyboard navigation (Escape, Left, Right)
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, onNext, onPrev]);
  
  useEffect(() => {
    if (open) {
      // Lock scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);


  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-hidden">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-5xl font-bold hover:text-gray-300 z-50"
      >
        ×
      </button>

      {/* Left Arrow */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-gray-300 z-50"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-gray-300 z-50"
      >
        ›
      </button>

      {/* Image / PDF Display */}
      <div className="relative max-w-4xl w-full mx-4 flex justify-center items-center">
        {currentItem.file.endsWith(".pdf") ? (
          <iframe
            src={`${currentItem.file}#toolbar=0&navpanes=0&scrollbar=0`}
            title={currentItem.name}
            className="rounded-xl w-full h-[80vh] border-0"
          />
        ) : (
          <img
            src={currentItem.file}
            alt={currentItem.name}
            className="rounded-xl max-h-[80vh] object-contain"
          />
        )}
      </div>

      {/* Caption */}
      <p className="text-white text-center mt-4 text-lg absolute bottom-8 w-full">
        {currentItem.name}
      </p>
    </div>
  );
}
