import React, { useEffect, useState } from 'react';
import { AiOutlinePhone, AiOutlineMail, AiOutlineEnvironment, AiOutlineClockCircle } from 'react-icons/ai';
import { RESTAURANT, isOpenNow } from '../data/restaurant';

const pad = (h) => `${String(h).padStart(2, '0')}:00`;

const Contact = () => {
  const [open, setOpen] = useState(isOpenNow());
  useEffect(() => {
    const id = setInterval(() => setOpen(isOpenNow()), 60000);
    return () => clearInterval(id);
  }, []);

  const rows = [
    [AiOutlinePhone, 'Phone', RESTAURANT.phone, `tel:${RESTAURANT.phone.replace(/\s/g, '')}`],
    [AiOutlineMail, 'Email', RESTAURANT.email, `mailto:${RESTAURANT.email}`],
    [AiOutlineEnvironment, 'Address', RESTAURANT.address, `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT.mapQuery)}`],
  ];

  return (
    <section className="bg-white px-5 py-24 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-extrabold md:text-5xl">Visit us</h2>
          <p className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <span className={`h-2 w-2 rounded-full ${open ? 'bg-green-600' : 'bg-red-600'}`} />
            {open ? 'Open now' : 'Closed now'}
          </p>
          <ul className="mt-8 space-y-5">
            <li className="flex gap-4">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brightColor/10 text-brightColor"><AiOutlineClockCircle size={24} /></span>
              <div><h3 className="font-bold">Opening hours</h3><p className="text-gray-600">Every day, {pad(RESTAURANT.hours.open)} to {pad(RESTAURANT.hours.close)}</p></div>
            </li>
            {rows.map(([Icon, label, value, href]) => (
              <li key={label} className="flex gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brightColor/10 text-brightColor"><Icon size={24} /></span>
                <div><h3 className="font-bold">{label}</h3><a href={href} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-brightColor">{value}</a></div>
              </li>
            ))}
          </ul>
        </div>
        <iframe title="Restaurant location" loading="lazy" className="h-96 w-full rounded-3xl border-0 shadow-lg lg:h-full"
          src={`https://www.google.com/maps?q=${encodeURIComponent(RESTAURANT.mapQuery)}&output=embed`} />
      </div>
    </section>
  );
};

export default Contact;