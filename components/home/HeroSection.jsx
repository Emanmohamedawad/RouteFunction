"use client";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "next-i18next";
import HeroPosterSSR from "./HeroPoster.server";

export default function Hero() {
  const { t, i18n } = useTranslation("common");
  const language = i18n?.language || "en";
  const dir = language === "ar" ? "rtl" : "ltr";
  const textAlignClass = language === "ar" ? "text-right" : "text-left";
  const visibleClasses = "opacity-100 translate-y-0 pointer-events-auto";

  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onCanPlay = () => {
      setTimeout(() => setShowVideo(true), 100);
    };

    v.addEventListener("canplay", onCanPlay);
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <section
      className="relative min-h-[100vh] flex items-center"
      dir={dir}
    >
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(270deg, rgba(217, 217, 217, 0) 0%, rgba(0, 0, 0, 0.90) 100%)",
        }}
      />
      <HeroPosterSSR />


      <div className="container">
        <div className="w-full min-h-[100vh] items-end flex justify-start">
          <div className="max-w-[866px] mb-[195px]">
            <h1
              className={[
                "font-extrabold tracking-tight leading-[1.2]",
                "text-[clamp(2.2rem,6.6vw,68.238px)]",
                "motion-safe:transition-opacity motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out",
                visibleClasses,
                textAlignClass,
              ].join(" ")}
              aria-hidden={false}
            >
              <span className="inline-block text-white">
                Test Route
              </span>
            </h1>

          </div>
        </div>
      </div>

    </section>
  );
}
