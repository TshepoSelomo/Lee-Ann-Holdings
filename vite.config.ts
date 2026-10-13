import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function pagesBase() {
  const repo = process.env.GITHUB_REPOSITORY_NAME ?? "";
  if (!repo || repo.endsWith(".github.io")) return "/";
  return `/${repo}/`;
}

const divisionSites = [
  "lee-ann-transportation",
  "lee-ann-tech",
  "lee-ann-supply-procurement",
  "lee-ann-gas-aircon",
  "lee-ann-construction",
  "lee-ann-shop",
];

function rewriteDivisionIndex(url: string | undefined) {
  const [pathname, query] = (url ?? "/").split("?");
  const decoded = decodeURIComponent(pathname);
  const site = divisionSites.find((name) => decoded === `/${name}` || decoded === `/${name}/`);
  if (!site) return url;
  return `/${site}/index.html${query ? `?${query}` : ""}`;
}

/** GitHub Pages has no SPA fallback, so unknown routes use a copy of the app shell. */
function githubPagesFallback(): Plugin {
  return {
    name: "github-pages-fallback",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        req.url = rewriteDivisionIndex(req.url);
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        req.url = rewriteDivisionIndex(req.url);
        next();
      });
    },
    writeBundle(options) {
      if (!options.dir) return;
      const index = path.resolve(options.dir, "index.html");
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.resolve(options.dir, "404.html"));
      }
    },
  };
}

export default defineConfig({
  base: pagesBase(),
  plugins: [githubPagesFallback(), react(), tailwindcss()],
  server: {
    port: 5173,
  },
});
