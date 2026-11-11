import React from 'react';
import { Phone, MapPin, Instagram, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-850">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <span className="text-xl font-serif font-black tracking-tight text-amber-400 block mb-3">
              MESTRE SORVETEIRO
            </span>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Tradição em sorvetes artesanais, picolés gourmet, paletas mexicanas recheadas e açaí autêntico em Belo Horizonte desde 2008.
            </p>
            <div className="text-[11px] text-stone-500">
              Barreiro · Belo Horizonte / MG
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-100 font-semibold mb-3">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#cardapio" className="hover:text-amber-400 transition-colors">Cardápio Completo</a>
              </li>
              <li>
                <a href="#studio-3d" className="hover:text-amber-400 transition-colors">Studio 3D Interativo</a>
              </li>
              <li>
                <a href="#montador" className="hover:text-amber-400 transition-colors">Monte sua Taça</a>
              </li>
              <li>
                <a href="#atacado" className="hover:text-amber-400 transition-colors">Revenda & Atacado</a>
              </li>
              <li>
                <a href="#historia" className="hover:text-amber-400 transition-colors">A Fábrica & Maturação</a>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-100 font-semibold mb-3">
              Atendimento na Loja
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p>Segunda: 12h às 21h30</p>
              <p>Terça a Domingo: 10h às 21h30</p>
              <p className="pt-2 text-amber-300 font-medium">
                Rua José Carlos Matamachado, 194
                <br />Indústrias I, Belo Horizonte - MG
              </p>
            </div>
          </div>

          {/* Contato Direto */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-100 font-semibold mb-3">
              Canais Oficiais
            </h4>
            <div className="space-y-2 text-xs text-stone-400 mb-4">
              <div>
                <span className="text-stone-500">Fixo: </span>
                <span className="font-mono text-stone-200">(31) 3331-1808</span>
              </div>
              <div>
                <span className="text-stone-500">WhatsApp: </span>
                <a
                  href="https://wa.me/5531995360314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-400 hover:underline"
                >
                  (31) 99536-0314
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Mestre Sorveteiro Ltda. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1">
            <span>Orgulhosamente produzido em Belo Horizonte, Minas Gerais</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
