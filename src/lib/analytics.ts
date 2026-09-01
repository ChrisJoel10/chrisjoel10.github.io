// Thin wrapper around Google Analytics (gtag.js).
//
// gtag itself is the low-level API — a generic command queue with no typed,
// ergonomic layer on top. These helpers give us a single, guarded place to
// fire events so callers don't repeat the `window.gtag` existence check.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, unknown>;

/**
 * Send a GA4 event. No-ops safely during SSR or when GA is blocked/not loaded.
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

// camelCase -> snake_case, e.g. "linkUrl" -> "link_url"
function toSnakeCase(value: string): string {
  return value.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

/**
 * Delegated click tracking for static (Astro-rendered) markup.
 *
 * Any element carrying `data-track="<event_name>"` fires that event on click.
 * Additional `data-track-*` attributes become event params:
 *   <a data-track="social_click" data-track-label="github" data-track-location="footer">
 * sends: trackEvent("social_click", { label: "github", location: "footer" })
 */
export function initClickTracking(): void {
  if (typeof document === "undefined") return;

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const el = target?.closest<HTMLElement>("[data-track]");
    if (!el) return;

    const name = el.dataset.track;
    if (!name) return;

    const params: EventParams = {};
    for (const [key, value] of Object.entries(el.dataset)) {
      if (key === "track" || !key.startsWith("track")) continue;
      // "trackLabel" -> "label", "trackLinkUrl" -> "link_url"
      const paramKey = toSnakeCase(key.slice("track".length)).replace(/^_/, "");
      params[paramKey] = value;
    }

    trackEvent(name, params);
  });
}

export {};
