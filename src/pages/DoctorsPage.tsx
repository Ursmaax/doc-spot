
import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Star, Calendar, Clock, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const navigate = useNavigate();

  // Enhanced doctor data with more variety
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
      verified: true,
      education: 'Harvard Medical School',
      patients: '2,400+'
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
      verified: true,
      education: 'Stanford University',
      patients: '1,800+'
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
      verified: true,
      education: 'Johns Hopkins',
      patients: '3,200+'
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
      verified: true,
      education: 'Mayo Clinic',
      patients: '4,100+'
    },
    {
      id: 5,
      name: 'Dr. Lisa Park',
      specialty: 'Dermatology',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=face',
      rating: 4.8,
      reviews: 98,
      experience: '10 years',
      location: 'New York, NY',
      nextAvailable: 'Today 3:00 PM',
      consultation: '$140',
      verified: true,
      education: 'Columbia University',
      patients: '1,600+'
    },
    {
      id: 6,
      name: 'Dr. Robert Kumar',
      specialty: 'Cardiology',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face',
      rating: 4.6,
      reviews: 74,
      experience: '18 years',
      location: 'Miami, FL',
      nextAvailable: 'Tomorrow 11:00 AM',
      consultation: '$160',
      verified: true,
      education: 'University of Miami',
      patients: '2,800+'
    }
  ];

  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'ophthalmology', label: 'Ophthalmology' }
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'houston', label: 'Houston, TX' },
    { value: 'miami', label: 'Miami, FL' }
  ];

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    let filtered = doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'all' || 
                              doctor.specialty.toLowerCase() === selectedSpecialty;
      const matchesLocation = selectedLocation === 'all' ||
                             doctor.location.toLowerCase().includes(selectedLocation.replace('-', ' '));
      
      return matchesSearch && matchesSpecialty && matchesLocation;
    });

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'price-low':
          return parseInt(a.consultation.replace('$', '')) - parseInt(b.consultation.replace('$', ''));
        case 'price-high':
          return parseInt(b.consultation.replace('$', '')) - parseInt(a.consultation.replace('$', ''));
        default:
          return 0;
      }
    });

    return filtered;
  }, [doctors, searchQuery, selectedSpecialty, selectedLocation, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Find Your Perfect Doctor
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with top-rated healthcare professionals in your area. 
              Book appointments instantly with our verified doctors.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-12 shadow-xl border border-white/20 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search doctors, conditions, or treatments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 bg-white/90 border-2 border-gray-200 focus:border-violet-400 rounded-2xl text-lg"
                  />
                </div>
              </div>
              
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="h-14 bg-white/90 border-2 border-gray-200 focus:border-violet-400 rounded-2xl">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl">
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.value} value={specialty.value}>
                      {specialty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-14 bg-white/90 border-2 border-gray-200 focus:border-violet-400 rounded-2xl">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl">
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-14 bg-white/90 border-2 border-gray-200 focus:border-violet-400 rounded-2xl">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl">
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="experience">Most Experience</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Counter */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-gray-600 font-medium">
                {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Filter className="w-4 h-4" />
                Active filters: {[searchQuery && 'Search', selectedSpecialty !== 'all' && 'Specialty', selectedLocation !== 'all' && 'Location'].filter(Boolean).join(', ') || 'None'}
              </div>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <Card 
                key={doctor.id}
                className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                      />
                      {doctor.verified && (
                        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-1">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 mb-1">{doctor.name}</h3>
                      <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                        {doctor.specialty}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-bold text-gray-900">{doctor.rating}</span>
                      <span className="text-gray-500">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{doctor.patients}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      <span>Next: {doctor.nextAvailable}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{doctor.experience} experience</span>
                      <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {doctor.consultation}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      🎓 {doctor.education}
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
                    onClick={() => navigate('/auth')}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredDoctors.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 max-w-md mx-auto shadow-xl">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No doctors found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters to find more doctors.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSpecialty('all');
                    setSelectedLocation('all');
                  }}
                  className="bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}

          {/* Load More */}
          {filteredDoctors.length > 0 && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/80 backdrop-blur-xl border-2 border-white/20 hover:bg-white/90 px-12 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl"
              >
                Load More Doctors
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorsPage;
