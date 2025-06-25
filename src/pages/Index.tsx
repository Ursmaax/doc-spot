
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import AuthModal from '@/components/auth/AuthModal';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import SpecialtiesSection from '@/components/home/SpecialtiesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login');

  const handleAuthClick = (type: 'login' | 'register') => {
    setAuthModalType(type);
    setIsAuthModalOpen(true);
  };

  const handleBookAppointment = () => {
    setAuthModalType('register');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onAuthClick={handleAuthClick} />
      
      <main>
        <HeroSection onBookAppointment={handleBookAppointment} />
        <FeaturesSection />
        <SpecialtiesSection />
        <TestimonialsSection />
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalType}
      />
    </div>
  );
};

export default Index;
