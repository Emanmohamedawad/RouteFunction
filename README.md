My Function logic 

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
