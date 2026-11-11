import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Award, ShieldCheck, ThermometerSnowflake } from 'lucide-react';
import { LottieIceCream, LottieSnowflake } from './LottieIcons';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const badgeStripRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const floatingCardTopRef = useRef<HTMLDivElement>(null);
  const floatingCardBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. High-Impact Entrance Timeline triggered when hero enters viewport
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      // Ice cream branding kicker fade & slide down
      entranceTl
        .from(kickerRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
        })
        // Display headline slides in with slight scale expansion
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        // Body narrative smoothly fades up
        .from(
          textRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          '-=0.5'
        )
        // Call-to-action buttons slide in with snappy bounce
        .from(
          [ctaPrimaryRef.current, ctaSecondaryRef.current],
          {
            opacity: 0,
            y: 28,
            scale: 0.96,
            stagger: 0.14,
            duration: 0.65,
            ease: 'back.out(1.4)',
          },
          '-=0.4'
        )
        // Image card reveal
        .from(
          imageCardRef.current,
          {
            opacity: 0,
            scale: 0.92,
            y: 30,
            duration: 1.0,
            ease: 'power2.out',
          },
          '-=0.7'
        )
        // Floating micro Lottie cards spring into place
        .from(
          [floatingCardTopRef.current, floatingCardBottomRef.current],
          {
            opacity: 0,
            scale: 0.7,
            y: 20,
            stagger: 0.16,
            duration: 0.7,
            ease: 'back.out(1.6)',
          },
          '-=0.5'
        )
        // Proof metric indicators fade up in a coordinated sequence
        .from(
          badgeStripRef.current?.children || [],
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.6,
          },
          '-=0.4'
        );

      // 2. Parallax Scroll Effect as user scrolls down through the hero
      if (imageCardRef.current && heroRef.current) {
        gsap.to(imageCardRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
          y: 60,
          rotationZ: 0.5,
          ease: 'none',
        });
      }

      if (floatingCardTopRef.current && heroRef.current) {
        gsap.to(floatingCardTopRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
          y: -30,
          ease: 'none',
        });
      }

      if (floatingCardBottomRef.current && heroRef.current) {
        gsap.to(floatingCardBottomRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
          y: 40,
          ease: 'none',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-gradient-to-b from-stone-900 via-stone-900 to-[#181412] text-amber-50 pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden"
    >
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Ice Cream Branding Kicker (Zero-Pill discipline) */}
            <div
              ref={kickerRef}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3"
            >
              <span>Fábrica & Sorveteria Artesanal</span>
              <span aria-hidden="true">·</span>
              <span>Belo Horizonte, MG</span>
              <span aria-hidden="true">·</span>
              <span>Desde 2008</span>
            </div>

            {/* Display Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-amber-50 leading-[1.12] mb-6 text-balance"
            >
              A Autêntica Maestria do Sorvete, Picolé e Gelato Mineiro
            </h1>

            {/* Body Description */}
            <p
              ref={textRef}
              className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl mb-8"
            >
              Caldas maturadas a frio por 48 horas, leite fresco de fazenda e frutas in natura selecionadas. Venha viver a experiência completa em nossa loja com megaestrutura no Barreiro ou leve os melhores sabores no atacado para seu comércio e evento.
            </p>

            {/* Call-to-Action Buttons */}
            <div
              ref={ctaContainerRef}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                ref={ctaPrimaryRef}
                href="#cardapio"
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg active:scale-95"
              >
                <span>Explorar Cardápio</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                ref={ctaSecondaryRef}
                href="#studio-3d"
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-amber-100 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Simulador 3D do Gelato</span>
              </a>
            </div>

            {/* 4 Quantitative Proof Strips */}
            <div
              ref={badgeStripRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-800/80 w-full"
            >
              <div>
                <div className="text-2xl font-bold font-serif text-amber-400 font-mono tabular-nums">
                  +40
                </div>
                <div className="text-xs text-stone-400 font-medium">Sabores Artesanais</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-serif text-amber-400 font-mono tabular-nums">
                  48h
                </div>
                <div className="text-xs text-stone-400 font-medium">Maturação a Frio</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-serif text-amber-400 font-mono tabular-nums">
                  100%
                </div>
                <div className="text-xs text-stone-400 font-medium">Frutas Selecionadas</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-serif text-amber-400 font-mono tabular-nums">
                  16 Anos
                </div>
                <div className="text-xs text-stone-400 font-medium">Tradição em BH</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Hero Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageCardRef}
              className="relative rounded-3xl overflow-hidden border border-amber-900/40 shadow-2xl bg-stone-950 group"
            >
              {/* Generated Hero Image */}
              <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                <img
                  src="/src/assets/images/hero_gelato_artisan_splash_1794356723779.jpg"
                  alt="Gelato artesanal Mestre Sorveteiro com pistache, chocolate belga e morangos"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Floating Lottie Micro Card 1: Artisan Craft */}
              <div
                ref={floatingCardTopRef}
                className="absolute top-4 left-4 bg-stone-900/90 border border-stone-800/90 rounded-2xl p-3 flex items-center gap-3 shadow-xl"
              >
                <LottieIceCream className="w-10 h-10 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-stone-100">Gelato & Picolé</div>
                  <div className="text-[11px] text-amber-400">Receita Original do Mestre</div>
                </div>
              </div>

              {/* Floating Lottie Micro Card 2: Cold Chain */}
              <div
                ref={floatingCardBottomRef}
                className="absolute bottom-4 right-4 bg-stone-900/90 border border-stone-800/90 rounded-2xl p-3 flex items-center gap-3 shadow-xl"
              >
                <LottieSnowflake className="w-8 h-8 shrink-0 text-cyan-400" />
                <div className="text-right">
                  <div className="text-xs font-semibold text-stone-100">Cadeia de Frio a -18°C</div>
                  <div className="text-[11px] text-stone-400">Textura Aveludada Perfeita</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
