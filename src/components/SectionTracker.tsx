// File: src/components/SectionTracker.tsx
import { useEffect } from "react";

interface SectionTrackerProps {
  sectionIds?: string[];
}

export default function SectionTracker({
  sectionIds = ["about", "experience", "education", "projects", "certificates", "techStack"],
}: SectionTrackerProps) {
  useEffect(() => {
    const navLinks = sectionIds.map(
      (id) => document.querySelector<HTMLAnchorElement>(`header nav a[href="#${id}"]`)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;

            // Remove "active" from all links
            navLinks.forEach((link) => link?.classList.remove("active"));

            // Add "active" to current link
            const activeLink = document.querySelector<HTMLAnchorElement>(
              `header nav a[href="#${id}"]`
            );
            activeLink?.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [sectionIds]);

  return null;
}
