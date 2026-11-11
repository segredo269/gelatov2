import React, { useState, useMemo } from 'react';
import { PRODUCTS, Product } from '../data/iceCreamData';
import { Search, Plus, Check, Info, Sparkles, X, ShoppingBag } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (product: Product) => void;
}

export function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Sabores' },
    { id: 'paletas', label: 'Paletas Recheadas' },
    { id: 'picoles-cremosos', label: 'Picolés Cremosos' },
    { id: 'picoles-agua', label: 'Frutas Naturais (Água)' },
    { id: 'sorvetes', label: 'Gelato & Massas' },
    { id: 'acai', label: 'Açaí Especial' },
    { id: 'potes-atacado', label: 'Potes & Revenda' },
    { id: 'sobremesas', label: 'Sobremesas' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      const matchesCat = activeCategory === 'all' || prod.category === activeCategory;
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddClick = (product: Product) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  return (
    <section id="cardapio" className="py-20 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <span>Cardápio Oficial</span>
            <span aria-hidden="true">·</span>
            <span>Produção Própria em BH</span>
            <span aria-hidden="true">·</span>
            <span>Varejo & Atacado</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-4">
            Sabores Criados por Quem Entende de Sorvete
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Picolés de frutas puras, cremosos mineiros, paletas generosamente recheadas, açaí especial e potes industriais para sua casa, festa ou negócio.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Functional Category Segmented Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200/80 rounded-2xl w-full md:w-auto overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-white text-stone-950 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar sabor ou ingrediente..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Products Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
            <p className="text-stone-500 text-sm">Nenhum sabor encontrado para a sua busca.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
            >
              Ver todos os sabores
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map(product => {
              const isAdded = recentlyAddedId === product.id;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Product Image Slot */}
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Subtle Color Accent Tag */}
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-stone-900/85 text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm">
                          {product.badge}
                        </div>
                      )}

                      {/* Quick Details Trigger */}
                      <button
                        onClick={() => setSelectedProductModal(product)}
                        className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/90 text-stone-700 hover:text-stone-950 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
                        title="Ver receita e ingredientes"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      {/* Unboxed Metadata (Zero-Pill discipline) */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium">
                        <span>{product.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.volumeOrWeight}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{product.temperature}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-stone-900 group-hover:text-amber-800 transition-colors mb-2">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                        {product.description}
                      </p>

                      {/* Ingredients Hint */}
                      <div className="text-[11px] text-stone-500 truncate">
                        <span className="font-semibold text-stone-700">Ingredientes: </span>
                        {product.ingredients.join(', ')}
                      </div>
                    </div>
                  </div>

                  {/* Price & Add to Cart Footer */}
                  <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase font-semibold">Valor</div>
                      <div className="text-lg font-bold text-stone-900 font-mono tabular-nums">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddClick(product)}
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all active:scale-95 whitespace-nowrap shrink-0 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-900 text-stone-100 hover:bg-amber-600 hover:text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Adicionado!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Adicionar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative aspect-[16/9]">
              <img
                src={selectedProductModal.image}
                alt={selectedProductModal.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProductModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-900 transition-colors"
                aria-label="Fechar detalhes"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold uppercase tracking-wider mb-1">
                <span>{selectedProductModal.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProductModal.volumeOrWeight}</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900 mb-2">
                {selectedProductModal.name}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {selectedProductModal.description}
              </p>

              <div className="bg-amber-50/60 rounded-xl p-3.5 border border-amber-200/60 mb-4">
                <div className="text-xs font-semibold text-stone-800 mb-1">Composição & Matérias-Primas:</div>
                <div className="text-xs text-stone-600 leading-relaxed">
                  {selectedProductModal.ingredients.join(' · ')}
                </div>
                {selectedProductModal.allergens && (
                  <div className="text-[11px] text-amber-900 mt-2 font-medium">
                    ⚠️ {selectedProductModal.allergens}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Preço Unitário</div>
                  <div className="text-2xl font-bold text-stone-900 font-mono tabular-nums">
                    R$ {selectedProductModal.price.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleAddClick(selectedProductModal);
                    setSelectedProductModal(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar ao Pedido</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
