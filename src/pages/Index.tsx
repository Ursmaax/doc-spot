
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import SpecialtiesSection from '@/components/home/SpecialtiesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection onBookAppointment={handleBookAppointment} />
        <FeaturesSection />
        <SpecialtiesSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
