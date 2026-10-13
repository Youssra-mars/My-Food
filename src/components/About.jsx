import React from 'react';
import { Link } from 'react-scroll';
import { AiOutlineThunderbolt, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import img from '../assets/img/img.png';
import Button from '../layouts/Button';

const POINTS = [
  [AiOutlineThunderbolt, 'Quick and convenient', 'Great food without the wait.'],
  [AiOutlineHeart, 'Made with love', 'Every plate is prepared with care.'],
  [AiOutlineStar, 'High quality', 'Crispy fries, juicy burgers, flavorful dishes.'],
];

const About = () => (
  <section id="about" className="bg-white px-5 py-24 lg:px-10">
    <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
      <div className="relative flex justify-center">
        <div className="absolute h-72 w-72 rounded-full bg-sun/30 blur-2xl" />
        <img src={img} alt="About My Food" className="relative w-full max-w-md object-contain" />
      </div>
      <div>
        <h2 className="text-4xl font-extrabold md:text-5xl">Why choose us?</h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">
          My Food is a fast food restaurant built around one idea: friendly service and food that is worth coming back for.
        </p>
        <ul className="mt-8 space-y-5">
          {POINTS.map(([Icon, title, text]) => (
            <li key={title} className="flex gap-4">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brightColor/10 text-brightColor"><Icon size={24} /></span>
              <div><h3 className="text-lg font-bold">{title}</h3><p className="text-gray-600">{text}</p></div>
            </li>
          ))}
        </ul>
        <Link to="dishes" smooth offset={-70} duration={600} className="mt-8 inline-block cursor-pointer">
          <Button title="Explore our dishes" />
        </Link>
      </div>
    </div>
  </section>
);

export default About;