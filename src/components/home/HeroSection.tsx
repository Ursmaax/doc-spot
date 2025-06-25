
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Shield, Clock, Users, Award } from 'lucide-react';

interface HeroSectionProps {
  onBookAppointment: () => void;
}

const HeroSection = ({ onBookAppointment }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-200 rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-accent-200 rounded-full opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary-300 rounded-full opacity-40 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-primary bg-clip-text text-transparent leading-tight">
              Your Health,
              <br />
              Our Priority
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Book appointments with top-rated doctors instantly. Modern healthcare made simple,
              secure, and accessible for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={onBookAppointment}
                size="lg"
                className="gradient-primary text-white hover:shadow-xl hover:scale-105 transition-all px-8 py-4 text-lg font-semibold"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="glass border-white/30 hover:bg-white/20 px-8 py-4 text-lg font-semibold"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Doctors
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
            <div className="glass hover-lift rounded-2xl p-6 text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">50K+</h3>
              <p className="text-gray-600">Happy Patients</p>
            </div>

            <div className="glass hover-lift rounded-2xl p-6 text-center">
              <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">1,200+</h3>
              <p className="text-gray-600">Expert Doctors</p>
            </div>

            <div className="glass hover-lift rounded-2xl p-6 text-center">
              <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">24/7</h3>
              <p className="text-gray-600">Support Available</p>
            </div>

            <div className="glass hover-lift rounded-2xl p-6 text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">100%</h3>
              <p className="text-gray-600">Secure & Private</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
