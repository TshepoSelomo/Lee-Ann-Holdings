import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const websitesRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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

const contentTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function serveDivisionSites(): Plugin {
  return {
    name: "serve-division-sites",
    writeBundle(options) {
      if (!options.dir) return;
      const destRoot = options.dir;
      const sharedDir = path.resolve(destRoot, "shared");
      fs.mkdirSync(sharedDir, { recursive: true });
      fs.copyFileSync(
        path.resolve(websitesRoot, "shared", "talkto.js"),
        path.join(sharedDir, "talkto.js"),
      );
      for (const site of divisionSites) {
        fs.cpSync(path.resolve(websitesRoot, site), path.resolve(destRoot, site), {
          recursive: true,
        });
      }
      const index = path.resolve(destRoot, "index.html");
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.resolve(destRoot, "404.html"));
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = decodeURIComponent((req.url ?? "/").split("?")[0]);

        if (pathname === "/shared/talkto.js") {
          const file = path.resolve(websitesRoot, "shared", "talkto.js");
          fs.readFile(file, (error, data) => {
            if (error) {
              next();
              return;
            }
            res.setHeader("Content-Type", "text/javascript; charset=utf-8");
            res.end(data);
          });
          return;
        }

        if (
          pathname === "/grand-vista-holdings" ||
          pathname === "/grand-vista-holdings/" ||
          pathname === "/grand-vista-holdings/index.html"
        ) {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
          return;
        }

        const site = divisionSites.find(
          (name) => pathname === `/${name}` || pathname.startsWith(`/${name}/`),
        );
        if (!site) {
          next();
          return;
        }

        let relativePath = pathname.slice(site.length + 1).replace(/^\/+/, "");
        if (relativePath === "" || relativePath.endsWith("/")) {
          relativePath += "index.html";
        }

        const root = path.resolve(websitesRoot, site);
        const file = path.resolve(root, relativePath);
        const fromRoot = path.relative(root, file);
        if (fromRoot.startsWith("..") || path.isAbsolute(fromRoot)) {
          res.statusCode = 403;
          res.end();
          return;
        }

        fs.readFile(file, (error, data) => {
          if (error) {
            next();
            return;
          }
          res.setHeader(
            "Content-Type",
            contentTypes[path.extname(file).toLowerCase()] ?? "application/octet-stream",
          );
          res.end(data);
        });
      });
    },
  };
}

export default defineConfig({
  base: pagesBase(),
  plugins: [serveDivisionSites(), react(), tailwindcss()],
  server: {
    port: 5173,
    fs: {
      allow: [websitesRoot],
    },
  },
});
