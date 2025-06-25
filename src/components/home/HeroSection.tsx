
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Shield, Clock, Users, Award } from 'lucide-react';

interface HeroSectionProps {
  onBookAppointment: () => void;
}

const HeroSection = ({ onBookAppointment }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-100 via-blue-100 to-cyan-100">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full opacity-70 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-80 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-50 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              Your Health,
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
              Book appointments with top-rated doctors instantly. Modern healthcare made simple,
              secure, and accessible for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                onClick={onBookAppointment}
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white hover:shadow-2xl hover:scale-105 transition-all px-12 py-6 text-xl font-bold rounded-2xl shadow-xl"
              >
                <Calendar className="w-6 h-6 mr-3" />
                Book Appointment
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/80 backdrop-blur-xl border-2 border-white/30 hover:bg-white/90 px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Search className="w-6 h-6 mr-3" />
                Find Doctors
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-xl hover:bg-white/90 hover:scale-105 transition-all duration-300 rounded-3xl p-8 text-center shadow-xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">50K+</h3>
              <p className="text-gray-700 font-semibold text-lg">Happy Patients</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl hover:bg-white/90 hover:scale-105 transition-all duration-300 rounded-3xl p-8 text-center shadow-xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">1,200+</h3>
              <p className="text-gray-700 font-semibold text-lg">Expert Doctors</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl hover:bg-white/90 hover:scale-105 transition-all duration-300 rounded-3xl p-8 text-center shadow-xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">24/7</h3>
              <p className="text-gray-700 font-semibold text-lg">Support Available</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl hover:bg-white/90 hover:scale-105 transition-all duration-300 rounded-3xl p-8 text-center shadow-xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">100%</h3>
              <p className="text-gray-700 font-semibold text-lg">Secure & Private</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
