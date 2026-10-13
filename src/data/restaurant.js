// EDIT THIS FILE with your real restaurant information
export const RESTAURANT = {
  name: 'My Food',
  phone: '+216 90 524 963',
  whatsapp: '21690524963', // international format, digits only
  email: 'MyFood@gmail.com',
  address: 'Tunis, Tunisia', // put your street address here
  mapQuery: 'Tunis, Tunisia', // what Google Maps should search for
  timeZone: 'Africa/Tunis',
  // [open hour, close hour] in 24h format, same for every day. Change as needed.
  hours: { open: 11, close: 23 },
  social: { instagram: 'https://instagram.com/', facebook: 'https://facebook.com/' },
};

export const sendWhatsApp = (text) =>
  window.open(`https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');

export const isValidPhone = (v) => /^\+?[\d\s]{8,15}$/.test(v.trim());

export const isOpenNow = () => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: RESTAURANT.timeZone }));
  const h = now.getHours() + now.getMinutes() / 60;
  return h >= RESTAURANT.hours.open && h < RESTAURANT.hours.close;
};