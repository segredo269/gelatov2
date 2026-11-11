import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Navigation, ExternalLink, Star } from 'lucide-react';

export function LocationSection() {
  const addressQuery = encodeURIComponent('Rua José Carlos Matamachado, 194, Indústrias I, Belo Horizonte, MG, 30610-100');
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
  const wazeUrl = `https://www.waze.com/ul?q=${addressQuery}`;

  return (
    <section id="contato" className="py-20 bg-stone-50 text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            <span>Visite Nossa Loja</span>
            <span aria-hidden="true">·</span>
            <span>Belo Horizonte - MG</span>
            <span aria-hidden="true">·</span>
            <span>Estacionamento Fácil</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-3">
            Onde Estamos e Como Chegar
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Venha tomar um sorvete fresquinho saindo da produtora ou faça seu pedido de caixas e potes térmicos para viagem.
          </p>
        </div>

        {/* 2-Column Location & Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information & Hours (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              {/* Address Item */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                    Endereço da Fábrica & Loja
                  </h4>
                  <p className="text-sm font-semibold text-stone-900 leading-snug">
                    Rua José Carlos Matamachado, 194
                  </p>
                  <p className="text-xs text-stone-600">
                    Bairro Indústrias I (Região do Barreiro)
                  </p>
                  <p className="text-xs text-stone-500 font-mono">
                    Belo Horizonte - MG · CEP 30610-100
                  </p>
                </div>
              </div>

              {/* Hours Item */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                    Horário de Atendimento
                  </h4>
                  <div className="text-xs text-stone-700 space-y-1">
                    <div className="flex justify-between gap-4">
                      <span>Segunda-feira:</span>
                      <strong className="font-mono text-stone-900">12h00 às 21h30</strong>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Terça a Domingo:</span>
                      <strong className="font-mono text-stone-900">10h00 às 21h30</strong>
                    </div>
                    <div className="text-[11px] text-amber-800 font-medium pt-1">
                      Aberto todos os feriados para atendimento ao público.
                    </div>
                  </div>
                </div>
              </div>

              {/* Phones Item */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1">
                    Telefones & Pedidos
                  </h4>
                  <div className="text-xs text-stone-700 space-y-1">
                    <div>
                      <span>Fixo da Fábrica: </span>
                      <a href="tel:3133311808" className="font-mono font-semibold text-stone-900 hover:text-amber-700">
                        (31) 3331-1808
                      </a>
                    </div>
                    <div>
                      <span>WhatsApp Atacado & Loja: </span>
                      <a href="https://wa.me/5531995360314" target="_blank" rel="noopener noreferrer" className="font-mono font-semibold text-emerald-700 hover:underline">
                        (31) 99536-0314
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-stone-100 flex flex-wrap gap-3 mt-6">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold rounded-xl bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Google Maps</span>
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold rounded-xl bg-sky-600 text-white hover:bg-sky-500 transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir no Waze</span>
              </a>
            </div>
          </div>

          {/* Interactive Visual Map & Ambience Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
            {/* Visual Store Map Representation */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50/40 border-b border-stone-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Ponto de Referência
                </span>
                <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>4.9 / 5.0 (Mais de 1.200 avaliações)</span>
                </div>
              </div>

              <h3 className="text-xl font-bold font-serif text-stone-900 mb-2">
                Sorveteria Mestre Sorveteiro - Barreiro
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-6">
                Fácil acesso pelo Anel Rodoviário de Belo Horizonte e Via do Minério. Espaço climatizado com mesas para família, balcão self-service com mais de 30 acompanhamentos e área para retirada de encomendas de atacado.
              </p>

              {/* Quick Route Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white/90 p-3 rounded-xl border border-amber-200/60">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Acesso Rápido</div>
                  <div className="text-xs font-semibold text-stone-800 mt-0.5">Via Anel Rodoviário</div>
                  <div className="text-[11px] text-stone-500">Saída Bairro das Indústrias</div>
                </div>
                <div className="bg-white/90 p-3 rounded-xl border border-amber-200/60">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Estacionamento</div>
                  <div className="text-xs font-semibold text-stone-800 mt-0.5">Vagas na Porta</div>
                  <div className="text-[11px] text-stone-500">Tranquilo e seguro</div>
                </div>
                <div className="bg-white/90 p-3 rounded-xl border border-amber-200/60">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Pagamento</div>
                  <div className="text-xs font-semibold text-stone-800 mt-0.5">PIX, Cartão & Dinheiro</div>
                  <div className="text-[11px] text-stone-500">Aceitamos VR / VA</div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 sm:p-8 bg-stone-900 text-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-amber-300">Quer reservar potes ou tirar dúvidas?</div>
                <div className="text-xs text-stone-400 mt-0.5">Nosso time responde rapidamente no WhatsApp da fábrica.</div>
              </div>
              <a
                href="https://wa.me/5531995360314?text=Ol%C3%A1%20Mestre%20Sorveteiro!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20sabores%20dispon%C3%ADveis%20hoje."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-colors shadow-md whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
