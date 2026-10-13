import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { divisions } from "../data/divisions";

const listingBlurbs: Record<string, string> = {
  transportation:
    "Road freight, fleet management and logistics that keep goods moving — on schedule, every time.",
  technology:
    "IT infrastructure, software and connectivity solutions that modernise how your business operates.",
  "supply-procurement":
    "Strategic sourcing, supplier management, warehousing and distribution — the right goods at the right price.",
  "gas-aircon":
    "HVAC and gas installations, servicing, refrigeration and compliance certification for homes and businesses.",
  construction:
    "Residential, commercial and civil construction delivered with quality, safety and cost certainty.",
};

export function Divisions() {
  return (
    <div>
      <Seo
        title="Divisions — Lee Ann Holdings"
        description="Five specialist divisions of Lee Ann Holdings: transportation, technology, supply and procurement, gas and aircon, and construction."
        path="/divisions"
      />
      <section className="bg-navy-deep text-primary-foreground">
        <div className="container-page hero-pad">
          <div className="eyebrow text-primary-foreground/70">Our divisions</div>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
            Five specialist businesses. One accountable group.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-primary-foreground/80 md:text-base">
            Each division runs as a focused business in its own right — backed by the governance,
            resources and standards of Lee Ann Holdings.
          </p>
        </div>
      </section>

      <section className="container-page section-pad">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {divisions.map((division) => (
            <a
              key={division.slug}
              href={division.site}
              className={`group flex min-w-0 flex-col overflow-hidden border border-border bg-card transition-colors hover:border-accent${
                division.slug === "construction" ? " sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={division.image}
                  alt={division.name}
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="font-display text-lg font-bold">{division.name}</div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {listingBlurbs[division.slug] ?? division.blurb}
                </p>
                <div className="mt-4 text-sm font-semibold text-accent">View division →</div>
              </div>
            </a>
          ))}
          <div className="flex min-w-0 flex-col justify-center bg-navy-deep p-5 text-primary-foreground">
            <div className="font-display text-lg font-bold">Not sure which division you need?</div>
            <p className="mt-2 text-sm text-primary-foreground/75">
              Send us your requirements and we'll route you to the right team.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex w-fit bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/85"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
