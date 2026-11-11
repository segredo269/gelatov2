import React from 'react';
import { Award, Thermometer, Clock, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { LottieSnowflake } from './LottieIcons';

export function CraftsmanshipSection() {
  const pillars = [
    {
      icon: Clock,
      title: 'Maturação a Frio por 48 Horas',
      desc: 'Nossa calda base descansa a -4°C por dois dias inteiros. Isso permite a hidratação total das proteínas do leite e resulta em uma textura aveludada incomparável.'
    },
    {
      icon: Award,
      title: 'Overrun Italiano Controlado (35%)',
      desc: 'Diferente dos sorvetes industriais de mercado que chegam a 100% de ar, o Mestre Sorveteiro mantém a densidade perfeita do autêntico gelato.'
    },
    {
      icon: HeartHandshake,
      title: 'Ingredientes Mineiros Autênticos',
      desc: 'Usamos leite pasteurizado fresco de fazenda, doce de leite artesanal de tacho e queijo curado da Canastra, valorizando a tradição gastronômica de Minas.'
    },
    {
      icon: Thermometer,
      title: 'Cadeia de Frio Rigorosa',
      desc: 'Nossos túneis de congelamento rápido a -35°C impedem a criação de macrocristais de gelo, garantindo a mesma maciez do primeiro ao último picolé.'
    }
  ];

  return (
    <section id="historia" className="py-20 bg-stone-100 text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            <span>Fábrica Própria em BH</span>
            <span aria-hidden="true">·</span>
            <span>Tradição & Ciência Gelataia</span>
            <span aria-hidden="true">·</span>
            <span>Desde 2008</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-4">
            O Segredo do Mestre: Matéria-Prima Pura & Tempo
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Localizada no Barreiro (Belo Horizonte), nossa estrutura combina tecnologia italiana de ponta com o carinho da confeitaria artesanal mineira.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          {/* Photo Slot */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-stone-300 shadow-lg relative group">
            <img
              src="/src/assets/images/sorveteria_factory_store_1794356725438.jpg"
              alt="Instalações e loja da fábrica Mestre Sorveteiro em Belo Horizonte"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[380px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
                Estrutura Barreiro · Belo Horizonte
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                Megaestrutura de Produção e Loja Aberta ao Público
              </h3>
            </div>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {pillars.map((pil, idx) => {
              const IconComp = pil.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex items-start gap-4 transition-all hover:border-amber-400"
                >
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0 mt-0.5">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 mb-1">{pil.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{pil.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quality Badges Row */}
        <div className="bg-amber-900/90 text-amber-50 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <LottieSnowflake className="w-12 h-12 text-cyan-300 shrink-0" />
            <div>
              <div className="text-base font-bold text-white">Visite Nossa Loja Física com Self-Service Completo</div>
              <div className="text-xs text-amber-200 mt-0.5">Mais de 40 sabores no balcão, casquinhas artesanais e açaí montado na hora.</div>
            </div>
          </div>
          <a
            href="#contato"
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0"
          >
            Ver Endereço e Horários
          </a>
        </div>
      </div>
    </section>
  );
}
