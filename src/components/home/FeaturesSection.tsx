
import React from 'react';
import { Search, Calendar, Video, FileText, Bell, Shield } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Doctor Search',
      description: 'Find the perfect healthcare provider using our advanced search with filters for specialty, location, availability, and patient reviews.',
      gradient: 'gradient-primary'
    },
    {
      icon: Calendar,
      title: 'Instant Booking',
      description: 'Book appointments in real-time with interactive calendar integration. See available slots and confirm instantly.',
      gradient: 'gradient-secondary'
    },
    {
      icon: Video,
      title: 'Telemedicine Ready',
      description: 'Connect with doctors remotely through secure video consultations. Healthcare from the comfort of your home.',
      gradient: 'gradient-accent'
    },
    {
      icon: FileText,
      title: 'Digital Records',
      description: 'Access all your medical records, prescriptions, and appointment history in one secure, organized digital space.',
      gradient: 'gradient-primary'
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Never miss an appointment with automated reminders via email, SMS, and push notifications.',
      gradient: 'gradient-secondary'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Your health data is protected with enterprise-grade security and full HIPAA compliance standards.',
      gradient: 'gradient-accent'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-6">
            Why Choose DocSpot?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing healthcare with cutting-edge technology, 
            making it easier than ever to connect with the right healthcare professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass hover-lift rounded-2xl p-8 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
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
