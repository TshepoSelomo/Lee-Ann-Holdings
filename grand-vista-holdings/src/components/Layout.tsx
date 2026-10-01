import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { divisions } from "../data/divisions";
import { withBase } from "../lib/paths";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/divisions", label: "Divisions" },
  { to: "/contact", label: "Contact" },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-2.5 sm:flex sm:flex-wrap sm:justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
            <img src={withBase("/logo.svg")} alt="" className="h-10 w-10 shrink-0" width="40" height="40" />
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-lg font-bold">Lee Ann Holdings</div>
              <div className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                Five Divisions · One Group
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  isActive ? "nav-link font-semibold text-foreground" : "nav-link"
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a href={withBase("/lee-ann-shop/index.html")} className="nav-link">
              Catalogue
            </a>
            <Link
              to="/contact"
              className="bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary"
            >
              Get in touch
            </Link>
          </nav>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="grid h-10 w-10 shrink-0 place-items-center border border-border md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="text-xl leading-none">{menuOpen ? "×" : "≡"}</span>
          </button>
        </div>
        {menuOpen ? (
          <nav className="border-t border-border px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className="nav-link py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href={withBase("/lee-ann-shop/index.html")}
                className="nav-link py-1"
                onClick={() => setMenuOpen(false)}
              >
                Catalogue
              </a>
              <Link
                to="/contact"
                className="mt-2 inline-flex w-fit bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Get in touch
              </Link>
            </div>
          </nav>
        ) : null}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="container-page grid gap-6 py-8 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="font-display text-xl font-bold">Lee Ann Holdings</div>
            <p className="mt-3 max-w-sm text-sm text-primary-foreground/70">
              A diversified holdings group delivering transportation, technology, supply &amp;
              procurement, gas &amp; aircon and construction services under one accountable roof.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
              Divisions
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {divisions.map((division) => (
                <li key={division.slug}>
                  <a href={division.site} className="hover:underline">
                    {division.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
              Company
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:underline">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/divisions" className="hover:underline">
                  Our divisions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <a href={withBase("/lee-ann-shop/index.html")} className="hover:underline">
                  Catalogue
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/15">
          <div className="container-page flex flex-wrap items-center justify-between gap-2 py-3 text-xs text-primary-foreground/60">
            <span>© {new Date().getFullYear()} Lee Ann Holdings. All rights reserved.</span>
            <span>
              Transportation · Technology · Supply &amp; Procurement · Gas &amp; Aircon · Construction
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
