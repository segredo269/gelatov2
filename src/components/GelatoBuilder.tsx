import React, { useState } from 'react';
import { BASES_OPTIONS, TOPPING_OPTIONS } from '../data/iceCreamData';
import { Plus, Check, ShoppingBag, Scale, Sparkles } from 'lucide-react';

interface GelatoBuilderProps {
  onAddCustomBowl: (bowlItem: {
    name: string;
    base: string;
    flavors: string[];
    toppings: string[];
    price: number;
    weightGrams: number;
  }) => void;
}

const AVAILABLE_FLAVORS = [
  { id: 'pistache', name: 'Pistache di Bronte', color: '#8cb86d' },
  { id: 'doce-de-leite', name: 'Doce de Leite com Queijo', color: '#c06b29' },
  { id: 'choc-belga', name: 'Chocolate Belga 70%', color: '#311710' },
  { id: 'acai-puro', name: 'Açaí Puro Cremoso', color: '#47164d' },
  { id: 'ninho-trufado', name: 'Leite Ninho Trufado', color: '#fef08a' },
  { id: 'morango-silvestre', name: 'Morango Silvestre', color: '#b31e45' },
  { id: 'flocos-mestre', name: 'Flocos Tradicional', color: '#f5f5f4' },
  { id: 'pacoca-mineira', name: 'Paçoca e Amendoim', color: '#b45309' },
];

