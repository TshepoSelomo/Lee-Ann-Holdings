import { useEffect } from "react";

const ORIGIN = "https://tsheposelomo.github.io/Lee-Ann-Holdings";

function upsertMeta(name: string, content: string, attribute: "name" | "property") {
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

export function Seo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  useEffect(() => {
    const url = `${ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
    document.title = title;
    upsertMeta("description", description, "name");
    upsertMeta("robots", "index, follow", "name");
    upsertMeta("og:site_name", "Lee Ann Holdings", "property");
    upsertMeta("og:type", "website", "property");
    upsertMeta("og:locale", "en_ZA", "property");
    upsertMeta("og:title", title, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:url", url, "property");
    upsertMeta("og:image", `${ORIGIN}/og.jpg`, "property");
    upsertMeta("twitter:card", "summary_large_image", "name");
    upsertMeta("twitter:title", title, "name");
    upsertMeta("twitter:description", description, "name");
    upsertMeta("twitter:image", `${ORIGIN}/og.jpg`, "name");
    upsertLink("canonical", url);
  }, [title, description, path]);

  return null;
}
