import React, { useState } from 'react';
import { Calculator, MessageCircle, TrendingUp, Users, PackageCheck } from 'lucide-react';
import { LottieDelivery } from './LottieIcons';

export function WholesaleCalculator() {
  const [eventType, setEventType] = useState<'festa' | 'casamento' | 'empresa' | 'revenda'>('festa');
  const [guestsOrUnits, setGuestsOrUnits] = useState<number>(60);
  const [includePicoles, setIncludePicoles] = useState<boolean>(true);
  const [includePotes, setIncludePotes] = useState<boolean>(true);

  // Estimates calculation
  // For events: avg 1.5 to 2 picolés per person OR 150ml of artisan gelato
  const estimatedPicoles = includePicoles ? Math.ceil(guestsOrUnits * 1.5) : 0;
  const estimatedLitres = includePotes ? Math.ceil((guestsOrUnits * 0.12) / 2) * 2 : 0; // 2L multiples
  const wholesaleDiscount = eventType === 'revenda' ? 0.35 : 0.20;

  const retailTotal = (estimatedPicoles * 6.00) + (estimatedLitres * 29.00);
  const wholesaleTotal = retailTotal * (1 - wholesaleDiscount);
  const estimatedSavingsOrProfit = retailTotal - wholesaleTotal;

  // WhatsApp formatted quote generator
  const getWhatsAppMessage = () => {
    const text = `Olá Mestre Sorveteiro! Gostaria de um orçamento especial para *${
      eventType === 'revenda' ? 'Revenda em Comércio' : `Evento (${eventType})`
    }* para aproximadamente *${guestsOrUnits}* ${eventType === 'revenda' ? 'unidades/mês' : 'convidados'}.
- Estimativa: ${estimatedPicoles} picolés artesanais e ${estimatedLitres}L de sorvete de massa.
- Valor estimado com desconto de fábrica: R$ ${wholesaleTotal.toFixed(2).replace('.', ',')}.
Poderiam me passar a tabela completa de atacado e opções de entrega em Belo Horizonte?`;
    return encodeURIComponent(text);
  };

  return (
    <section id="atacado" className="py-20 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Calculator Explanation & Trust */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <span>Direto da Fábrica</span>
              <span aria-hidden="true">·</span>
              <span>Belo Horizonte & Região</span>
              <span aria-hidden="true">·</span>
              <span>Margem até 70%</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-50 tracking-tight mb-4">
              Simulador de Atacado, Eventos & Revenda
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
              Abastecemos padarias, restaurantes, lanchonetes e grandes eventos em toda a Grande BH. Conte com caixas térmicas inclusas, logística de cadeia fria garantida e preço imbatível de fábrica.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 bg-stone-800/80 p-4 rounded-2xl border border-stone-700/60">
                <PackageCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-300 leading-relaxed">
                  <strong className="text-stone-100 block mb-0.5">Baldes de 10L & Caixas com 48 Picolés</strong>
                  Embalagens industriais desenvolvidas para máxima durabilidade, padronização e rentabilidade.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-800/80 p-4 rounded-2xl border border-stone-700/60">
                <LottieDelivery className="w-6 h-6 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-300 leading-relaxed">
                  <strong className="text-stone-100 block mb-0.5">Entrega Rápida com Frota Própria Refrigerada</strong>
                  Garantia de produto sem descongelamento ou formação de cristais de gelo.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Calculator Box */}
          <div className="lg:col-span-7 bg-[#1c1815] border border-amber-900/40 p-6 sm:p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Calculator className="w-4 h-4" />
                <span>Calculadora de Consumo e Custo</span>
              </div>
              <span className="text-xs text-stone-400">Simulação instantânea</span>
            </div>

            {/* Event Type Tabs */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium mb-2">
                Objetivo do Fornecimento:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'festa', label: 'Festa Infantil' },
                  { id: 'casamento', label: 'Casamento / 15 Anos' },
                  { id: 'empresa', label: 'Corporativo' },
                  { id: 'revenda', label: 'Revenda / Padaria' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setEventType(tab.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                      eventType === tab.id
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'bg-stone-800/70 text-stone-300 hover:bg-stone-750 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider for Guests / Units */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-stone-400 font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  {eventType === 'revenda' ? 'Previsão de Saída (Unidades/Semana):' : 'Quantidade de Convidados:'}
                </label>
                <span className="text-base font-bold font-mono text-amber-400 tabular-nums">
                  {guestsOrUnits} {eventType === 'revenda' ? 'unid.' : 'pessoas'}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={guestsOrUnits}
                onChange={e => setGuestsOrUnits(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-700 accent-amber-500 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1 font-mono">
                <span>20</span>
                <span>150</span>
                <span>300</span>
                <span>500+</span>
              </div>
            </div>

            {/* Product Mix Checkboxes */}
            <div className="flex flex-wrap gap-4 mb-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300">
                <input
                  type="checkbox"
                  checked={includePicoles}
                  onChange={e => setIncludePicoles(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 accent-amber-500 bg-stone-800"
                />
                <span>Incluir Picolés e Paletas ({estimatedPicoles} un)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300">
                <input
                  type="checkbox"
                  checked={includePotes}
                  onChange={e => setIncludePotes(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 accent-amber-500 bg-stone-800"
                />
                <span>Incluir Gelato de Massa ({estimatedLitres} Litros)</span>
              </label>
            </div>

            {/* Calculated Estimates Result Box */}
            <div className="bg-stone-900/90 rounded-2xl p-5 border border-stone-800 mb-6">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-stone-800">
                <div>
                  <div className="text-[11px] text-stone-400 uppercase">Preço Varejo Estimado</div>
                  <div className="text-sm font-mono text-stone-400 line-through tabular-nums">
                    R$ {retailTotal.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-amber-400 uppercase font-semibold">Valor com Desconto de Fábrica</div>
                  <div className="text-xl font-bold font-mono text-amber-300 tabular-nums">
                    R$ {wholesaleTotal.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 text-xs text-stone-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Economia / Margem Estimada:
                </span>
                <span className="font-bold text-emerald-400 font-mono tabular-nums">
                  R$ {estimatedSavingsOrProfit.toFixed(2).replace('.', ',')} ({Math.round(wholesaleDiscount * 100)}%)
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <a
              href={`https://wa.me/5531995360314?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-stone-950" />
              <span>Receber Tabela de Atacado no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
