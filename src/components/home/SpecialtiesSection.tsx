
import React from 'react';
import { Heart, Brain, Eye, Baby, Bone, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SpecialtiesSection = () => {
  const specialties = [
    {
      icon: Heart,
      name: 'Cardiology',
      description: 'Heart and cardiovascular care',
      doctorCount: '89 doctors',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: Brain,
      name: 'Neurology',
      description: 'Brain and nervous system',
      doctorCount: '67 doctors',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Eye,
      name: 'Ophthalmology',
      description: 'Eye care and vision',
      doctorCount: '45 doctors',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Baby,
      name: 'Pediatrics',
      description: 'Children healthcare',
      doctorCount: '78 doctors',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: Bone,
      name: 'Orthopedics',
      description: 'Bone and joint care',
      doctorCount: '56 doctors',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: Stethoscope,
      name: 'General Practice',
      description: 'Primary healthcare',
      doctorCount: '124 doctors',
      color: 'from-green-400 to-green-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-6">
            Medical Specialties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find specialized healthcare professionals across a wide range of medical fields. 
            Our network includes experts in every specialty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {specialties.map((specialty, index) => (
            <div 
              key={index}
              className="glass hover-lift rounded-2xl p-6 group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${specialty.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <specialty.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {specialty.name}
              </h3>
              <p className="text-gray-600 mb-3">
                {specialty.description}
              </p>
              <p className="text-sm text-primary-600 font-medium">
                {specialty.doctorCount} available
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="glass border-white/30 hover:bg-white/20 px-8 py-4 text-lg font-semibold"
          >
            View All Specialties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
