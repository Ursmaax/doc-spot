
import React from 'react';
import { Search, Calendar, Video, FileText, Bell, Shield } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Doctor Search',
      description: 'Find the perfect healthcare provider using our advanced search with filters for specialty, location, availability, and patient reviews.',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      icon: Calendar,
      title: 'Instant Booking',
      description: 'Book appointments in real-time with interactive calendar integration. See available slots and confirm instantly.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Video,
      title: 'Telemedicine Ready',
      description: 'Connect with doctors remotely through secure video consultations. Healthcare from the comfort of your home.',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: FileText,
      title: 'Digital Records',
      description: 'Access all your medical records, prescriptions, and appointment history in one secure, organized digital space.',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Never miss an appointment with automated reminders via email, SMS, and push notifications.',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Your health data is protected with enterprise-grade security and full HIPAA compliance standards.',
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
            Why Choose DocSpot?
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing healthcare with cutting-edge technology, 
            making it easier than ever to connect with the right healthcare professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-xl hover:bg-white/90 hover:scale-105 transition-all duration-300 rounded-3xl p-10 group animate-fade-in shadow-xl border border-white/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
