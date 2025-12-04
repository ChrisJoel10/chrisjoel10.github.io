import React, { useState, useMemo } from "react";
import LiveProjectStatus from "./LiveProjectStatus";

interface Project {
    name: string;
    description: string;
    github?: string;
    liveLink?: string;
    healthCheckUrl?: string;
    status?: string;
    skills?: string[];
    featured?: boolean;
}

interface ProjectListProps {
    projects: Project[];
    accentColor: string;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, accentColor }) => {
    const [activeFilter, setActiveFilter] = useState("All");

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projects.forEach((project) => {
            project.skills?.forEach((skill) => tags.add(skill));
        });
        return ["All", "Featured", "Live Demo", ...Array.from(tags)];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") return projects;
        if (activeFilter === "Featured") return projects.filter((p) => p.featured);
        if (activeFilter === "Live Demo") return projects.filter((p) => p.liveLink);
        return projects.filter((p) => p.skills?.includes(activeFilter));
    }, [projects, activeFilter]);

    return (
        <div className="space-y-8">
            {/* Sticky Filter Chips */}
            <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-8 sm:px-8 border-b border-gray-100 transition-all duration-300">
                <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveFilter(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeFilter === tag
                                    ? "text-white shadow-lg scale-105"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
                                }`}
                            style={{
                                backgroundColor: activeFilter === tag ? accentColor : undefined,
                            }}
                        >
                            {tag === "Featured" && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                    style={{ color: activeFilter === tag ? "white" : accentColor }}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                            {tag === "Live Demo" && (
                                <span className="relative flex h-2 w-2 mr-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                            )}
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 gap-8">
                {filteredProjects.map((project, index) => (
                    <div
                        key={project.name}
                        className="group relative p-4 sm:p-6 md:p-8 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-gray-300 hover:-translate-y-1"
                    >
                        <div className="space-y-4">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span
                                            className="text-sm font-mono"
                                            style={{ color: accentColor }}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        {project.status && (
                                            <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                                                {project.status}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        {project.name}
                                    </h3>
                                </div>

                                <div className="flex gap-3">
                                    {project.liveLink && (
                                        <LiveProjectStatus
                                            liveLink={project.liveLink}
                                            healthCheckUrl={project.healthCheckUrl}
                                            accentColor={accentColor}
                                            projectName={project.name}
                                        />
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-gray-900 rounded-full text-white transition-all duration-300 hover:bg-gray-700 hover:scale-110"
                                            aria-label={`View ${project.name} source code on GitHub`}
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                {project.description}
                            </p>

                            {project.skills && project.skills.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                                    {project.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-900 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-gray-800"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
