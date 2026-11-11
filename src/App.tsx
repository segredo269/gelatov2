/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThreeGelatoStudio } from './components/ThreeGelatoStudio';
import { MenuSection } from './components/MenuSection';
import { GelatoBuilder } from './components/GelatoBuilder';
import { WholesaleCalculator } from './components/WholesaleCalculator';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { Product } from './data/iceCreamData';
import { ShoppingBag, MessageCircle } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add standard product to cart
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          details: `${product.categoryLabel} · ${product.volumeOrWeight}`,
          image: product.image
        }
      ];
    });
  };

  // Add custom 3D Gelato from Three.js studio
  const handleAddCustomGelato = (gelato: {
    name: string;
    flavor1: string;
    flavor2: string;
    toppings: string[];
    price: number;
  }) => {
    const id = `custom-3d-${Date.now()}`;
    const details = `Bolas: ${gelato.flavor1} + ${gelato.flavor2}${
      gelato.toppings.length > 0 ? ` · Toppings: ${gelato.toppings.join(', ')}` : ''
    }`;

    setCartItems(prev => [
      ...prev,
      {
        id,
        name: gelato.name,
        price: gelato.price,
        quantity: 1,
        details,
        image: '/src/assets/images/hero_gelato_artisan_splash_1794356723779.jpg'
      }
    ]);
    setIsCartOpen(true);
  };

  // Add custom bowl from Montador
  const handleAddCustomBowl = (bowl: {
    name: string;
    base: string;
    flavors: string[];
    toppings: string[];
    price: number;
    weightGrams: number;
  }) => {
    const id = `custom-bowl-${Date.now()}`;
    const details = `Base: ${bowl.base} · Sabores: ${bowl.flavors.join(', ')}${
      bowl.toppings.length > 0 ? ` · Toppings: ${bowl.toppings.join(', ')}` : ''
    } (~${bowl.weightGrams}g)`;

    setCartItems(prev => [
      ...prev,
      {
        id,
        name: bowl.name,
        price: bowl.price,
        quantity: 1,
        details,
        image: '/src/assets/images/acai_bowl_gourmet_1794356725128.jpg'
      }
    ]);
    setIsCartOpen(true);
  };

  // Update quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove single item
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Experience */}
      <main className="flex-1">
        {/* Hero Section with GSAP ScrollTrigger timeline */}
        <Hero />

        {/* 3D Artisan Studio with Three.js Procedural Gelato and Collapsible Dock */}
        <ThreeGelatoStudio onAddCustomGelato={handleAddCustomGelato} />

        {/* Digital Cardápio with Filter Tabs, Badges & Add to Cart */}
        <MenuSection onAddToCart={handleAddToCart} />

        {/* Interactive Self-Service & Bowl Builder with Live Weigh Scale */}
        <GelatoBuilder onAddCustomBowl={handleAddCustomBowl} />

        {/* Wholesale & Event Party Calculator */}
        <WholesaleCalculator />

        {/* The 4 Pillars of Mestre Sorveteiro & Belo Horizonte Factory */}
        <CraftsmanshipSection />

        {/* Physical Store in Barreiro BH, Hours & Google Maps */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer with WhatsApp Order Integration */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Sticky Quick-Access Floating WhatsApp & Cart Bar on Mobile */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 md:hidden">
        <a
          href="https://wa.me/5531995360314?text=Ol%C3%A1%20Mestre%20Sorveteiro!%20Gostaria%20de%20fazer%20um%20pedido."
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-emerald-500 text-stone-950 rounded-full shadow-xl active:scale-90 transition-transform"
          aria-label="Chamar no WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-3 bg-stone-900 text-amber-400 rounded-full shadow-xl border border-stone-800 active:scale-90 transition-transform"
          aria-label="Abrir carrinho"
        >
          <ShoppingBag className="w-5 h-5" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 text-stone-950 rounded-full text-[10px] font-bold flex items-center justify-center font-mono">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
