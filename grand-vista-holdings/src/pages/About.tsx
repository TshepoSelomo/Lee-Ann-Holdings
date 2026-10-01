import { Link } from "react-router-dom";
import heroSkyline from "../assets/hero-skyline.jpg";
import { divisions } from "../data/divisions";

export function About() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-navy-deep text-primary-foreground">
        <img
          src={heroSkyline}
          alt="City skyline at dusk"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-navy-deep/30" />
        <div className="container-page hero-pad">
          <div className="eyebrow text-primary-foreground/70">About us</div>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
            Built to do more than one thing — properly.
          </h1>
        </div>
      </section>

      <section className="container-page grid gap-8 section-pad md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Lee Ann Holdings is a diversified holdings group. We operate five specialist divisions —
            Transportation, Technology, Supply &amp; Procurement, Gas &amp; Aircon and Construction —
            each with its own focused team, and all held to the same group-wide standard.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            The structure is deliberate: clients get the responsiveness of a specialist business with
            the stability, resources and governance of a group behind it. When a project crosses
            division lines, one group team coordinates the delivery — one plan, one timeline, one
            accountable partner.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            We take on work we can stand behind, we price honestly, and we finish what we start.
          </p>
        </div>
        <div className="space-y-5 border-l-2 border-accent bg-card p-5">
          <div>
            <div className="eyebrow">Our approach</div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Clear scoping, honest pricing and disciplined project management on every job — large
              or small.
            </p>
          </div>
          <div>
            <div className="eyebrow">Our promise</div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Quality workmanship, safe sites, compliant installations and delivery you can plan
              around.
            </p>
          </div>
          <div>
            <div className="eyebrow">Get in touch</div>
            <Link
              to="/contact"
              className="mt-3 inline-flex bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="container-page grid gap-px bg-border py-0 sm:grid-cols-2 lg:grid-cols-5">
          {divisions.map((division) => (
            <a key={division.slug} href={division.site} className="bg-background px-5 py-5 text-center transition-colors hover:bg-card">
              <div className="font-display text-sm font-bold">{division.name}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Division
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
