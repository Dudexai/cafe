import { useEffect, useRef, useState, type MouseEvent } from "react";
import { MapPin, Navigation, Play, Pause, Volume2, VolumeX, X, Flame } from "lucide-react";
import hero from "@/assets/hero.jpg";
import owner from "@/assets/owner.jpg";
import frying from "@/assets/frying.jpg";
import cookingVideo from "@/assets/cooking.mp4.asset.json";
import { menu, locations, type Dish } from "@/lib/site-data";
import { useReveal, useScrollY } from "./hooks";
import { Embers } from "./Chrome";

const btnFire = "inline-flex items-center justify-center gap-2 rounded-full bg-fire px-7 py-4 text-xs font-extrabold tracking-[0.2em] text-primary-foreground shadow-glow transition-transform hover:scale-105";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-4 text-xs font-extrabold tracking-[0.2em] text-cream backdrop-blur transition-colors hover:border-primary hover:text-primary";

function Eyebrow({ children }: { children: string }) {
  return <p className="reveal flex items-center gap-3 text-xs font-bold tracking-[0.4em] text-primary"><span className="h-px w-10 bg-primary" />{children}</p>;
}

export function Hero() {
  const y = useScrollY();
  const [m, setM] = useState({ x: 0, y: 0 });
  const onMove = (e: MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    setM({ x: (e.clientX / r.width - 0.5) * 2, y: (e.clientY / r.height - 0.5) * 2 });
  };
  const p = Math.min(y / 800, 1);
  return (
    <section id="home" onMouseMove={onMove} className="grain relative h-[100svh] min-h-[640px] overflow-hidden bg-coal">
      <img
        src={hero}
        alt="Crispy spicy fried chicken and lollipops on a cast iron plate with steam rising"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: `scale(${1.08 + p * 0.25}) translate(${m.x * -12}px, ${m.y * -10 + y * 0.15}px)`, transition: "transform .3s ease-out" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: "var(--gradient-fade)" }} />
      <div aria-hidden className="absolute bottom-1/3 left-1/2 h-40 w-40 rounded-full bg-cream/40 steam" />
      <div aria-hidden className="absolute bottom-1/3 left-[60%] h-32 w-32 rounded-full bg-cream/30 steam" style={{ animationDelay: "2s" }} />
      <Embers />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-5 md:px-8" style={{ transform: `translateY(${y * -0.25}px)`, opacity: 1 - p * 1.2 }}>
        <p className="animate-fade-in text-xs font-bold tracking-[0.5em] text-primary [animation-delay:1.6s] [animation-fill-mode:both]">CHENNAI STREET-FOOD CHICKEN</p>
        <h1 className="mt-4 font-display leading-[0.85] text-cream">
          <span className="block animate-fade-in text-[22vw] [animation-delay:1.7s] [animation-duration:.9s] [animation-fill-mode:both] md:text-[11rem]">A1 EATS</span>
          <span className="block animate-fade-in text-[9vw] text-fire [animation-delay:1.9s] [animation-duration:.9s] [animation-fill-mode:both] md:text-7xl">DELICIOUS CHICKEN</span>
        </h1>
        <p className="mt-6 max-w-md animate-fade-in text-lg text-cream/85 [animation-delay:2.1s] [animation-fill-mode:both] md:text-xl">Chennai's crispy chicken cravings, served hot.</p>
        <div className="mt-10 flex animate-fade-in flex-col gap-3 [animation-delay:2.3s] [animation-fill-mode:both] sm:flex-row">
          <a href="#menu" className={btnFire}>EXPLORE OUR CHICKEN</a>
          <a href="#locations" className={btnGhost}>FIND YOUR A1 EATS</a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.4em] text-cream/60">SCROLL</div>
    </section>
  );
}

