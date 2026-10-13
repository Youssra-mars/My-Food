import React, { useEffect, useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import pic1 from '../assets/img/pic1.jpg';
import pic2 from '../assets/img/pic2.jpg';
import pic3 from '../assets/img/pic3.jpg';

// Replace these with real customer reviews
const REVIEWS = [
  { img: pic1, name: 'K. Mohamed', text: 'The menu has so many tasty options, and everything is made with care. Great for dine-in and takeout.' },
  { img: pic2, name: 'M. Lina', text: 'Fast, hot and full of flavor. The crispy dishes are my favorite, and ordering takes seconds.' },
  { img: pic3, name: 'B. Ahmed', text: 'Friendly team and generous portions. My Food never disappoints.' },
];

const Review = () => {
  const [i, setI] = useState(0);
  const go = (d) => setI((n) => (n + d + REVIEWS.length) % REVIEWS.length);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % REVIEWS.length), 6000);
    return () => clearInterval(id);
  }, [i]);

  const r = REVIEWS[i];

  return (
    <section className="bg-ink px-5 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold md:text-5xl">What our customers say</h2>

        <div className="mt-12 min-h-[18rem]" aria-live="polite">
          <img src={r.img} alt={r.name} className="mx-auto h-24 w-24 rounded-full border-4 border-brightColor object-cover" />
          <div className="mt-4 flex justify-center gap-1 text-sun">
            {[...Array(5)].map((_, n) => <BsStarFill key={n} />)}
          </div>
          <p className="mt-5 text-xl leading-relaxed text-white/90">{r.text}</p>
          <p className="mt-4 font-display font-bold text-brightColor">{r.name}</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-5">
          <button aria-label="Previous review" onClick={() => go(-1)} className="rounded-full border border-white/30 p-3 transition hover:bg-brightColor"><AiOutlineLeft /></button>
          <div className="flex gap-2">
            {REVIEWS.map((_, n) => (
              <button key={n} aria-label={`Review ${n + 1}`} onClick={() => setI(n)} className={`h-2 rounded-full transition-all ${n === i ? 'w-6 bg-brightColor' : 'w-2 bg-white/30'}`} />
            ))}
          </div>
          <button aria-label="Next review" onClick={() => go(1)} className="rounded-full border border-white/30 p-3 transition hover:bg-brightColor"><AiOutlineRight /></button>
        </div>
      </div>
    </section>
  );
};

export default Review;