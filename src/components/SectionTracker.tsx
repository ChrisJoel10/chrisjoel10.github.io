// File: src/components/SectionTracker.tsx
import { useEffect } from "react";

interface SectionTrackerProps {
  sectionIds?: string[]; // IDs of sections to track
}

export default function SectionTracker({
  sectionIds = ["about", "projects", "certificates", "experience", "education"],
}: SectionTrackerProps) {
  useEffect(() => {
    // IntersectionObserver to track section views
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.gtag) {
            const id = entry.target.id;
            // console.log(`Section in view: ${id}`);
            window.gtag("event", "section_view", {
              event_category: "engagement",
              event_label: id,
            });
          }
        });
      },
      { threshold: 0.1 } // 50% visible triggers event
    );

    // Observe each section
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Cleanup on unmount
    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [sectionIds]);

  return null; // No visible UI
}
