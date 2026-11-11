import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  details?: string;
  image?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [deliveryType, setDeliveryType] = useState<'retirada' | 'entrega'>('retirada');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const deliveryFee = deliveryType === 'entrega' ? 12.00 : 0.00;
  const total = subtotal + deliveryFee;

  const handleCheckoutWhatsApp = () => {
    let message = `🍨 *NOVO PEDIDO - MESTRE SORVETEIRO*\n\n`;
    if (customerName) message += `*Cliente:* ${customerName}\n`;
    message += `*Tipo de Retirada/Entrega:* ${deliveryType === 'retirada' ? 'Retirada na Loja do Barreiro' : 'Entrega em Domicílio (BH)'}\n`;
    if (deliveryType === 'entrega' && customerAddress) {
      message += `*Endereço:* ${customerAddress}\n`;
    }
    message += `\n*ITENS DO PEDIDO:*\n`;

    items.forEach((it, idx) => {
      message += `${idx + 1}. ${it.quantity}x ${it.name} - R$ ${(it.price * it.quantity).toFixed(2).replace('.', ',')}\n`;
      if (it.details) {
        message += `   ↳ _${it.details}_\n`;
      }
    });

    message += `\n*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (deliveryType === 'entrega') {
      message += `\n*Taxa de Entrega estimada:* R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;
    }
    message += `\n*TOTAL:* R$ ${total.toFixed(2).replace('.', ',')}\n`;

    if (orderNotes) {
      message += `\n*Observações:* ${orderNotes}\n`;
    }

    message += `\nOlá! Gostaria de confirmar a disponibilidade e o prazo de entrega.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5531995360314?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <h2 className="text-lg font-bold font-serif text-stone-900">
                Seu Pedido ({items.reduce((acc, it) => acc + it.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-stone-400">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1 mb-3 text-stone-300" />
                <p className="text-sm font-medium text-stone-600 mb-1">Seu carrinho está vazio.</p>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Adicione delícias do nosso cardápio ou personalize uma taça no Studio 3D!
                </p>
              </div>
            ) : (
              <>
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 p-3.5 rounded-2xl border border-stone-200/90 bg-stone-50/50"
                  >
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-stone-900 leading-snug">{item.name}</h4>
                      {item.details && (
                        <p className="text-[11px] text-stone-500 mt-0.5 leading-tight">{item.details}</p>
                      )}
                      <div className="text-xs font-mono font-semibold text-amber-800 mt-1 tabular-nums">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-stone-600 hover:bg-stone-100 transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold text-stone-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-stone-600 hover:bg-stone-100 transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Delivery Options Form */}
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <label className="block text-xs uppercase tracking-wider text-stone-500 font-semibold">
                    Forma de Entrega:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDeliveryType('retirada')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        deliveryType === 'retirada'
                          ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-600'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <div>Retirada na Loja</div>
                      <div className="text-[10px] text-stone-500 font-normal">Barreiro (Grátis)</div>
                    </button>

                    <button
                      onClick={() => setDeliveryType('entrega')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        deliveryType === 'entrega'
                          ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-600'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <div>Entrega em Domicílio</div>
                      <div className="text-[10px] text-stone-500 font-normal">Grande BH (+R$ 12,00)</div>
                    </button>
                  </div>

                  {/* Customer Details Inputs */}
                  <div className="space-y-2 pt-2">
                    <input
                      type="text"
                      placeholder="Seu Nome Completo"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />

                    {deliveryType === 'entrega' && (
                      <input
                        type="text"
                        placeholder="Endereço de Entrega (Rua, Número, Bairro, BH)"
                        value={customerAddress}
                        onChange={e => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    )}

                    <input
                      type="text"
                      placeholder="Observações (ex: troco para 50, colheres extras...)"
                      value={orderNotes}
                      onChange={e => setOrderNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal dos itens:</span>
                  <span className="font-mono font-semibold text-stone-900 tabular-nums">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                {deliveryType === 'entrega' && (
                  <div className="flex justify-between">
                    <span>Taxa de Entrega (estimada):</span>
                    <span className="font-mono font-semibold text-stone-900 tabular-nums">
                      R$ {deliveryFee.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total:</span>
                  <span className="font-mono text-amber-800 tabular-nums">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs text-stone-950 bg-emerald-500 hover:bg-emerald-400 transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmar Pedido via WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
