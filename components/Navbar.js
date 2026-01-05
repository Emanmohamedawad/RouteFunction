"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

import routes from "../data/routes.json";
// import globe from "../public/globe.svg";

export default function Navbar() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { locale, locales, asPath } = router;

  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef(null);


    // Build a route from a pattern like '/about/:iduser/info/:idevent'
  // params can be an object with keys matching placeholders.
  const buildRoute = (pattern, params = {}) => {
    if (!pattern) return "/";
    const parts = pattern.split("/").filter(Boolean);

    const firstPlaceholderIndex = parts.findIndex((p) => p.startsWith(":"));

    const providedKeys = Object.keys(params).filter(
      (k) => params[k] !== undefined && params[k] !== null && params[k] !== ""
    );

    const providedIndices = parts
      .map((p, i) => (p.startsWith(":") && providedKeys.includes(p.slice(1)) ? i : -1))
      .filter((i) => i >= 0);

    // If no placeholders provided, return base prefix before first placeholder
    if (providedIndices.length === 0) {
      if (firstPlaceholderIndex === -1) return "/" + parts.join("/");
      const baseParts = parts.slice(0, firstPlaceholderIndex);
      return baseParts.length === 0 ? "/" : "/" + baseParts.join("/");
    }

    // Otherwise build path including literals that are relevant to provided placeholders
    const built = [];
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith(":")) {
        const key = part.slice(1);
        if (providedKeys.includes(key)) {
          built.push(encodeURIComponent(String(params[key])));
        }
      } else {
        // literal segment: include if it's before first placeholder (always),
        // or if there's any provided placeholder after it (so it belongs to a provided subpath),
        // or if there's any provided placeholder before it (so it's after a provided value)
        const hasProvidedAfter = providedIndices.some((idx) => idx > i);
        const hasProvidedBefore = providedIndices.some((idx) => idx < i);
        if (i < firstPlaceholderIndex || hasProvidedAfter || hasProvidedBefore) {
          built.push(part);
        }
      }
    }

    const path = "/" + built.join("/");
    return path === "" ? "/" : path;
  };

  const navLinks = [
    { key: "home", pattern: routes.home, label: t("home") || "Home" },
    {
      key: "investorRelations",
      pattern: routes.investorRelations,
      // Provide default params so the link resolves to the full path.
      // Replace these with real IDs or remove to use router.query values.
      params: { investorId: "1", section: "overview" },
      label: t("InvestorRelations") || "InvestorRelations",
    },
    { key: "about", pattern: routes.about, label: t("about") || "About" },

  ];

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const handleRoute = () => {
      setLangOpen(false);
      setMobileOpen(false);
    };
    router.events?.on?.("routeChangeStart", handleRoute);
    return () => router.events?.off?.("routeChangeStart", handleRoute);
  }, [router.events]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    if (typeof window !== "undefined") onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLocaleChange = (lng) => {
    setLangOpen(false);
    router.push(asPath, asPath, { locale: lng });
  };

  const navBgClass = scrolled
    ? "bg-[var(--backwhight)] shadow-md"
    : "bg-transparent";
  const textColorClass = scrolled ? "text-[var(--secondary)]" : "text-white";
  const baseColor = scrolled ? "text-[var(--secondary)]" : "text-white";
  const hoverColor = scrolled
    ? "hover:text-[var(--secondary)]"
    : "hover:text-white";
  const inactiveColor = scrolled
    ? "text-[var(--secondary)]/70"
    : "text-white/60";

  // buttons and icons
  const buttonBorder = scrolled ? "border-[var(--secondary)]" : "border-white";
  const buttonText = scrolled ? "text-[var(--secondary)]" : "text-white";
  const buttonHover = scrolled
    ? "hover:bg-[var(--secondary)]/10"
    : "hover:bg-white/10";

  const iconColorClass = scrolled ? "text-white" : "text-white/90";
  // const logoSrc = scrolled ? logoColor : logo;

  const isActive = (path) => {
    try {
      return (
        router.pathname === path ||
        router.asPath === path ||
        router.asPath.startsWith(path)
      );
    } catch (e) {
      return false;
    }
  };



  const NavItem = ({ href, label }) => {
    const active = isActive(href);
    return (
      <li>
        <Link href={href} className="group text-[16px]">
          <span
            className={`
      relative inline-block pb-1 transition-colors duration-300
      ${active ? baseColor : inactiveColor}
      ${!active && hoverColor}
    `}
            aria-current={active ? "page" : undefined}
          >
            <span className="relative z-10 px-[8px] py-[10px] inline-block">
              {label}
            </span>
          </span>
        </Link>
      </li>
    );
  };

  return (
    <nav
      // data-aos="fade-down"
      className={`fixed top-0 left-0 right-0 z-[10000] h-[86px] ${navBgClass} transition-colors duration-300`}
      style={{ borderBottom: "none" }}
    >
      <div className="px-4 lg:px-20 h-[103px] flex items-center">
        <div className="h-16 flex items-center justify-between w-full">
          {/* Logo */}


          {/* Center Nav */}
          <div className="hidden min-[1000px]:flex flex-1 justify-center ">
            <ul className="flex text-[16px] font-[600] items-center gap-2">
              {navLinks.map((n) => {
                // Merge params: explicit item params (if any) override router.query.
                const mergedParams = { ...(router.query || {}), ...(n.params || {}) };
                const href = buildRoute(n.pattern, mergedParams);
                return <NavItem key={n.key} href={href} label={n.label} />;
              })}
            </ul>
          </div>

        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          className={`bg-[var(--bgBlue)] absolute inset-x-0 top-0 p-4 origin-top animate-open-menu z-50 min-[1000px]:hidden transition-colors duration-200 top-[-14px] relative min-[1000px]:static`}
        >
          <div className="px-6 pb-6 pt-3 space-y-3">
            {navLinks.map((n) => {
              const mergedParams = { ...(router.query || {}), ...(n.params || {}) };
              const href = buildRoute(n.pattern, mergedParams);
              const active = isActive(href);
              return (
                <Link
                  key={n.key}
                  href={href}
                  className={`block py-2 text-sm font-[600] transition-colors duration-200 ${
                    !active
                      ? "text-white/60 font-semibold"
                      : "text-white/90 hover:text-white focus-visible:text-white"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}

          </div>
        </div>
      )}
    </nav>
  );
}
