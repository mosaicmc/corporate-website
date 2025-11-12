import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import SimpleCTA from '../components/SimpleCTA';

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Mosaic Multicultural Connections | Support for NSW Communities</title>
        <meta
          name="description"
          content="Empowering multicultural communities across New South Wales through settlement support, aged care, family services, and community engagement."
        />
      </Helmet>
      <Hero />
      <ServiceCards />
      <Statistics />
      <Testimonials />
      <SimpleCTA />
    </div>
  );
};

export default HomePage;