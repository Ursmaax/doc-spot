
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import AuthModal from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Star, Calendar, Clock } from 'lucide-react';

const DoctorsPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleAuthClick = (type: 'login' | 'register') => {
    setAuthModalType(type);
    setIsAuthModalOpen(true);
  };

  // Sample doctor data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Williams',
      specialty: 'Cardiology',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      rating: 4.9,
      reviews: 127,
      experience: '15 years',
      location: 'New York, NY',
      nextAvailable: 'Today 2:30 PM',
      consultation: '$150',
      verified: true
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      rating: 4.8,
      reviews: 203,
      experience: '12 years',
      location: 'Los Angeles, CA',
      nextAvailable: 'Tomorrow 10:00 AM',
      consultation: '$200',
      verified: true
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      image: 'https://images.unsplash.com/photo-1594824680379-ce34d5c5a5c4?w=300&h=300&fit=crop&crop=face',
      rating: 4.9,
      reviews: 189,
      experience: '8 years',
      location: 'Chicago, IL',
      nextAvailable: 'Today 4:15 PM',
      consultation: '$120',
      verified: true
    },
    {
      id: 4,
      name: 'Dr. James Thompson',
      specialty: 'Orthopedics',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face',
      rating: 4.7,
      reviews: 156,
      experience: '20 years',
      location: 'Houston, TX',
      nextAvailable: 'Tomorrow 9:30 AM',
      consultation: '$180',
      verified: true
    }
  ];

  const specialties = [
    'All Specialties',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'Ophthalmology'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header onAuthClick={handleAuthClick} />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
              Find Your Doctor
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with qualified healthcare professionals in your area. 
              Book appointments instantly with our verified doctors.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass rounded-2xl p-6 mb-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search doctors, conditions, or treatments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass border-white/30 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="glass border-white/30 focus:border-primary-500">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent className="glass backdrop-blur-xl border-white/20">
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty.toLowerCase()}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="gradient-primary text-white hover:shadow-lg hover:scale-105 transition-all">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <Card 
                key={doctor.id}
                className="glass hover-lift cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {doctor.specialty}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-gray-400 ml-1">({doctor.reviews})</span>
                    </div>
                    {doctor.verified && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Next: {doctor.nextAvailable}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{doctor.experience} experience</span>
                      <span className="font-semibold text-primary-600">{doctor.consultation}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full gradient-primary text-white hover:shadow-lg hover:scale-105 transition-all"
                    onClick={() => handleAuthClick('register')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="glass border-white/30 hover:bg-white/20 px-8 py-4"
            >
              Load More Doctors
            </Button>
          </div>
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalType}
      />
    </div>
  );
};

export default DoctorsPage;
