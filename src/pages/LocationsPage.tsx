import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Navigation, Users, Mail } from 'lucide-react';

const LocationsPage = () => {
  const locations = [
    {
      name: "Charlestown (Head Office)",
      address: "Level 3, 3 Hopetoun St, Charlestown NSW 2290",
      phone: "1800 813 205",
      email: "info@mosaicmc.org.au",
      hours: {
        weekdays: "Business Hours (Monday - Friday: 9:00 AM - 5:00 PM)",
        weekend: "Closed weekends"
      },
      services: ["All Services", "Aged Care", "Settlement Support", "Family Support", "Administration"],
      staff: [
        { name: "Sarah Chen", role: "CEO", languages: ["English", "Mandarin"] },
        { name: "Ahmed Hassan", role: "Settlement Director", languages: ["English", "Arabic", "French"] },
        { name: "Maria Santos", role: "Aged Care Director", languages: ["English", "Tagalog", "Spanish"] }
      ],
      transport: [
        "Charlestown Square bus interchange",
        "Local bus services",
        "Paid parking available"
      ],
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      name: "Central Coast",
      address: "Tuggerah Lakes Community Centre, 1 Bay Village Road, Bateau Bay NSW 2261",
      phone: "1800 813 205",
      email: "info@mosaicmc.org.au",
      hours: {
        weekdays: "Business Hours (Monday - Friday: 9:00 AM - 5:00 PM)",
        weekend: "Closed weekends"
      },
      services: ["Settlement Support", "Family Services", "Community Programs", "Youth Services"],
      staff: [
        { name: "Lisa Wong", role: "Office Manager", languages: ["English", "Mandarin", "Cantonese"] },
        { name: "Carlos Rodriguez", role: "Settlement Worker", languages: ["English", "Spanish", "Portuguese"] }
      ],
      transport: [
        "Nearest bus routes and parking available",
        "Wheelchair accessible"
      ],
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      name: "Tamworth",
      address: "3/345 Peel Street, Tamworth NSW 2340",
      phone: "1800 813 205",
      email: "info@mosaicmc.org.au",
      hours: {
        weekdays: "Business Hours (Monday - Friday: 9:00 AM - 5:00 PM)",
        weekend: "Closed weekends"
      },
      services: ["Settlement Support", "Community Programs"],
      staff: [
        { name: "David Thompson", role: "Regional Manager", languages: ["English"] }
      ],
      transport: [
        "Local bus services",
        "Street parking available"
      ],
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      name: "Armidale",
      address: "86 Beardy Street, Armidale NSW 2350",
      phone: "1800 813 205",
      email: "info@mosaicmc.org.au",
      hours: {
        weekdays: "Business Hours (Monday - Friday: 9:00 AM - 5:00 PM)",
        weekend: "Closed weekends"
      },
      services: ["Settlement Support", "Community Programs"],
      staff: [
        { name: "Fatima Al-Zahra", role: "Settlement Worker", languages: ["English", "Arabic", "Farsi"] }
      ],
      transport: [
        "Local bus services",
        "Street parking available"
      ],
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Our Locations</title>
        <meta name="description" content="Find Mosaic offices across NSW with addresses, hours, services, and contact details for your nearest location." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Glass morphism background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Find Us</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">Our Locations</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Four convenient offices across NSW, each staffed with multilingual professionals 
              ready to support your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="relative py-20 bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {locations.map((location, index) => (
              <div key={index} className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={location.image}
                      alt={`${location.name} exterior`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                      {location.name}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{location.name}</h2>
                    
                    {/* Contact Info */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-sky mt-1 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{location.address}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-sky flex-shrink-0" />
                        <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                          {location.phone}
                        </a>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-sky flex-shrink-0" />
                        <a href={`mailto:${location.email}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                          {location.email}
                        </a>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-sky mt-1 flex-shrink-0" />
                        <div className="text-gray-600 dark:text-gray-300">
                          <div>{location.hours.weekdays}</div>
                          <div>{location.hours.weekend}</div>
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Available Services</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {location.services.map((service, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-leaf rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-300 text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Staff */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h3>
                      <div className="space-y-3">
                        {location.staff.map((member, idx) => (
                          <div key={idx} className="backdrop-blur-md bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 border border-white/20 dark:border-slate-600/50">
                            <div className="font-semibold text-gray-900 dark:text-white">{member.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{member.role}</div>
                            <div className="text-xs text-sky">
                              Languages: {member.languages.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Transport */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Getting Here</h3>
                      <div className="space-y-2">
                        {location.transport.map((option, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-earth rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-300 text-sm">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                        Visit This Office
                      </button>
                      <button className="flex-1 border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors">
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-2xl p-12 border border-white/20 dark:border-slate-700/50 shadow-xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Not Sure Which Office to Visit?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Contact our head office and we'll help you find the right location and services for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1800813205"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Call 1800 813 205
              </a>
              <a
                href="mailto:info@mosaicmc.org.au"
                className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;