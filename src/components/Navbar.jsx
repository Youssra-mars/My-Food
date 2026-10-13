import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { BiRestaurant } from 'react-icons/bi';
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from '../context/CartContext';

const LINKS = [['home', 'Home'], ['about', 'About'], ['dishes', 'Dishes'], ['reservation', 'Reservation'], ['review', 'Reviews'], ['contact', 'Contact']];
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { count, setOpen: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const light = solid || open;

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${light ? 'bg-white/95 text-ink shadow-md backdrop-blur' : 'bg-transparent text-white'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <Link to="home" smooth duration={500} className="flex cursor-pointer items-center gap-2">
          <BiRestaurant size={30} className="text-brightColor" />
          <span className="font-display text-xl font-bold">My Food</span>
        </Link>

        <nav className="hidden items-center gap-8 font-medium md:flex">
          {LINKS.map(([to, label]) => (
            <Link key={to} to={to} spy smooth offset={-70} duration={500}
              activeClass="!text-brightColor" className="cursor-pointer transition hover:text-brightColor">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Open cart" onClick={() => openCart(true)} className="relative">
            <AiOutlineShoppingCart size={26} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brightColor text-xs font-bold text-white">{count}</span>
            )}
          </button>
          <button aria-label="Toggle menu" className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t bg-white px-5 pb-5 pt-2 text-lg font-medium text-ink md:hidden">
          {LINKS.map(([to, label]) => (
            <Link key={to} to={to} smooth offset={-70} duration={500} onClick={() => setOpen(false)} className="cursor-pointer py-2 hover:text-brightColor">
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;