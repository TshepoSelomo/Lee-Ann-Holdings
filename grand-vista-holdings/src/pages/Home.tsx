import { Link } from "react-router-dom";
import heroSkyline from "../assets/hero-skyline.jpg";
import { Seo } from "../components/Seo";
import { divisions } from "../data/divisions";

const reasons = [
  {
    title: "Integrated delivery",
    body: "Projects that span divisions — a build that needs procurement, HVAC and transport — are coordinated under one group team, so nothing falls between the cracks.",
  },
  {
    title: "Single accountability",
    body: "One contract structure and one point of contact. You hold one partner responsible from start to finish, across every service line.",
  },
  {
    title: "Standards, not silos",
    body: "Every division works to the same group standards for quality, safety and compliance — whether it's a gas certificate or a civil contract.",
  },
];

export function Home() {
  return (
    <div>
      <Seo
        title="Lee Ann Holdings — Five Divisions, One Standard of Excellence"
        description="Lee Ann Holdings is a diversified group in Cosmo City, Roodepoort, with transportation, technology, supply and procurement, gas and aircon, and construction."
        path="/"
      />
      <section className="relative isolate overflow-hidden bg-navy-deep text-primary-foreground">
        <img
          src={heroSkyline}
          alt="City skyline at dusk"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/60 via-navy-deep/40 to-navy-deep/90" />
        <div className="container-page hero-pad">
          <div className="max-w-3xl">
            <div className="eyebrow text-primary-foreground/70">Lee Ann Holdings</div>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight md:text-5xl">
              Five divisions. One standard of excellence.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/80 md:text-base">
              Lee Ann Holdings is a diversified group delivering transportation, technology, supply
              &amp; procurement, gas &amp; aircon and construction services — with a single point of
              accountability for every project we take on.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/divisions"
                className="bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/85"
              >
                Explore our divisions
              </Link>
              <Link
                to="/contact"
                className="border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page section-pad">
        <div className="max-w-2xl">
          <div className="eyebrow">Our divisions</div>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Specialist capability, group strength</h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Each division runs as a focused business in its own right — backed by the governance,
            resources and standards of the group.
          </p>
        </div>
        <div className="mt-5 divide-y divide-border border-y border-border">
          {divisions.map((division) => (
            <a
              key={division.number}
              href={division.site}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-3 transition-colors hover:bg-muted/50 sm:gap-6 md:py-3.5"
            >
              <div className="w-10 shrink-0 font-display text-sm font-bold text-accent md:w-14 md:text-base">
                {division.number}
              </div>
              <div className="min-w-0">
                <div className="font-display text-xl font-bold md:text-2xl">{division.name}</div>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {division.blurb}
                </p>
              </div>
              <div className="shrink-0 text-lg text-muted-foreground transition-transform group-hover:translate-x-1">
                →
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-navy-deep text-primary-foreground">
        <div className="container-page section-pad">
          <div className="max-w-2xl">
            <div className="eyebrow text-primary-foreground/70">Why Lee Ann</div>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">One group, one accountable partner</h2>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {reasons.map((reason) => (
              <div key={reason.title}>
                <div className="font-display text-2xl font-bold">{reason.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75 md:text-base">
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-pad text-center">
        <h2 className="mx-auto max-w-2xl text-2xl font-bold md:text-3xl">Have a project in mind?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
          Talk to the right division directly, or send us your requirements and we'll put the right
          team on it.
        </p>
        <Link
          to="/contact"
          className="mt-5 inline-flex bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary"
        >
          Contact Lee Ann Holdings
        </Link>
      </section>
    </div>
  );
}
