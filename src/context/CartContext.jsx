import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const load = () => {
  try { return JSON.parse(localStorage.getItem('myfood-cart')) || []; }
  catch { return []; }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('myfood-cart', JSON.stringify(items)); } catch { /* ignore */ }
  }, [items]);

  const add = (dish) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === dish.id);
      if (found) return prev.map((i) => (i.id === dish.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id: dish.id, title: dish.title, price: dish.price, img: dish.img, qty: 1 }];
    });

  const changeQty = (id, delta) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );

  const clear = () => setItems([]);

  const value = useMemo(() => ({
    items, open, setOpen, add, changeQty, clear,
    count: items.reduce((n, i) => n + i.qty, 0),
    total: items.reduce((n, i) => n + i.qty * i.price, 0),
  }), [items, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};