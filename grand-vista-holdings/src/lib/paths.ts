/** Prefix a root path with the Vite base so GitHub Pages project sites resolve. */
export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
