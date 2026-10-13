import React from 'react';
import { BsStarFill } from 'react-icons/bs';
import { useCart } from '../context/CartContext';

const DishesCard = ({ dish }) => {
  const { add } = useCart();
  return (
    <article className="group flex w-72 flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <img src={dish.img} alt={dish.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium">{dish.category}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{dish.title}</h3>
          <span className="flex items-center gap-1 text-sm text-amber-500"><BsStarFill />{dish.rating}</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-[#F4511F]">${dish.price.toFixed(2)}</span>
          <button onClick={() => add(dish)} className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-[#F4511F] active:scale-95">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default DishesCard;