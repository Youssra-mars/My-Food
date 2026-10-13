import React, { useState } from 'react';
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus, AiOutlineArrowLeft } from 'react-icons/ai';
import { useCart } from '../context/CartContext';
import { sendWhatsApp, isValidPhone, RESTAURANT } from '../data/restaurant';

const field = 'w-full rounded-xl border px-4 py-2.5 outline-none focus:border-brightColor';

const CartDrawer = () => {
  const { items, open, setOpen, changeQty, clear, total } = useCart();
  const [step, setStep] = useState('cart');
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [f, setF] = useState({ type: 'pickup', name: '', phone: '', address: '', note: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const close = () => { setOpen(false); setTimeout(() => { setStep('cart'); setDone(false); }, 300); };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (f.name.trim().length < 2) err.name = 'Enter your name.';
    if (!isValidPhone(f.phone)) err.phone = 'Enter a valid phone number.';
    if (f.type === 'delivery' && f.address.trim().length < 5) err.address = 'Enter your delivery address.';
    setErrors(err);
    if (Object.keys(err).length) return;

    const lines = items.map((i) => `- ${i.qty} x ${i.title} ($${(i.qty * i.price).toFixed(2)})`).join('\n');
    sendWhatsApp(
      `New order for ${RESTAURANT.name}\n${lines}\nTotal: $${total.toFixed(2)}\n\n` +
      `Type: ${f.type === 'pickup' ? 'Pickup' : 'Delivery'}\nName: ${f.name}\nPhone: ${f.phone}` +
      (f.type === 'delivery' ? `\nAddress: ${f.address}` : '') + (f.note ? `\nNote: ${f.note}` : '')
    );
    clear(); setDone(true);
  };

  return (
    <>
      <div onClick={close} className={`fixed inset-0 z-[60] bg-black/50 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside aria-hidden={!open} className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-3">
            {step === 'checkout' && !done && <button aria-label="Back to cart" onClick={() => setStep('cart')}><AiOutlineArrowLeft size={20} /></button>}
            <h2 className="text-xl font-bold">{step === 'cart' ? 'Your order' : 'Checkout'}</h2>
          </div>
          <button aria-label="Close cart" onClick={close}><AiOutlineClose size={22} /></button>
        </div>

        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <h3 className="text-2xl font-bold">Order ready to send</h3>
            <p className="text-gray-600">WhatsApp opened with your order. Press send there and we will confirm it.</p>
            <button onClick={close} className="mt-4 rounded-full bg-brightColor px-6 py-2.5 font-semibold text-white">Close</button>
          </div>
        ) : step === 'cart' ? (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.length === 0 && <p className="mt-10 text-center text-gray-500">Your cart is empty. Add a dish to get started.</p>}
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-4">
                  <img src={i.img} alt={i.title} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1"><p className="font-medium">{i.title}</p><p className="text-sm text-gray-500">${i.price.toFixed(2)}</p></div>
                  <div className="flex items-center gap-2">
                    <button aria-label="Remove one" onClick={() => changeQty(i.id, -1)} className="rounded-full border p-1 hover:border-brightColor"><AiOutlineMinus /></button>
                    <span className="w-5 text-center">{i.qty}</span>
                    <button aria-label="Add one" onClick={() => changeQty(i.id, 1)} className="rounded-full border p-1 hover:border-brightColor"><AiOutlinePlus /></button>
                  </div>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <div className="space-y-3 border-t p-5">
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
                <button onClick={() => setStep('checkout')} className="w-full rounded-full bg-brightColor py-3 font-semibold text-white hover:brightness-110">Continue to checkout</button>
                <button onClick={clear} className="w-full text-sm text-gray-500 hover:text-black">Clear cart</button>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
            <div className="grid grid-cols-2 gap-2">
              {['pickup', 'delivery'].map((t) => (
                <button type="button" key={t} onClick={() => setF({ ...f, type: t })}
                  className={`rounded-xl border py-2.5 font-medium capitalize ${f.type === t ? 'border-brightColor bg-brightColor text-white' : ''}`}>{t}</button>
              ))}
            </div>
            <label className="text-sm font-medium">Name<input className={field} value={f.name} onChange={set('name')} autoComplete="name" />
              {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}</label>
            <label className="text-sm font-medium">Phone<input className={field} value={f.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
              {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}</label>
            {f.type === 'delivery' && (
              <label className="text-sm font-medium">Delivery address<input className={field} value={f.address} onChange={set('address')} autoComplete="street-address" />
                {errors.address && <span className="text-xs text-red-600">{errors.address}</span>}</label>
            )}
            <label className="text-sm font-medium">Note (optional)<textarea className={field} rows="2" value={f.note} onChange={set('note')} /></label>
            <div className="mt-auto flex justify-between text-lg font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button type="submit" className="rounded-full bg-brightColor py-3 font-semibold text-white hover:brightness-110">Send order on WhatsApp</button>
          </form>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;