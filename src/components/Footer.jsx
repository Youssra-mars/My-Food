import React from 'react';
import { Link } from 'react-scroll';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { RESTAURANT } from '../data/restaurant';

const LINKS = [['dishes', 'Dishes'], ['about', 'About'], ['menu', 'Menu'], ['reservation', 'Reservation'], ['review', 'Reviews'], ['contact', 'Contact']];

const Footer = () => (
  <footer className="bg-ink text-white">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-10">
      <div>
        <h2 className="text-2xl font-bold text-brightColor">{RESTAURANT.name}</h2>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">Fast food made with care. Order online or book your table in a few taps.</p>
        <div className="mt-5 flex gap-3">
          {[[FaInstagram, RESTAURANT.social.instagram, 'Instagram'], [FaFacebookF, RESTAURANT.social.facebook, 'Facebook'], [FaWhatsapp, `https://wa.me/${RESTAURANT.whatsapp}`, 'WhatsApp']].map(([Icon, href, label]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="rounded-full border border-white/20 p-3 transition hover:bg-brightColor"><Icon /></a>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-bold">Quick links</h3>
        <nav className="grid grid-cols-2 gap-2 text-gray-300">
          {LINKS.map(([to, label]) => (
            <Link key={to} to={to} smooth offset={-70} duration={500} className="cursor-pointer transition hover:text-brightColor">{label}</Link>
          ))}
        </nav>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-bold">Contact</h3>
        <div className="space-y-2 text-gray-300">
          <p><a href={`tel:${RESTAURANT.phone.replace(/\s/g, '')}`} className="hover:text-brightColor">{RESTAURANT.phone}</a></p>
          <p><a href={`mailto:${RESTAURANT.email}`} className="hover:text-brightColor">{RESTAURANT.email}</a></p>
          <p>{RESTAURANT.address}</p>
        </div>
      </div>
    </div>
    <p className="border-t border-white/10 py-5 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} {RESTAURANT.name}. Developed by <span className="text-brightColor">Youssra Mars</span>. All rights reserved.
    </p>
  </footer>
);

export default Footer;