import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { BsStarFill } from 'react-icons/bs';
import bg from '../assets/img/bg.jpg';
import { DISHES, CATEGORIES } from '../data/dishes';
import { useCart } from '../context/CartContext';

const FEATURED = [...DISHES].sort((a, b) => b.rating - a.rating).slice(0, 4);
const AVG = DISHES.reduce((n, d) => n + d.rating, 0) / DISHES.length;

const CountUp = ({ to, decimals = 0 }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 1200, 1);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v.toFixed(decimals)}</>;
};

const Home = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const { add } = useCart();

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % FEATURED.length), 4500);
    return () => clearInterval(id);
  }, [paused]);

  const dish = FEATURED[i];

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-10 pt-32 lg:grid-cols-2 lg:px-10">
        <div className="max-w-xl text-white">
          <h1 className="text-5xl font-extrabold leading-[1.05] md:text-6xl">
            Fast food, made like it matters.
          </h1>
          <p className="mt-5 text-lg text-white/80">
            Crispy fries, juicy burgers and bold flavors, ready when you are. Pick your dishes and send your order in one tap.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="dishes" smooth offset={-70} duration={600}
              className="cursor-pointer rounded-full bg-brightColor px-7 py-3 font-semibold transition hover:brightness-110">
              Order now
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative h-64 overflow-hidden">
              {FEATURED.map((d, n) => (
                <img key={d.id} src={d.img} alt={d.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`} />
              ))}
              <span className="absolute left-4 top-4 rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink">Top rated</span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold">{dish.title}</h3>
                <span className="flex items-center gap-1 text-sm font-medium text-amber-500"><BsStarFill />{dish.rating}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-brightColor">${dish.price.toFixed(2)}</span>
                <button onClick={() => add(dish)} className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition hover:bg-brightColor active:scale-95">
                  Add to cart
                </button>
              </div>
              <div className="mt-5 flex justify-center gap-2">
                {FEATURED.map((d, n) => (
                  <button key={d.id} aria-label={`Show ${d.title}`} onClick={() => setI(n)}
                    className={`h-2 rounded-full transition-all ${n === i ? 'w-6 bg-brightColor' : 'w-2 bg-gray-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-auto w-full max-w-7xl px-5 pb-8 lg:px-10">
        <div className="grid grid-cols-3 divide-x divide-white/20 rounded-2xl bg-white/10 py-5 text-center text-white backdrop-blur">
          <div><p className="font-display text-3xl font-bold"><CountUp to={DISHES.length} /></p><p className="text-sm text-white/70">Dishes</p></div>
          <div><p className="font-display text-3xl font-bold"><CountUp to={AVG} decimals={1} /></p><p className="text-sm text-white/70">Average rating</p></div>
          <div><p className="font-display text-3xl font-bold"><CountUp to={CATEGORIES.length - 1} /></p><p className="text-sm text-white/70">Flavor styles</p></div>
        </div>
      </div>
    </div>
  );
};

export default Home;