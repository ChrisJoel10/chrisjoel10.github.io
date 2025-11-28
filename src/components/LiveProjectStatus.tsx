import React, { useState } from "react";

interface LiveProjectStatusProps {
    liveLink: string;
    healthCheckUrl?: string;
    accentColor: string;
    projectName: string;
}

export default function LiveProjectStatus({
    liveLink,
    healthCheckUrl,
    accentColor,
    projectName,
}: LiveProjectStatusProps) {
    const [status, setStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");

    // If no health check URL, render the simple button (static)
    if (!healthCheckUrl) {
        return (
            <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-110 hover:brightness-110"
                style={{ backgroundColor: accentColor }}
                aria-label={`Visit ${projectName} live site`}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                </svg>
            </a>
        );
    }

    const handleMouseEnter = () => {
        if (status === "idle") {
            checkStatus();
        }
    };

    const checkStatus = async () => {
        setStatus("checking");
        try {
            // Wait for at least 3 seconds and fetch status
            // Use no-cors mode to avoid CORS errors since we can't control the external server headers
            // Note: This returns an opaque response, so we can't check response.ok or status code.
            // We assume if the request completes (doesn't throw network error), the service is reachable.
            const [response] = await Promise.all([
                fetch(healthCheckUrl, { mode: 'no-cors' }).catch(() => null),
                new Promise((resolve) => setTimeout(resolve, 500)),
            ]);

            // With no-cors, response.type is 'opaque' and response.ok is false.
            // So we check if response exists (fetch didn't throw/catch returned null).
            if (response) {
                setStatus("available");
            } else {
                setStatus("unavailable");
            }
        } catch (error) {
            console.error("Health check failed", error);
            setStatus("unavailable");
        }
    };

    return (
        <div className="flex items-center" onMouseEnter={handleMouseEnter}>
            {status === "idle" && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-200 text-gray-600 text-sm font-medium cursor-pointer transition-colors hover:bg-gray-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Hover to check live status
                </div>
            )}

            {status === "checking" && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-200 text-gray-600 text-sm font-medium animate-pulse">
                    <svg
                        className="animate-spin h-4 w-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Checking Status...
                </div>
            )}

            {status === "available" && (
                <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200 text-green-700 text-sm font-medium transition-all duration-300 hover:bg-green-100 hover:shadow-sm group"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span>Live Demo Available</span>
                    <span className="text-xs text-green-600/80 font-normal border-l border-green-200 pl-2 ml-1">
                        Verified just now
                    </span>
                    <svg
                        className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </a>
            )}

            {status === "unavailable" && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full border border-red-200 text-red-700 text-sm font-medium">
                    <svg
                        className="w-4 h-4 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Live Demo Unavailable
                </div>
            )}
        </div>
    );
}
