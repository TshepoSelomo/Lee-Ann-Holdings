import { Link, useSearchParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { divisions } from "../data/divisions";
import { withBase } from "../lib/paths";

export function Catalogue() {
  const [params, setParams] = useSearchParams();
  const active = params.get("division") ?? "all";
  const visible = active === "all" ? divisions : divisions.filter((division) => division.slug === active);

  function selectDivision(slug: string) {
    if (slug === "all") {
      setParams({});
      return;
    }
    setParams({ division: slug });
  }

  return (
    <div>
      <Seo
        title="Catalogue — Lee Ann Holdings"
        description="Browse the services of Lee Ann Holdings: transportation, technology, supply and procurement, gas and aircon, and construction."
        path="/catalogue"
      />
      <section className="bg-navy-deep text-primary-foreground">
        <div className="container-page hero-pad">
          <div className="eyebrow text-primary-foreground/70">Catalogue</div>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
            Every service the group offers.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-primary-foreground/80 md:text-base">
            The same services as the five divisions. Prices are not shown yet — send a request and
            the right team confirms the scope.
          </p>
        </div>
      </section>

      <section className="container-page section-pad">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => selectDivision("all")}
            className={active === "all" ? "bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" : "border border-border px-4 py-2 text-sm font-semibold"}
          >
            All
          </button>
          {divisions.map((division) => (
            <button
              key={division.slug}
              type="button"
              onClick={() => selectDivision(division.slug)}
              className={
                active === division.slug
                  ? "bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  : "border border-border px-4 py-2 text-sm font-semibold"
              }
            >
              {division.name}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-8">
          {visible.map((division) => (
            <div key={division.slug}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="eyebrow">{division.number}</div>
                  <h2 className="mt-1 text-2xl font-bold">{division.name}</h2>
                </div>
                <Link to={division.to} className="text-sm font-semibold text-accent">
                  View division →
                </Link>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {division.services.map((service) => (
                  <article key={service.id} className="flex flex-col border border-border bg-card">
                    <img
                      src={withBase(`/shared/assets/services/${service.id}.jpg`)}
                      alt=""
                      width={800}
                      height={500}
                      className="aspect-[16/10] w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-display text-lg font-bold leading-snug">{service.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                      <Link
                        to={`/contact?division=${division.slug}&service=${encodeURIComponent(service.title)}`}
                        className="mt-4 inline-flex w-fit bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary"
                      >
                        Request this
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
