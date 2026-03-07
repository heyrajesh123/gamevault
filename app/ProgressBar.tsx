"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const bar = document.getElementById("top-progress-bar");
    if (!bar) return;
    bar.style.width = "0%";
    bar.style.opacity = "1";
    bar.style.transition = "none";

    setTimeout(() => {
      bar.style.transition = "width 0.3s ease";
      bar.style.width = "70%";
    }, 10);

    setTimeout(() => {
      bar.style.width = "100%";
      setTimeout(() => {
        bar.style.opacity = "0";
        bar.style.width = "0%";
      }, 300);
    }, 500);
  }, [pathname, searchParams]);

  return (
    <div
      id="top-progress-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: "0%",
        background: "linear-gradient(to right, #ff1744, #ff6b6b)",
        zIndex: 9999,
        opacity: 0,
        boxShadow: "0 0 8px #ff1744",
        borderRadius: "0 2px 2px 0",
      }}
    />
  );
}
