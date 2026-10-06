import { useEffect, useState } from "react";
import { CookingPot, Drumstick, Home, MapPinned, Menu, UserRound, X } from "lucide-react";
import { nav } from "@/lib/site-data";
import { useScrollY } from "./hooks";

export function Loader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 1400);
    const t2 = setTimeout(() => setGone(true), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (gone) return null;
  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-coal transition-all duration-700 ${done ? "pointer-events-none opacity-0 -translate-y-6" : ""}`}
    >
      <p className="font-display text-6xl tracking-wide text-fire md:text-8xl">A1 EATS</p>
      <p className="mt-2 text-xs font-bold tracking-[0.5em] text-cream/70">DELICIOUS CHICKEN</p>
      <div className="mt-8 h-px w-48 overflow-hidden bg-border">
        <div className="loader-bar h-full bg-fire" />
      </div>
    </div>
  );
}

export function Logo() {
  return (
    <a href="#home" className="flex flex-col leading-none" aria-label="A1 EATS home">
      <span className="font-display text-2xl tracking-wide text-fire">A1 EATS</span>
      <span className="text-[9px] font-bold tracking-[0.35em] text-cream/70">DELICIOUS CHICKEN</span>
    </a>
  );
}

export function Navbar() {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const solid = y > 60;
  const navIcons = [Home, Drumstick, UserRound, CookingPot, MapPinned];
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "border-b bg-coal/85 py-3 backdrop-blur-xl" : "py-6"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-xs font-bold uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-primary">{n.label}</a>
            </li>
          ))}
        </ul>
        <a href="#menu" className="hidden rounded-full bg-fire px-5 py-2.5 text-xs font-extrabold tracking-[0.2em] text-primary-foreground shadow-glow transition-transform hover:scale-105 lg:inline-block">EXPLORE MENU</a>
        <button onClick={() => setOpen(true)} className="rounded-full border p-2.5 text-cream lg:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></button>
      </nav>
      <div className={`fixed inset-0 z-50 flex min-h-[100svh] flex-col overflow-y-auto bg-background px-5 py-5 transition-all duration-300 lg:hidden ${open ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b pb-5">
          <Logo />
          <button onClick={() => setOpen(false)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border bg-secondary text-cream transition-colors hover:border-primary hover:text-primary" aria-label="Close menu"><X className="h-5 w-5" /></button>
        </div>
        <ul className="mt-5 divide-y divide-border">
          {nav.map((n, i) => (
            <li key={n.href} style={{ transitionDelay: `${open ? i * 60 : 0}ms` }} className={`transition-all duration-500 ${open ? "opacity-100" : "opacity-0 translate-y-4"}`}>
              <a href={n.href} onClick={() => setOpen(false)} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4 text-cream transition-colors hover:text-primary">
                {(() => {
                  const NavIcon = navIcons[i] ?? Home;
                  return <NavIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden />;
                })()}
                <span className="truncate font-display text-3xl uppercase leading-none">{n.label}</span>
                <span aria-hidden className="font-display text-xl text-muted-foreground">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#menu" onClick={() => setOpen(false)} className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-fire px-5 py-3 text-center text-xs font-extrabold tracking-[0.2em] text-primary-foreground shadow-glow"><Drumstick className="h-4 w-4" aria-hidden />EXPLORE MENU</a>
      </div>
    </header>
  );
}

export function Embers({ count = 18 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="ember absolute bottom-0 h-1 w-1 rounded-full bg-ember"
          style={{ left: `${(i * 37) % 100}%`, animationDuration: `${6 + (i % 5) * 2}s`, animationDelay: `${(i * 0.7) % 8}s`, boxShadow: "0 0 8px var(--ember)" }}
        />
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-coal">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Chennai's crispy chicken cravings, served hot.</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-bold tracking-[0.3em] text-primary">EXPLORE</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-cream/80">
            {nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-primary">{n.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-primary">FIND US</p>
          <p className="mt-4 text-sm text-cream/80">Triplicane · Kolathur · Perambur</p>
          <p className="mt-1 text-sm text-muted-foreground">Chennai</p>
          <p className="mt-4 text-xs text-muted-foreground">Contact details & hours coming soon.</p>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} A1 EATS — Delicious Chicken</div>
    </footer>
  );
}
