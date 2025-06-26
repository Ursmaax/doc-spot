
import React from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Baby, Bone, Eye, Ear, Scissors, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpecialtiesPage = () => {
  const specialties = [
    {
      icon: Heart,
      name: 'Cardiology',
      description: 'Heart and cardiovascular system specialists for comprehensive cardiac care.',
      doctorCount: 45,
      averageRating: 4.8,
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Brain,
      name: 'Neurology',
      description: 'Brain and nervous system experts for neurological conditions and disorders.',
      doctorCount: 32,
      averageRating: 4.9,
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Baby,
      name: 'Pediatrics',
      description: 'Specialized care for infants, children, and adolescents up to 18 years.',
      doctorCount: 67,
      averageRating: 4.7,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Bone,
      name: 'Orthopedics',
      description: 'Bone, joint, and musculoskeletal system specialists for mobility issues.',
      doctorCount: 38,
      averageRating: 4.6,
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: Eye,
      name: 'Ophthalmology',
      description: 'Eye care specialists for vision problems and eye-related conditions.',
      doctorCount: 29,
      averageRating: 4.8,
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Ear,
      name: 'ENT',
      description: 'Ear, nose, and throat specialists for respiratory and hearing issues.',
      doctorCount: 24,
      averageRating: 4.7,
      gradient: 'from-teal-500 to-green-500'
    },
    {
      icon: Scissors,
      name: 'Surgery',
      description: 'Surgical specialists across various fields for operative procedures.',
      doctorCount: 41,
      averageRating: 4.9,
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: Pill,
      name: 'Internal Medicine',
      description: 'General internal medicine for adult primary and specialized care.',
      doctorCount: 56,
      averageRating: 4.5,
      gradient: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <Header />
      
      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8 animate-fade-in">
              Medical Specialties
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              Find the right specialist for your healthcare needs. Our network includes 
              top-rated doctors across all major medical specialties.
            </p>
          </div>
        </section>

        {/* Specialties Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {specialties.map((specialty, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${specialty.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <specialty.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{specialty.name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{specialty.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span>{specialty.doctorCount} doctors</span>
                    <span>★ {specialty.averageRating} rating</span>
                  </div>
                  
                  <Link to="/doctors">
                    <Button className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                      Find Doctors
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-violet-500 to-blue-500 rounded-3xl p-12 text-white text-center shadow-xl animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">Can't Find Your Specialty?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                We're constantly expanding our network of healthcare providers. 
                Contact us to request a specific specialty or doctor.
              </p>
              <Link to="/contact">
                <Button className="bg-white text-violet-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SpecialtiesPage;
