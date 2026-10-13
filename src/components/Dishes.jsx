import React, { useMemo, useState } from 'react';
import DishesCard from '../layouts/DishesCard';
import { DISHES, CATEGORIES } from '../data/dishes';

const Dishes = () => {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');

  const list = useMemo(() => {
    let out = DISHES.filter(
      (d) => (category === 'All' || d.category === category) &&
             d.title.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (sort === 'low') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'high') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [category, query, sort]);

  return (
    <div className="flex min-h-screen flex-col items-center px-5 pb-16 pt-24 lg:px-32">
      <h1 className="pb-8 text-4xl font-semibold">Our Dishes</h1>

      <div className="mb-10 flex w-full flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${category === c ? 'border-[#F4511F] bg-[#F4511F] text-white' : 'hover:border-[#F4511F]'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a dish"
            aria-label="Search a dish"
            className="rounded-full border px-4 py-2 text-sm outline-none focus:border-[#F4511F]"
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort dishes" className="rounded-full border px-3 py-2 text-sm">
            <option value="default">Sort by</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="text-gray-500">No dish matches your search. Try another word or category.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {list.map((d) => <DishesCard key={d.id} dish={d} />)}
        </div>
      )}
    </div>
  );
};

export default Dishes;