import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { Timeline } from '../components/ui/timeline';
import { Card, CardContent } from '../components/ui/card';
import { Avatar } from '../components/ui/avatar';

const AboutPage = () => {
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>About Mosaic Multicultural Connections</title>
        <meta name="description" content="Learn about Mosaic Multicultural Connections — our mission, values, and history supporting multicultural communities across NSW." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-sand via-sky/20 to-ocean/10 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Glass morphism background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-sand/40 via-transparent to-sky/20 dark:from-slate-900/50 dark:to-ocean/30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky/30 rounded-full blur-3xl dark:bg-sky/20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean/30 rounded-full blur-3xl dark:bg-ocean/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-earth animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Our Story</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              About{" "}
              <span className="bg-gradient-to-r from-ocean via-sky to-ocean bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-ocean">
                Mosaic Multicultural Connections
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              For nearly <span className="font-bold text-ocean dark:text-sky">45 years</span>, we've been dedicated to supporting diverse communities across NSW,
              helping families build new lives while celebrating their cultural heritage.
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { number: "45", label: "Years of Service", suffix: "+" },
                { number: "25", label: "Communities Served", suffix: "+" },
                { number: "15,000", label: "Families Supported", suffix: "+" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-md bg-white/60 dark:bg-white/10 rounded-xl p-6 border border-white/40 dark:border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-ocean dark:text-sky mb-2">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative py-20 bg-gradient-to-br from-sand/30 via-sky/10 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Using the reusable AnimatedBackground component */}
        <AnimatedBackground variant="subtle" className="opacity-70" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-ocean animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Our Mission</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              Empowering{" "}
              <span className="bg-gradient-to-r from-ocean via-sky to-earth bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-earth">
                Multicultural Communities
              </span>{" "}
              Across NSW
            </h2>
            
            <div className="space-y-6">
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                To empower multicultural communities across NSW by providing culturally appropriate support services 
                that promote independence, wellbeing, and social inclusion.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We believe that diversity strengthens our communities, and every person deserves the opportunity 
                to thrive while maintaining their cultural identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 bg-gradient-to-br from-sand/30 via-sky/10 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sand/30 via-sky/20 to-ocean/10 dark:from-ocean/20 dark:via-sky/10 dark:to-ocean/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky/20 dark:bg-sky/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-earth/20 dark:bg-earth/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-earth animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Our Values</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What{" "}
              <span className="bg-gradient-to-r from-ocean via-sky to-earth bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-earth">
                Guides
              </span>{" "}
              Our Work
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our values are the foundation of every interaction, every service, and every relationship we build with the communities we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🌍", title: "Cultural Respect", desc: "Honoring and celebrating cultural diversity" },
              { icon: "💪", title: "Empowerment", desc: "Building capacity and independence" },
              { icon: "🤝", title: "Inclusion", desc: "Creating welcoming, accessible services" },
              { icon: "⭐", title: "Excellence", desc: "Delivering high-quality, professional services" }
            ].map((value, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:scale-[1.02]"
              >
                <CardContent className="text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}

      {/* History - Scroll-Based Timeline */}
      <Timeline data={[
        {
          title: "1978",
          content: (
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Government Initiative</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Australian government established Migrant Resource Centres around Australia to support growing multicultural communities.
              </p>
            </div>
          ),
        },
        {
          title: "1981",
          content: (
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Foundation Year</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Mosaic Multicultural Connections was founded as the Migrant Resource Centre for Newcastle and Hunter, beginning our journey of community support.
              </p>
            </div>
          ),
        },
        {
          title: "1984",
          content: (
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Leadership Growth</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                The work and reach of the Centre grew under CEO Violetta Walsh's leadership, expanding services and community connections.
              </p>
            </div>
          ),
        },
        {
          title: "1985",
          content: (
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hamilton Relocation</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                The Newcastle and Hunter Centre moved to Hamilton, establishing a more central location to better serve the community.
              </p>
            </div>
          ),
        },
        {
          title: "2007",
          content: (
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rebranding</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Our name changed to Northern Settlement Services Limited, reflecting our expanded scope and professional growth.
              </p>
            </div>
          ),
        },
        {
          title: "2012",
          content: (
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">New Leadership</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Lulu Tantos became the new CEO, bringing fresh vision and continued commitment to multicultural support.
              </p>
            </div>
          ),
        },
        {
          title: "2019",
          content: (
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">New Chapter</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Sharon Daishe became CEO, ready to take the organisation into a new chapter of innovation and expanded services.
              </p>
            </div>
          ),
        },
        {
          title: "2022",
          content: (
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mosaic Identity</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Commenced trading under the new name Mosaic Multicultural Connections (Mosaic), reflecting our diverse, interconnected community approach.
              </p>
            </div>
          ),
        },
        {
          title: "2024",
          content: (
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Charlestown Move</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                The Newcastle and Hunter Centre moved to Charlestown, continuing our commitment to accessible, community-centered services.
              </p>
            </div>
          ),
        },
      ]} />

      {/* Team & Leadership */}
      <section className="relative py-20 bg-gradient-to-br from-sand/20 via-sky/5 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sand/20 via-sky/10 to-ocean/5 dark:from-ocean/20 dark:via-sky/5 dark:to-ocean/10"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-leaf/20 dark:bg-leaf/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-leaf animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Leadership</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-ocean via-sky to-leaf bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-leaf">
                Leadership Team
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experienced professionals committed to serving multicultural communities with passion and expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Chief Executive Officer",
                background: "20+ years in multicultural services",
                image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300"
              },
              {
                name: "Ahmed Hassan",
                role: "Director of Settlement Services",
                background: "Former refugee, community advocate",
                image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"
              },
              {
                name: "Maria Santos",
                role: "Director of Aged Care",
                background: "Registered nurse, cultural competency expert",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300"
              }
            ].map((member, index) => (
              <Card
                key={index}
                className="group relative p-8 text-center hover:scale-[1.02]"
              >
                <CardContent className="relative z-10">
                  <div className="mx-auto mb-6">
                    <Avatar src={member.image} alt={member.name} name={member.name} size={96} className="border-4 border-white dark:border-slate-700 shadow-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-sky font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.background}</p>
                </CardContent>

                {/* Decorative accents */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-sand/30 dark:from-white/5 via-transparent to-transparent"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-full bg-gradient-to-r from-sky to-sky/80 opacity-60"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-sky opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
