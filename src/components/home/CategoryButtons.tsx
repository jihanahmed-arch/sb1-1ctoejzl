import React from 'react';
import { ShoppingBag, Heart, Sparkles } from 'lucide-react';

interface Category {
  icon: React.ReactNode;
  name: string;
  link: string;
  color: string;
}

const categories: Category[] = [
  {
    icon: <ShoppingBag size={24} />,
    name: 'Clothes',
    link: '/category/clothes',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    icon: <Sparkles size={24} />,
    name: 'Cosmetics',
    link: '/category/cosmetics',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: <Heart size={24} />,
    name: 'Jewelry',
    link: '/category/jewelry',
    color: 'bg-rose-100 text-rose-600'
  }
];

const CategoryButtons: React.FC = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className={`flex flex-col items-center p-6 rounded-xl ${category.color} hover:shadow-md transition-shadow duration-300 w-36`}
            >
              <div className="mb-3">
                {category.icon}
              </div>
              <span className="font-medium">{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryButtons;