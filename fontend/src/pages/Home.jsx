import React from 'react';
import Banner from '../components/Banner';
import Features from '../components/Features';
import ImpactStories from '../components/ImpactStories';

function Home() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <Banner />
      <Features />
      <ImpactStories />
    </div>
  );
}

export default Home;
