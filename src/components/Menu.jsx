import React from "react";
import DishesCard from '../layouts/DishesCard';
import { DISHES } from '../data/dishes';

const Menu = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
            <h1 className="text-4xl font-semibold text-center lg:pt-8 pt-24 pb-10">Premium Menu</h1>
            <div className="flex flex-wrap gap-8 justify-center">
                {DISHES.slice(0, 3).map((d) => (
                    <DishesCard key={d.id} dish={d} />
                ))}
            </div>
        </div>
    );
};

export default Menu;