import type { ReactNode } from "react";
import type { SectionTheme } from "./useSectionTheme";

const THEME_CLASS: Record<SectionTheme, string> = {
  greige: "theme-greige",
  ink: "theme-ink",
  blood: "theme-blood",
};

export function Section({
  theme = "greige",
  id,
  className = "",
  children,
}: {
  theme?: SectionTheme;
  id?: string | undefined;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-section-theme={theme}
      className={`relative overflow-hidden ${THEME_CLASS[theme]} ${className}`}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow opacity-70">{children}</p>;
}

export function Numeral({ children }: { children: ReactNode }) {
  return (
    <span className="display block text-[clamp(4rem,10vw,9rem)] leading-none opacity-25">
      {children}
    </span>
  );
}
