import { Link } from "react-router-dom";
import type { Division } from "../data/divisions";

export function DivisionPage({ division }: { division: Division }) {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-navy-deep text-primary-foreground">
        <img
          src={division.image}
          alt={division.imageAlt}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
          loading="lazy"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-navy-deep/30" />
        <div className="container-page hero-pad">
          <div className="eyebrow text-primary-foreground/70">Division {division.number}</div>
          <h1 className="mt-2 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            {division.name}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-primary-foreground/80 md:text-base">
            {division.tagline}
          </p>
        </div>
      </section>

      <section className="container-page grid gap-6 section-pad md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          {division.intro.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="border-l-2 border-accent bg-card p-6">
          <div className="font-display text-lg font-bold">Work with this division</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us about your project or requirements and the right team will come back to you.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary"
          >
            Request a quote
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="container-page section-pad">
          <div className="eyebrow">What we do</div>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Services &amp; capabilities</h2>
          <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {division.services.map((service) => (
              <a
                key={service.title}
                href={division.site.replace(/index\.html$/, "services.html")}
                className="bg-card p-4 transition-colors hover:bg-muted/60"
              >
                <div className="font-display text-base font-bold leading-snug">{service.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
