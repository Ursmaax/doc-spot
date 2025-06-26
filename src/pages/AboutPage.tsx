
import React from 'react';
import Header from '@/components/layout/Header';
import { useState } from 'react';
import { Heart, Users, Award, Clock, Shield, Stethoscope } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: Users, value: '50,000+', label: 'Happy Patients' },
    { icon: Stethoscope, value: '1,200+', label: 'Expert Doctors' },
    { icon: Award, value: '98%', label: 'Success Rate' },
    { icon: Clock, value: '24/7', label: 'Support Available' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'We put patients first, ensuring every interaction is compassionate, respectful, and focused on your well-being.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your health information is protected with enterprise-grade security and full HIPAA compliance.'
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Our platform connects you with verified, experienced healthcare professionals across all specialties.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards of care through continuous monitoring and feedback systems.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <Header />
      
      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8 animate-fade-in">
              About DocSpot
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              We're revolutionizing healthcare by making quality medical care accessible, 
              convenient, and connected for everyone.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/20 animate-fade-in">
                <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
                  To bridge the gap between patients and healthcare providers through innovative technology, 
                  creating a seamless, secure, and patient-focused healthcare experience that empowers 
                  individuals to take control of their health journey.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:scale-105 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-violet-500 to-blue-500 rounded-3xl p-12 text-white shadow-xl animate-fade-in">
                <h2 className="text-4xl font-bold text-center mb-8">Our Story</h2>
                <div className="space-y-6 text-lg leading-relaxed">
                  <p>
                    DocSpot was born from a simple yet powerful vision: healthcare should be accessible, 
                    convenient, and centered around the patient experience. Our founders, healthcare 
                    professionals and technology experts, recognized the challenges patients face when 
                    trying to access quality medical care.
                  </p>
                  <p>
                    Long wait times, complex booking systems, and limited access to specialist care 
                    were barriers that technology could solve. We set out to create a platform that 
                    not only connects patients with the right healthcare providers but also provides 
                    tools for better health management.
                  </p>
                  <p>
                    Today, DocSpot serves thousands of patients and healthcare providers, facilitating 
                    meaningful connections and improving health outcomes across communities. We continue 
                    to innovate and expand our platform to meet the evolving needs of modern healthcare.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
