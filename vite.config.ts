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

const legacyRoutes: Record<string, string> = {
  "lee-ann-transportation": "/divisions/transportation",
  "lee-ann-tech": "/divisions/technology",
  "lee-ann-supply-procurement": "/divisions/supply-procurement",
  "lee-ann-gas-aircon": "/divisions/gas-aircon",
  "lee-ann-construction": "/divisions/construction",
  "lee-ann-shop": "/catalogue",
};

function redirectLegacy(url: string | undefined) {
  const pathname = decodeURIComponent((url ?? "/").split("?")[0]);
  const site = Object.keys(legacyRoutes).find(
    (name) => pathname === `/${name}` || pathname.startsWith(`/${name}/`),
  );
  if (!site) return null;
  const base = pagesBase().replace(/\/$/, "");
  return `${base}${legacyRoutes[site]}`;
}

/** GitHub Pages has no SPA fallback, so unknown routes use a copy of the app shell. */
function githubPagesFallback(): Plugin {
  return {
    name: "github-pages-fallback",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const location = redirectLegacy(req.url);
        if (!location) {
          next();
          return;
        }
        res.statusCode = 302;
        res.setHeader("Location", location);
        res.end();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const location = redirectLegacy(req.url);
        if (!location) {
          next();
          return;
        }
        res.statusCode = 302;
        res.setHeader("Location", location);
        res.end();
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
