import { useState, type FormEvent } from "react";
import { divisions } from "../data/divisions";

export function Contact() {
  const [sent, setSent] = useState<{ wa: string; mailto: string; opened: boolean } | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const division = String(data.get("division") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Website enquiry${division ? ` — ${division}` : ""}${name ? ` from ${name}` : ""}`;
    const text = `Name: ${name}\nCompany: ${company}\nDivision: ${division}\n\n${message}`;
    const wa = `https://wa.me/27660023685?text=${encodeURIComponent(text)}`;
    const mailto = `mailto:tsheposelomob@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    const opened = window.open(wa, "_blank", "noopener,noreferrer");
    setSent({ wa, mailto, opened: Boolean(opened) });
  }

  return (
    <div>
      <section className="bg-navy-deep text-primary-foreground">
        <div className="container-page hero-pad">
          <div className="eyebrow text-primary-foreground/70">Contact</div>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
            Let's talk about your project.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-primary-foreground/80 md:text-base">
            Send your requirements and we'll route you to the right division — or reach a division
            directly below.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-8 section-pad md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-8">
          <div>
            <div className="eyebrow">Contact details</div>
            <div className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-3">
              <div className="bg-card p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Phone
                </div>
                <a className="mt-2 block text-sm font-medium" href="tel:+27660023685">
                  066 002 3685
                </a>
                <div className="mt-1 text-xs text-muted-foreground">WhatsApp on the same number</div>
              </div>
              <div className="bg-card p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Email
                </div>
                <a className="mt-2 block break-all text-sm font-medium" href="mailto:tsheposelomob@gmail.com">
                  tsheposelomob@gmail.com
                </a>
              </div>
              <div className="bg-card p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Office
                </div>
                <div className="mt-2 text-sm font-medium">45 Bahamas, Cosmo City, Roodepoort</div>
              </div>
            </div>
          </div>

          <div>
            <div className="eyebrow">Reach a division directly</div>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {divisions.map((division) => (
                <a
                  key={division.slug}
                  href={division.site}
                  className="group flex items-center justify-between py-4 transition-colors hover:bg-muted/50"
                >
                  <span className="font-display text-base font-bold">{division.name}</span>
                  <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow">Business hours</div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Monday to Friday, 08:00 – 17:00. For urgent site or maintenance matters, call us and
              we'll get a technician out.
            </p>
          </div>
        </div>

        <div className="border border-border bg-card p-5">
          <div className="font-display text-lg font-bold">Send an enquiry</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill in the form below. It opens WhatsApp with your message ready to send, and you can also open it in email.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Name
                </span>
                <input
                  name="name"
                  required
                  className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm outline-hidden focus:border-accent"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Company
                </span>
                <input
                  name="company"
                  className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm outline-hidden focus:border-accent"
                  placeholder="Optional"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Division
              </span>
              <select
                name="division"
                className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm outline-hidden focus:border-accent"
                defaultValue=""
              >
                <option value="">Not sure yet</option>
                {divisions.map((division) => (
                  <option key={division.slug}>{division.name}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Your requirements
              </span>
              <textarea
                name="message"
                required
                rows={6}
                className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm outline-hidden focus:border-accent"
                placeholder="Tell us what you need — timelines, location, scope."
              />
            </label>
            <button
              type="submit"
              className="w-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary"
            >
              Send enquiry
            </button>
            {sent ? (
              <p className="text-sm text-muted-foreground">
                {sent.opened
                  ? "WhatsApp should open with your message. If it does not, "
                  : "Your browser blocked the new tab. "}
                <a className="font-semibold underline" href={sent.wa} target="_blank" rel="noopener noreferrer">
                  send it on WhatsApp
                </a>{" "}
                or{" "}
                <a className="font-semibold underline" href={sent.mailto}>
                  open it in email
                </a>
                .
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
