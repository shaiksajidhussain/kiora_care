import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import RecommendedBy from '@/components/RecommendedBy';
import TheDifferenceWeMake from '@/components/TheDifferenceWeMake';
import HowItWorks from '@/components/HowItWorks';
import Solutions from '@/components/Solutions';
import Technology from '@/components/Technology';
import AboutUs from '@/components/AboutUs';
import AdvisoryBoard from '@/components/AdvisoryBoard';
import Resources from '@/components/Resources';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden">
      <Header />
      
      <main className="w-full flex flex-col overflow-hidden items-center rounded-[25px] mx-4 mt-4 max-w-[calc(100%-32px)] self-center">
        <Hero />
      </main>
      
      <RecommendedBy />
      <TheDifferenceWeMake />
      <HowItWorks />
      <Solutions />
      <Technology />
      <AboutUs />
      <AdvisoryBoard />
      <Resources />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
