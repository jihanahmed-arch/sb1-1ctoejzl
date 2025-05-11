import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewArrivals from '../components/home/NewArrivals';
import CategoryButtons from '../components/home/CategoryButtons';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <CategoryButtons />
      <FeaturedProducts />
      <NewArrivals />
    </div>
  );
};

export default Home;