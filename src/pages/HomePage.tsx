import React from 'react';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import SimpleCTA from '../components/SimpleCTA';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServiceCards />
      <Statistics />
      <Testimonials />
      <SimpleCTA />
    </div>
  );
};

export default HomePage;