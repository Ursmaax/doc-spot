
import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Find Doctors', href: '/doctors' },
        { name: 'Specialties', href: '/specialties' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'For Patients',
      links: [
        { name: 'Book Appointment', href: '/doctors' },
        { name: 'Patient Portal', href: '#' },
        { name: 'Insurance', href: '#' },
        { name: 'Health Records', href: '#' }
      ]
    },
    {
      title: 'For Doctors',
      links: [
        { name: 'Join Our Network', href: '#' },
        { name: 'Doctor Dashboard', href: '#' },
        { name: 'Resources', href: '#' },
        { name: 'Support', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'HIPAA Compliance', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-violet-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold">DocSpot</span>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
              Revolutionizing healthcare by connecting patients with top-rated doctors 
              through our modern, secure, and user-friendly platform.
            </p>
            <div className="flex items-center gap-2 text-pink-400 mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Trusted by 50,000+ patients</span>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">24/7 Support</p>
                <p className="text-white font-medium">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Email Support</p>
                <p className="text-white font-medium">support@docspot.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Head Office</p>
                <p className="text-white font-medium">New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-300 text-center md:text-left">
            <p>&copy; {currentYear} DocSpot. All rights reserved.</p>
            <p className="text-sm mt-1">
              HIPAA Compliant • SOC 2 Certified • Enterprise Security
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link to="#" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-300 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
