import { useState, useEffect, useRef } from "react";
import logoImg from "@/imports/72634d67-0845-4650-afca-0c5b940df1bd__1_.png";
import heroImg from "./assets/images/hero.jpeg";
import aboutImg from "./assets/images/about.jpeg";
import prayerImg from "./assets/images/prayer.jpeg";
import candle1Img from "./assets/images/candle1.jpeg";
import candle2Img from "./assets/images/candle2.jpeg";
import rosesImg from "./assets/images/roses.jpeg";
import group1Img from "./assets/images/group1.jpeg";
import friendsImg from "./assets/images/friends.jpeg";
import group2Img from "./assets/images/group2.jpeg";
import cozyImg from "./assets/images/cozy.jpeg";
import seniorsImg from "./assets/images/seniors.jpeg";
import candle3Img from "./assets/images/candle3.jpeg";

const UNSPLASH = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const photos = {
  hero: heroImg,
  about: aboutImg,
  prayer: prayerImg,
  candle1: candle1Img,
  candle2: candle2Img,
  roses: rosesImg,
  group1: group1Img,
  friends: friendsImg,
  group2: group2Img,
  cozy: cozyImg,
  seniors: seniorsImg,
  candle3: candle3Img,
};

function StaticPhoto({
  src,
  alt,
  style,
  className,
  id,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={className}
      style={{
        position: "relative",
        display: "block",
        overflow: "hidden",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Propósito", href: "#proposito" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Comunidade", href: "#comunidade" },
  { label: "Galeria", href: "#galeria" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-full" style={{ background: "#FFF8EE", fontFamily: "'Nunito', sans-serif" }}>
      {/* ─── NAV ─── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(255,248,238,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,146,26,0.18)" : "none",
          transition: "background 0.4s, border 0.4s",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <img src={logoImg} alt="Terço nas Casas logo" className="w-10 h-10 object-contain" style={{ mixBlendMode: "multiply" }} />
            <span
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: "#C41E1E",
                letterSpacing: "0.01em",
              }}
            >
              Terço nas Casas
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{
                    color: "#2C2420",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C41E1E")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#2C2420")}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#participar"
                style={{
                  background: "#C41E1E",
                  color: "#fff",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "100px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#A31818")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C41E1E")}
              >
                Participar
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#2C2420" }}
            aria-label="Menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" strokeLinecap="round" />
                  <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                  <line x1="3" y1="17" x2="21" y2="17" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "rgba(255,248,238,0.98)", borderBottom: "1px solid #E5D9C8" }}>
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    style={{ color: "#2C2420", fontWeight: 500, textDecoration: "none" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#participar"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "inline-block",
                    background: "#C41E1E",
                    color: "#fff",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "100px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Participar
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${photos.hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            transform: "scale(1.04)",
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(44,36,32,0.78) 0%, rgba(44,36,32,0.45) 55%, rgba(44,36,32,0.15) 100%)",
          }}
        />

        {/* Decorative rosary bead dots */}
        <div style={{ position: "absolute", top: "20%", right: "8%", opacity: 0.25 }}>
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              style={{
                width: i === 3 ? "14px" : "8px",
                height: i === 3 ? "14px" : "8px",
                borderRadius: "50%",
                background: "#C8921A",
                margin: "0 auto 12px",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16">
          <div className="max-w-xl">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" }}>
              
              <span
                style={{
                  fontFamily: "'Lora', serif",
                  color: "#E8B84B",
                  fontSize: "1rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 600,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
                animation: "fadeUp 0.8s ease both",
              }}
            >
              Levando a oração<br />
              <em style={{ color: "#E8B84B", fontStyle: "italic" }}>para dentro dos lares</em>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                maxWidth: "420px",
                animation: "fadeUp 0.8s ease 0.15s both",
              }}
            >
              Um grupo de consagrados que se reúne nas casas das famílias para rezar o Santo Terço, fortalecendo a fé, a união e a devoção a Nossa Senhora.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeUp 0.8s ease 0.3s both" }}>
              <a
                href="#proposito"
                style={{
                  background: "#C41E1E",
                  color: "#fff",
                  padding: "0.85rem 2rem",
                  borderRadius: "100px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "background 0.2s, transform 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#A31818"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#C41E1E"; e.currentTarget.style.transform = "none"; }}
              >
                Conheça nosso propósito
              </a>
              <a
                href="#participar"
                style={{
                  border: "2px solid rgba(255,255,255,0.6)",
                  color: "#fff",
                  padding: "0.85rem 2rem",
                  borderRadius: "100px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E8B84B"; e.currentTarget.style.background = "rgba(232,184,75,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "transparent"; }}
              >
                Quero participar
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span>Rolar</span>
          <svg width="16" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 24">
            <rect x="1" y="1" width="14" height="22" rx="7" />
            <circle cx="8" cy="7" r="2" fill="currentColor" stroke="none">
              <animate attributeName="cy" values="7;15;7" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </section>

      {/* ─── SOBRE ─── */}
      <section id="sobre" style={{ background: "#fff", padding: "7rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeSection>
              <span
                style={{
                  display: "inline-block",
                  color: "#C41E1E",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                }}
              >
                Nossa história
              </span>
              <h2
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 600,
                  color: "#2C2420",
                  lineHeight: 1.2,
                  marginBottom: "1.5rem",
                }}
              >
                Sobre o Terço<br />
                <em style={{ color: "#C8921A" }}>nas Casas</em>
              </h2>
              <div style={{ width: "48px", height: "3px", background: "#C41E1E", marginBottom: "2rem", borderRadius: "2px" }} />
              <p style={{ color: "#7A6E66", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                O Terço nas Casas nasceu do desejo simples e profundo de levar a oração para o coração das famílias. Reunimo-nos em diferentes lares, acreditando que onde duas ou três pessoas se reúnem em nome d'Ele, Ele está presente.
              </p>
              <p style={{ color: "#7A6E66", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Com devoção a Nossa Senhora Rosa Mística, rezamos o Santo Terço juntos, fortalecendo a fé, a união e o amor entre as famílias e a comunidade. Cada encontro é um momento de graça, paz e acolhimento.
              </p>
              <div style={{ display: "flex", gap: "2.5rem" }}>
                {[["1+", "Ano de história"], ["20+", "Famílias visitadas"], ["30+", "Integrantes ativos"]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Lora', serif", fontSize: "2rem", fontWeight: 700, color: "#C41E1E" }}>{num}</div>
                    <div style={{ fontSize: "0.8rem", color: "#7A6E66", fontWeight: 500, letterSpacing: "0.03em" }}>{label}</div>
                  </div>
                ))}
              </div>
            </FadeSection>

            <FadeSection delay={150}>
              <div style={{ position: "relative" }}>
                <StaticPhoto
                  id="photo-about"
                  src={photos.about}
                  alt="Comunidade reunida em oração"
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    borderRadius: "16px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "-3rem",
                    left: "-2.5rem",
                    background: "#C41E1E",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "1.25rem 1.5rem",
                    maxWidth: "220px",
                    boxShadow: "0 8px 32px rgba(196,30,30,0.25)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>🌹</div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.4 }}>
                    "Rezai o Rosário todos os dias"
                  </div>
                  <div style={{ fontSize: "0.72rem", marginTop: "0.5rem", opacity: 0.8, letterSpacing: "0.05em" }}>— Nossa Senhora de Fátima</div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-1rem",
                    right: "-1rem",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    border: "3px solid #C8921A",
                    opacity: 0.4,
                  }}
                />
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ─── PROPÓSITO ─── */}
      <section id="proposito" style={{ background: "#FFF8EE", padding: "7rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeSection className="text-center mb-16">
            <span
              style={{
                display: "inline-block",
                color: "#C41E1E",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Por que existimos
            </span>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                fontWeight: 600,
                color: "#2C2420",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              Nosso Propósito
            </h2>
            <p style={{ color: "#7A6E66", fontSize: "1rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
              Cada encontro tem um significado. Cada oração transforma um lar.
            </p>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🙏",
                title: "Oração",
                text: "Reunimo-nos para rezar o Santo Terço com devoção e fervor, unindo nossas vozes a Maria.",
                delay: 0,
              },
              {
                icon: "❤️",
                title: "Comunidade",
                text: "Construímos laços verdadeiros de amizade, fé e solidariedade entre as pessoas.",
                delay: 100,
              },
              {
                icon: "🏠",
                title: "Famílias",
                text: "Levamos a graça da oração para dentro dos lares, fortalecendo as famílias pela fé.",
                delay: 200,
              },
              {
                icon: "🌹",
                title: "Nossa Senhora",
                text: "Somos devotos de Maria, seguindo seu exemplo de oração, humildade e amor ao próximo.",
                delay: 300,
              },
            ].map((card) => (
              <FadeSection key={card.title} delay={card.delay}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "2rem 1.75rem",
                    height: "100%",
                    border: "1px solid rgba(200,146,26,0.15)",
                    transition: "transform 0.25s, box-shadow 0.25s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-6px)";
                    el.style.boxShadow = "0 12px 40px rgba(196,30,30,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "none";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "2.25rem", marginBottom: "1rem" }}>{card.icon}</div>
                  <h3
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "#2C2420",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ color: "#7A6E66", fontSize: "0.9rem", lineHeight: 1.7 }}>{card.text}</p>
                  <div style={{ width: "32px", height: "2px", background: "#C41E1E", marginTop: "1.5rem", borderRadius: "2px" }} />
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MOMENTOS DO TERÇO (Editorial gallery) ─── */}
      <section style={{ background: "#fff", padding: "7rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span
                  style={{
                    display: "inline-block",
                    color: "#C41E1E",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  Fotografia
                </span>
                <h2
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                    fontWeight: 600,
                    color: "#2C2420",
                    lineHeight: 1.2,
                  }}
                >
                  Momentos do Terço
                </h2>
              </div>
              <p style={{ color: "#7A6E66", maxWidth: "320px", fontSize: "0.9rem", lineHeight: 1.7 }}>
                Cada encontro é único. Cada rosto reflete a luz da fé compartilhada.
              </p>
            </div>
          </FadeSection>

          {/* Editorial grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            style={{ gridTemplateRows: "auto" }}
          >
            <FadeSection delay={0} className="col-span-2 md:col-span-1 row-span-2">
              <StaticPhoto
                id="photo-friends"
                src={photos.friends}
                alt="Pessoas reunidas em oração"
                style={{ width: "100%", minHeight: "320px", borderRadius: "12px", aspectRatio: "3/4" }}
              />
            </FadeSection>
            <FadeSection delay={100}>
              <StaticPhoto
                id="photo-candle1"
                src={photos.candle1}
                alt="Vela acesa durante a oração"
                style={{ width: "100%", aspectRatio: "4/3", borderRadius: "12px" }}
              />
            </FadeSection>
            <FadeSection delay={200}>
              <StaticPhoto
                id="photo-roses"
                src={photos.roses}
                alt="Rosas vermelhas, símbolo de Nossa Senhora"
                style={{ width: "100%", aspectRatio: "4/3", borderRadius: "12px" }}
              />
            </FadeSection>
            <FadeSection delay={150} className="col-span-2">
              <StaticPhoto
                id="photo-seniors"
                src={photos.seniors}
                alt="Comunidade reunida"
                style={{ width: "100%", aspectRatio: "16/7", borderRadius: "12px" }}
              />
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─── */}
      <section id="como-funciona" style={{ background: "#FFF8EE", padding: "7rem 0" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <FadeSection className="text-center mb-16">
            <span
              style={{
                display: "inline-block",
                color: "#C41E1E",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              O processo
            </span>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                fontWeight: 600,
                color: "#2C2420",
              }}
            >
              Como Funciona
            </h2>
          </FadeSection>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-0 relative">
            {/* Connector line */}
            <div
              className="hidden md:block"
              style={{
                position: "absolute",
                top: "2.5rem",
                left: "12.5%",
                right: "12.5%",
                height: "2px",
                background: "linear-gradient(to right, #C41E1E, #C8921A, #C41E1E)",
                opacity: 0.3,
              }}
            />

            {[
              { num: "01", icon: "🏠", title: "Uma família abre as portas", text: "Uma família ou pessoa se oferece para receber o grupo em sua casa com amor e acolhimento." },
              { num: "02", icon: "🚶‍♀️", title: "O grupo se reúne", text: "Os integrantes chegam no dia marcado, trazendo a Imagem de Ns Rosa Mística, paz e alegria para o lar que os recebe." },
              { num: "03", icon: "🙏", title: "Todos rezam juntos", text: "Unidos em oração, rezamos o Santo Terço com devoção, meditando os mistérios de Maria." },
              { num: "04", icon: "✨", title: "A graça se espalha", text: "A oração fortalece a família, a comunidade, e a bênção de Nossa Senhora cobre aquele lar." },
            ].map((step, i) => (
              <FadeSection key={step.num} delay={i * 100}>
                <div style={{ textAlign: "center", padding: "0 1.5rem", position: "relative" }}>
                  <div
                    style={{
                      width: "5rem",
                      height: "5rem",
                      borderRadius: "50%",
                      background: i % 2 === 0 ? "#C41E1E" : "#fff",
                      border: i % 2 === 1 ? "2px solid #C41E1E" : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.5rem",
                      fontSize: "2rem",
                      boxShadow: "0 4px 16px rgba(196,30,30,0.15)",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#C8921A",
                      letterSpacing: "0.12em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3 style={{ fontFamily: "'Lora', serif", fontSize: "1rem", fontWeight: 600, color: "#2C2420", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                    {step.title}
                  </h3>
                  <p style={{ color: "#7A6E66", fontSize: "0.875rem", lineHeight: 1.7 }}>{step.text}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMUNIDADE ─── */}
      <section id="comunidade" style={{ background: "#fff", padding: "7rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeSection>
              <div className="grid grid-cols-2 gap-4">
                <StaticPhoto
                  id="photo-group1"
                  src={photos.group1}
                  alt="Grupo em oração"
                  style={{ width: "100%", aspectRatio: "4/3", borderRadius: "12px" }}
                />
                <StaticPhoto
                  id="photo-cozy"
                  src={photos.cozy}
                  alt="Encontro de comunidade"
                  style={{ width: "100%", aspectRatio: "3/4", borderRadius: "12px", marginTop: "2rem" }}
                />
                <StaticPhoto
                  id="photo-candle2"
                  src={photos.candle2}
                  alt="Velas na oração"
                  style={{ width: "100%", aspectRatio: "4/3", borderRadius: "12px", marginTop: "-2rem" }}
                />
                <StaticPhoto
                  id="photo-group2"
                  src={photos.group2}
                  alt="Comunidade reunida"
                  style={{ width: "100%", aspectRatio: "4/3", borderRadius: "12px" }}
                />
              </div>
            </FadeSection>

            <FadeSection delay={150}>
              <span
                style={{
                  display: "inline-block",
                  color: "#C41E1E",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                }}
              >
                Quem somos
              </span>
              <h2
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                  fontWeight: 600,
                  color: "#2C2420",
                  lineHeight: 1.2,
                  marginBottom: "1.5rem",
                }}
              >
                Nossa Comunidade
              </h2>
              <div style={{ width: "48px", height: "3px", background: "#C41E1E", marginBottom: "2rem", borderRadius: "2px" }} />

              <blockquote
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "1.4rem",
                  fontStyle: "italic",
                  color: "#2C2420",
                  lineHeight: 1.5,
                  marginBottom: "2rem",
                  borderLeft: "4px solid #C8921A",
                  paddingLeft: "1.25rem",
                }}
              >
                "Somos uma comunidade de consagrados a Nossa Senhora, unida pela fé e pela oração."
              </blockquote>

              <p style={{ color: "#7A6E66", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Somos pessoas comuns, de diferentes idades e histórias, que encontraram em Nossa Senhora um ponto de encontro. Nos reunimos com alegria, acolhemos com amor e rezamos com o coração.
              </p>
              <p style={{ color: "#7A6E66", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                Cada integrante traz um pouco de si, e juntos formamos algo maior: uma família de fé que cresce a cada lar visitado, a cada Terço rezado.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {/* Stacked avatar circles */}
                <div style={{ display: "flex" }}>
                  {["#C41E1E", "#C8921A", "#2D6A2D", "#7A6E66"].map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: color,
                        border: "3px solid #fff",
                        marginLeft: i === 0 ? 0 : "-10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                      }}
                    >
                      {["M", "J", "A", "L"][i]}
                    </div>
                  ))}
                </div>
                <span style={{ color: "#7A6E66", fontSize: "0.875rem" }}>
                  <strong style={{ color: "#2C2420" }}>+30 integrantes</strong> ativos em nossa comunidade
                </span>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ─── GALERIA ─── */}
      <section id="galeria" style={{ background: "#2C2420", padding: "7rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeSection className="text-center mb-12">
            <span
              style={{
                display: "inline-block",
                color: "#E8B84B",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Galeria
            </span>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                fontWeight: 600,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              Cada foto conta<br />
              <em style={{ color: "#E8B84B" }}>uma história de fé</em>
            </h2>
          </FadeSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { src: photos.prayer, alt: "Mãos em oração", aspect: "4/3" },
              { src: photos.candle3, alt: "Vela de oração", aspect: "3/4" },
              { src: photos.group2, alt: "Grupo reunido", aspect: "4/3" },
              { src: photos.roses, alt: "Rosas de Nossa Senhora", aspect: "3/4" },
              { src: photos.cozy, alt: "Encontro acolhedor", aspect: "4/3" },
              { src: photos.candle1, alt: "Luz da oração", aspect: "4/3" },
            ].map((item, i) => (
              <FadeSection key={i} delay={i * 80}>
                <StaticPhoto
                  id={`photo-gallery-${i}`}
                  src={item.src}
                  alt={item.alt}
                  style={{
                    width: "100%",
                    aspectRatio: item.aspect,
                    borderRadius: "10px",
                    background: "#3A2E2A",
                  }}
                />
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        id="participar"
        style={{
          position: "relative",
          padding: "8rem 0",
          overflow: "hidden",
          background: "#FFF8EE",
        }}
      >
        {/* Subtle rose decoration */}
        <div
          style={{
            position: "absolute",
            right: "-4rem",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.06,
            fontSize: "24rem",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          🌹
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative">
          <FadeSection>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "#FDE8E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                margin: "0 auto 2rem",
              }}
            >
              🏠
            </div>
            <span
              style={{
                display: "inline-block",
                color: "#C41E1E",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Venha rezar conosco
            </span>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 600,
                color: "#2C2420",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              Abra as portas da sua casa<br />
              <em style={{ color: "#C8921A" }}>para a oração</em>
            </h2>
            <p style={{ color: "#7A6E66", fontSize: "1.1rem", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto 3rem" }}>
              Seja bem-vindo ao Terço nas Casas. Receba o grupo em sua casa, participe dos encontros ou simplesmente venha rezar conosco. Nossa comunidade está de portas abertas para você e sua família.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://wa.me/5518997693268"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  background: "#C41E1E",
                  color: "#fff",
                  padding: "1rem 2.25rem",
                  borderRadius: "100px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(196,30,30,0.3)",
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#A31818"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#C41E1E"; e.currentTarget.style.transform = "none"; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Quero receber o Terço
              </a>
              <a
                href="#sobre"
                style={{
                  display: "inline-block",
                  border: "2px solid #C8921A",
                  color: "#C8921A",
                  padding: "1rem 2.25rem",
                  borderRadius: "100px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FEF3D7"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                Saiba mais
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#1E1510", color: "#fff", padding: "4rem 0 2rem" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <img src={logoImg} alt="Terço nas Casas" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
                </div>
                <span style={{ fontFamily: "'Lora', serif", fontSize: "1.1rem", fontWeight: 600, color: "#E8B84B" }}>
                  Terço nas Casas
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "280px" }}>
                Levando a oração do Santo Terço para dentro dos lares, unindo famílias e comunidades pela fé em Nossa Senhora.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: "'Lora', serif", fontSize: "1rem", fontWeight: 600, color: "#fff", marginBottom: "1.25rem" }}>
                Navegação
              </h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#E8B84B")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontFamily: "'Lora', serif", fontSize: "1rem", fontWeight: 600, color: "#fff", marginBottom: "1.25rem" }}>
                Entre em Contato
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href="https://wa.me/5518997693268"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4ADE80")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#E8B84B", fontFamily: "'Lora', serif", fontSize: "0.9rem", fontStyle: "italic" }}>
              "Ave Maria, cheia de graça."
            </p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>
              © {new Date().getFullYear()} Terço nas Casas | Serva Mariana Miranda. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
