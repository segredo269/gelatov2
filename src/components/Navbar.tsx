import React, { useState } from 'react';
import { ShoppingBag, Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 text-stone-100 border-b border-stone-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element Brand wordmark */}
        <a
          href="#"
          className="text-xl md:text-2xl font-serif font-black tracking-tight text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
        >
          MESTRE SORVETEIRO
        </a>

        {/* Zone 2: 4–5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <a
            href="#cardapio"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Cardápio Artesanal
          </a>
          <a
            href="#studio-3d"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Studio 3D
          </a>
          <a
            href="#montador"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Monte sua Taça
          </a>
          <a
            href="#atacado"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Revenda & Atacado
          </a>
          <a
            href="#historia"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            A Fábrica
          </a>
          <a
            href="#contato"
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Loja BH
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Meu Pedido</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-stone-950 text-amber-400 text-[11px] font-bold flex items-center justify-center font-mono tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950 border-b border-stone-800 px-6 py-4 flex flex-col gap-3 text-sm font-medium">
          <a
            href="#cardapio"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-stone-200 hover:text-amber-400 border-b border-stone-900"
          >
            Cardápio Artesanal
          </a>
          <a
            href="#studio-3d"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-stone-200 hover:text-amber-400 border-b border-stone-900"
          >
            Studio 3D Interativo
          </a>
          <a
            href="#montador"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-stone-200 hover:text-amber-400 border-b border-stone-900"
          >
            Monte sua Taça & Açaí
          </a>
          <a
            href="#atacado"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-stone-200 hover:text-amber-400 border-b border-stone-900"
          >
            Revenda, Eventos & Atacado
          </a>
          <a
            href="#historia"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-stone-200 hover:text-amber-400 border-b border-stone-900"
          >
            A Fábrica & Segredos do Mestre
          </a>
          <a
            href="#contato"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-stone-200 hover:text-amber-400"
          >
            Localização Barreiro BH
          </a>
        </div>
      )}
    </header>
  );
}
