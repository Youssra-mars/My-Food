import React, { useState } from 'react';
import { sendWhatsApp, isValidPhone, RESTAURANT } from '../data/restaurant';

const SLOTS = [];
for (let h = RESTAURANT.hours.open; h < RESTAURANT.hours.close; h++) {
  SLOTS.push(`${String(h).padStart(2, '0')}:00`, `${String(h).padStart(2, '0')}:30`);
}
const today = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
const field = 'mt-1 w-full rounded-xl border bg-white px-4 py-2.5 text-ink outline-none focus:border-brightColor';

const Reservation = () => {
  const [f, setF] = useState({ name: '', phone: '', date: today(), time: SLOTS[2] || SLOTS[0], guests: 2, note: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (f.name.trim().length < 2) err.name = 'Enter your name.';
    if (!isValidPhone(f.phone)) err.phone = 'Enter a valid phone number.';
    if (!f.date || f.date < today()) err.date = 'Choose today or a future date.';
    setErrors(err);
    if (Object.keys(err).length) return;
    sendWhatsApp(
      `Table reservation at ${RESTAURANT.name}\nName: ${f.name}\nPhone: ${f.phone}\nDate: ${f.date}\nTime: ${f.time}\nGuests: ${f.guests}` +
      (f.note ? `\nNote: ${f.note}` : '')
    );
    setSent(true);
  };

  return (
    <section className="bg-gray-50 px-5 py-24 lg:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-extrabold md:text-5xl">Book a table</h2>
          <p className="mt-5 max-w-md text-lg text-gray-600">
            Choose a date, time and party size. Your request opens in WhatsApp and we confirm it with you directly.
          </p>
        </div>

        {sent ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
            <h3 className="text-2xl font-bold">Request ready to send</h3>
            <p className="mt-3 text-gray-600">Press send in WhatsApp. We will confirm your table for {f.guests} on {f.date} at {f.time}.</p>
            <button onClick={() => setSent(false)} className="mt-6 rounded-full border px-6 py-2.5 font-medium hover:border-brightColor">Make another reservation</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl bg-white p-6 shadow-lg sm:grid-cols-2 md:p-8">
            <label className="text-sm font-medium">Name<input className={field} value={f.name} onChange={set('name')} autoComplete="name" />
              {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}</label>
            <label className="text-sm font-medium">Phone<input className={field} value={f.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
              {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}</label>
            <label className="text-sm font-medium">Date<input type="date" min={today()} className={field} value={f.date} onChange={set('date')} />
              {errors.date && <span className="text-xs text-red-600">{errors.date}</span>}</label>
            <label className="text-sm font-medium">Time
              <select className={field} value={f.time} onChange={set('time')}>{SLOTS.map((s) => <option key={s}>{s}</option>)}</select></label>
            <label className="text-sm font-medium">Guests
              <select className={field} value={f.guests} onChange={set('guests')}>{[...Array(10)].map((_, n) => <option key={n} value={n + 1}>{n + 1}</option>)}</select></label>
            <label className="text-sm font-medium sm:col-span-2">Note (optional)<textarea rows="2" className={field} value={f.note} onChange={set('note')} /></label>
            <button type="submit" className="rounded-full bg-brightColor py-3 font-semibold text-white hover:brightness-110 sm:col-span-2">Request this table</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Reservation;