export function Intro() {
  const ref = useReveal<HTMLElement>();
  const words = ["CRISPY.", "JUICY.", "LOADED WITH FLAVOUR."];
  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow>THE CRAVING</Eyebrow>
        <h2 className="mt-8 font-display text-6xl leading-[0.9] md:text-[9rem]">
          {words.map((w, i) => (
            <span key={w} className="reveal block" style={{ transitionDelay: `${i * 150}ms` }}>
              <span className={i === 2 ? "text-fire" : "text-cream"}>{w}</span>
            </span>
          ))}
        </h2>
        <p className="reveal mt-10 max-w-lg text-xl text-muted-foreground">A chicken craving deserves more than ordinary.</p>
      </div>
      <div className="mt-24 overflow-hidden border-y py-6" aria-hidden>
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-4xl text-cream/20 md:text-6xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12">
              {["HOT", "CRISPY", "JUICY", "SPICY", "FRESH", "CRAVABLE"].map((t) => (
                <span key={t} className="flex items-center gap-12">{t}<Flame className="h-8 w-8 text-chili" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DishCard({ d, i, onOpen }: { d: Dish; i: number; onOpen: () => void }) {
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <button
      onClick={onOpen}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 10 });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className="reveal group relative w-[78vw] shrink-0 snap-center overflow-hidden rounded-2xl border bg-card text-left transition-[box-shadow] hover:shadow-glow sm:w-auto"
      style={{ transitionDelay: `${(i % 4) * 80}ms`, transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
      aria-label={`View ${d.name}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={d.image} alt={d.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/20 to-transparent" />
        <span className="absolute left-4 top-4 font-display text-5xl text-cream/25">0{i + 1}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-3xl leading-none text-cream">{d.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-[0.2em] text-primary">PRICE COMING SOON</span>
          <span className="text-[11px] font-bold tracking-[0.2em] text-cream/60 group-hover:text-cream">VIEW →</span>
        </div>
      </div>
    </button>
  );
}

function DishModal({ d, onClose }: { d: Dish; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-coal/80 p-0 backdrop-blur-md md:items-center md:p-8" onClick={onClose} role="dialog" aria-modal="true" aria-label={d.name}>
      <div className="relative grid w-full max-w-4xl animate-scale-in overflow-hidden rounded-t-2xl border bg-card md:grid-cols-2 md:rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <img src={d.image} alt={d.name} className="aspect-square h-full w-full object-cover" />
        <div className="flex flex-col p-8">
          <button onClick={onClose} className="absolute right-4 top-4 rounded-full border bg-coal/60 p-2 text-cream" aria-label="Close"><X className="h-4 w-4" /></button>
          <p className="text-xs font-bold tracking-[0.4em] text-primary">OUR CHICKEN</p>
          <h3 className="mt-3 font-display text-5xl leading-none text-cream">{d.name}</h3>
          <p className="mt-5 text-muted-foreground">{d.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {d.tags.map((t) => <span key={t} className="rounded-full border px-3 py-1 text-xs text-cream/80">{t}</span>)}
          </div>
          <p className="mt-auto pt-8 font-display text-2xl text-primary">PRICE COMING SOON</p>
          <a href="#locations" onClick={onClose} className={`${btnFire} mt-4`}>FIND YOUR A1 EATS</a>
        </div>
      </div>
    </div>
  );
}

export function MenuSection() {
  const ref = useReveal<HTMLElement>();
  const [open, setOpen] = useState<Dish | null>(null);
  return (
    <section id="menu" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow>THE MENU</Eyebrow>
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="reveal font-display text-7xl leading-none text-cream md:text-9xl">OUR CHICKEN</h2>
          <p className="reveal max-w-sm text-sm font-bold tracking-[0.25em] text-muted-foreground">CRISPY. JUICY. LOADED WITH FLAVOUR.</p>
        </div>
      </div>
      <div className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:mx-auto sm:grid sm:max-w-7xl sm:grid-cols-2 sm:overflow-visible md:px-8 lg:grid-cols-4">
        {menu.map((d, i) => <DishCard key={d.id} d={d} i={i} onOpen={() => setOpen(d)} />)}
        <div className="reveal flex w-[78vw] shrink-0 snap-center flex-col justify-end rounded-2xl border border-dashed bg-fire/10 p-6 sm:w-auto">
          <Flame className="h-10 w-10 text-primary" />
          <p className="mt-4 font-display text-3xl leading-none text-cream">TAP ANY DISH TO GET CLOSER</p>
          <p className="mt-3 text-sm text-muted-foreground">Prices coming soon. Customer reviews coming soon.</p>
        </div>
      </div>
      {open && <DishModal d={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

export function OwnerSection() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="story" ref={ref} className="grain relative overflow-hidden bg-coal py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:px-8">
        <div className="reveal relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-fire opacity-20 blur-3xl" />
          <img src={owner} alt="The owner of A1 EATS wearing a black A1 EATS Delicious Chicken cap at his Chennai street-food stall" loading="lazy" width={848} height={1264} className="relative aspect-[4/5] w-full rounded-2xl object-cover object-top" />
        </div>
        <div>
          <Eyebrow>THE MAN BEHIND THE CRAVING</Eyebrow>
          <h2 className="reveal mt-6 font-display text-6xl leading-[0.9] text-cream md:text-8xl">MADE WITH PASSION.<br /><span className="text-fire">SERVED WITH PRIDE.</span></h2>
          <p className="reveal mt-8 max-w-md text-lg text-muted-foreground">Every plate at A1 EATS comes straight from the stall to your hands — hot, crisp and made for the craving.</p>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const ref = useReveal<HTMLElement>();
  const steps = [
    { n: "01", t: "Fresh Chicken", d: "It starts with chicken, prepared by hand." },
    { n: "02", t: "Marinate & Spice", d: "Seasoned with bold masala and herbs." },
    { n: "03", t: "Into the Fire", d: "Fried hot until golden and crunchy." },
    { n: "04", t: "Served Hot", d: "Straight from the kadai to you." },
  ];
  return (
    <section id="process" ref={ref} className="relative overflow-hidden py-24 md:py-36">
      <img src={frying} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow>HOW IT'S MADE</Eyebrow>
        <h2 className="reveal mt-6 font-display text-6xl leading-none text-cream md:text-8xl">FROM FIRE <span className="text-fire">TO FLAVOUR</span></h2>
        <ol className="mt-16 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className="reveal rounded-2xl border bg-card/70 p-6 backdrop-blur" style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="font-display text-6xl text-fire">{s.n}</span>
              <h3 className="mt-4 font-display text-2xl text-cream">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function VideoSection() {
  const ref = useReveal<HTMLElement>();
  const v = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) el.play().then(() => setPlaying(true)).catch(() => {});
      else { el.pause(); setPlaying(false); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const toggle = () => {
    const el = v.current; if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); } else { el.pause(); setPlaying(false); }
  };
  return (
    <section ref={ref} className="bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Eyebrow>ON THE STOVE</Eyebrow>
        <h2 className="reveal mt-6 font-display text-6xl leading-none text-cream md:text-8xl">WATCH THE <span className="text-fire">CRAVING</span> COME ALIVE</h2>
        <div className="reveal relative mt-12 flex min-h-0 w-full items-center justify-center overflow-hidden rounded-2xl border bg-background shadow-glow aspect-[9/16] sm:aspect-[4/3] lg:aspect-video">
          <video ref={v} src={cookingVideo.url} poster={owner} muted={muted} loop playsInline preload="metadata" className="h-full w-full bg-coal object-contain" aria-label="A1 EATS cooking video" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button onClick={toggle} className="rounded-full bg-coal/70 p-3 text-cream backdrop-blur hover:text-primary" aria-label={playing ? "Pause video" : "Play video"}>{playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</button>
            <button onClick={() => setMuted((m) => !m)} className="rounded-full bg-coal/70 p-3 text-cream backdrop-blur hover:text-primary" aria-label={muted ? "Unmute" : "Mute"}>{muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LocationsSection() {
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState(locations[0]?.id ?? "");
  return (
    <section id="locations" ref={ref} className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow>LOCATIONS</Eyebrow>
        <h2 className="reveal mt-6 font-display text-6xl leading-none text-cream md:text-8xl">FIND YOUR <span className="text-fire">A1 EATS</span></h2>
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="reveal relative aspect-square overflow-hidden rounded-2xl border bg-coal lg:aspect-auto" aria-label="Artistic map-inspired illustration, not to scale">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
              <polyline points={locations.map((l) => `${l.x},${l.y}`).join(" ")} fill="none" stroke="var(--primary)" strokeWidth="0.4" strokeDasharray="1.5 1.5" className="draw" vectorEffect="non-scaling-stroke" />
            </svg>
            {locations.map((l) => (
              <button key={l.id} onClick={() => setActive(l.id)} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${l.x}%`, top: `${l.y}%` }} aria-label={l.name}>
                <span className={`pulse-dot block h-4 w-4 rounded-full ${active === l.id ? "bg-primary" : "bg-chili"}`} />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-lg tracking-wide text-cream">{l.name.toUpperCase()}</span>
              </button>
            ))}
            <p className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] text-muted-foreground">CHENNAI · ILLUSTRATIVE, NOT TO SCALE</p>
          </div>
          <div className="space-y-4">
            {locations.map((l) => (
              <article key={l.id} onMouseEnter={() => setActive(l.id)} onFocusCapture={() => setActive(l.id)} className={`rounded-2xl border p-6 opacity-100 transition-colors ${active === l.id ? "border-primary bg-card" : "bg-card/50"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-primary"><MapPin className="h-3.5 w-3.5" />{l.city.toUpperCase()}</p>
                    <h3 className="mt-2 font-display text-4xl text-cream">{l.name.toUpperCase()}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{l.description}</p>
                  </div>
                </div>
                <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${btnFire} mt-5 w-full sm:w-auto`}><Navigation className="h-4 w-4" />OPEN IN GOOGLE MAPS</a>
              </article>
            ))}
            <p className="text-xs text-muted-foreground">Map links open a Google Maps search. Exact addresses & hours coming soon.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="grain relative overflow-hidden py-32 md:py-48">
      <img src={hero} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/70 to-coal" />
      <Embers count={12} />
      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <h2 className="reveal font-display text-6xl leading-[0.9] text-cream md:text-9xl">YOUR NEXT CRAVING <span className="text-fire">STARTS HERE.</span></h2>
        <p className="reveal mt-8 font-display text-2xl tracking-wide text-cream">A1 EATS</p>
        <p className="reveal text-xs font-bold tracking-[0.5em] text-muted-foreground">DELICIOUS CHICKEN</p>
        <div className="reveal mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#menu" className={btnFire}>EXPLORE OUR CHICKEN</a>
          <a href="#locations" className={btnGhost}>FIND YOUR A1 EATS</a>
        </div>
      </div>
    </section>
  );
}