export function GelatoBuilder({ onAddCustomBowl }: GelatoBuilderProps) {
  const [selectedBase, setSelectedBase] = useState(BASES_OPTIONS[0]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>(['pistache', 'doce-de-leite']);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['fudge', 'pistachio-crunch']);
  const [addedNotice, setAddedNotice] = useState(false);

  // Toggle flavor (max 3)
  const toggleFlavor = (flavorId: string) => {
    if (selectedFlavors.includes(flavorId)) {
      if (selectedFlavors.length > 1) {
        setSelectedFlavors(selectedFlavors.filter(f => f !== flavorId));
      }
    } else {
      if (selectedFlavors.length < 3) {
        setSelectedFlavors([...selectedFlavors, flavorId]);
      } else {
        // replace last
        setSelectedFlavors([selectedFlavors[0], selectedFlavors[1], flavorId]);
      }
    }
  };

  // Toggle topping
  const toggleTopping = (toppingId: string) => {
    setSelectedToppings(prev =>
      prev.includes(toppingId) ? prev.filter(t => t !== toppingId) : [...prev, toppingId]
    );
  };

  // Pricing & Weight Calculation
  const basePrice = selectedBase.price;
  const scoopsPrice = selectedFlavors.length * 7.00;
  const toppingsPrice = selectedToppings.reduce((acc, tId) => {
    const t = TOPPING_OPTIONS.find(item => item.id === tId);
    return acc + (t?.extra || 0);
  }, 0);
  const totalPrice = basePrice + scoopsPrice + toppingsPrice;
  const estimatedWeight = 50 + selectedFlavors.length * 90 + selectedToppings.length * 25;

  const handleAdd = () => {
    const flavorNames = selectedFlavors.map(fId => AVAILABLE_FLAVORS.find(f => f.id === fId)?.name || fId);
    const toppingNames = selectedToppings.map(tId => TOPPING_OPTIONS.find(t => t.id === tId)?.name || tId);

    onAddCustomBowl({
      name: `Taça Especial: ${selectedBase.name}`,
      base: selectedBase.name,
      flavors: flavorNames,
      toppings: toppingNames,
      price: totalPrice,
      weightGrams: estimatedWeight
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  return (
    <section id="montador" className="py-20 bg-amber-50/40 text-stone-900 border-t border-amber-100/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            <span>Simulador Self-Service</span>
            <span aria-hidden="true">·</span>
            <span>Monte Sua Combinação</span>
            <span aria-hidden="true">·</span>
            <span>Preço na Hora</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-3">
            Monte a Sua Taça ou Cascão Perfeito
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Escolha o recipiente artesanal, combine até 3 bolas de sorvetes ou açaí e adicione suas coberturas favoritas.
          </p>
        </div>

        {/* 2-Column Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm">
            {/* Step 1: Base */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-800">
                  1. Escolha o Formato da Base
                </h3>
                <span className="text-xs text-stone-500">1 obrigatório</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASES_OPTIONS.map(base => {
                  const isSelected = selectedBase.id === base.id;
                  return (
                    <button
                      key={base.id}
                      onClick={() => setSelectedBase(base)}
                      className={`text-left p-3.5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900">{base.name}</span>
                        <span className="text-xs font-mono font-semibold text-amber-800 tabular-nums">
                          +R$ {base.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-tight">{base.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Flavors */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-800">
                  2. Escolha os Sabores de Sorvete ou Açaí
                </h3>
                <span className="text-xs text-amber-700 font-semibold font-mono tabular-nums">
                  {selectedFlavors.length}/3 selecionados
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {AVAILABLE_FLAVORS.map(flavor => {
                  const isSelected = selectedFlavors.includes(flavor.id);
                  return (
                    <button
                      key={flavor.id}
                      onClick={() => toggleFlavor(flavor.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'border-amber-600 bg-amber-600 text-white shadow-sm'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-800'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: flavor.color }}
                      />
                      <span className="text-xs font-medium truncate">{flavor.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Toppings */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-800">
                  3. Coberturas & Acompanhamentos Especiais
                </h3>
                <span className="text-xs text-stone-500">Opcional</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TOPPING_OPTIONS.map(topping => {
                  const isSelected = selectedToppings.includes(topping.id);
                  return (
                    <button
                      key={topping.id}
                      onClick={() => toggleTopping(topping.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: topping.color }}
                      />
                      <span>{topping.name}</span>
                      <span className="text-[11px] text-stone-400 font-mono tabular-nums">
                        (+R$ {topping.extra.toFixed(2).replace('.', ',')})
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-700 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Weigh Scale & Summary Column (5 cols) */}
          <div className="lg:col-span-5 bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-amber-400" />
                  <span className="text-xs uppercase tracking-wider text-stone-300 font-semibold">
                    Balança & Resumo do Pedido
                  </span>
                </div>
                <div className="text-xs font-mono text-amber-400 tabular-nums">
                  ~{estimatedWeight}g estimados
                </div>
              </div>

              {/* Recipe Breakdown */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-[11px] text-stone-400 uppercase font-semibold">Base:</div>
                  <div className="text-sm font-semibold text-stone-100 flex justify-between mt-0.5">
                    <span>{selectedBase.name}</span>
                    <span className="font-mono text-amber-400 tabular-nums">
                      R$ {selectedBase.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-stone-400 uppercase font-semibold">
                    Bolas de Sorvete ({selectedFlavors.length}):
                  </div>
                  <div className="space-y-1 mt-1">
                    {selectedFlavors.map(fId => {
                      const f = AVAILABLE_FLAVORS.find(item => item.id === fId);
                      return (
                        <div key={fId} className="text-xs text-stone-300 flex justify-between items-center">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: f?.color }}
                            />
                            {f?.name}
                          </span>
                          <span className="font-mono text-stone-400 tabular-nums">R$ 7,00</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedToppings.length > 0 && (
                  <div>
                    <div className="text-[11px] text-stone-400 uppercase font-semibold">
                      Toppings ({selectedToppings.length}):
                    </div>
                    <div className="space-y-1 mt-1">
                      {selectedToppings.map(tId => {
                        const t = TOPPING_OPTIONS.find(item => item.id === tId);
                        return (
                          <div key={tId} className="text-xs text-stone-300 flex justify-between">
                            <span>{t?.name}</span>
                            <span className="font-mono text-stone-400 tabular-nums">
                              R$ {t?.extra.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Total & Order Button */}
            <div className="pt-6 border-t border-stone-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-stone-400 uppercase font-semibold">Valor Total Calculado</span>
                <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedNotice ? 'Taça Adicionada ao Carrinho!' : 'Adicionar Taça Personalizada'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
