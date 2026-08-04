import { useEffect, useState } from "react";

export type SectionTheme = "greige" | "ink" | "blood";

/** Scrollspy: reports the theme of the section currently under the overlay. */
export function useSectionTheme(): SectionTheme {
  const [theme, setTheme] = useState<SectionTheme>("ink");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-theme]"),
    );
    if (nodes.length === 0) return;

    const pick = () => {
      // Probe just under the fixed nav, so the overlay matches what sits behind it.
      const probe = 56;
      let current: SectionTheme | null = null;
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom >= probe) {
          current = node.dataset["sectionTheme"] as SectionTheme;
        }
      }
      if (current) setTheme(current);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);

  return theme;
}
