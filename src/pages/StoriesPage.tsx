import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, User, ArrowRight } from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';

const StoriesPage = () => {
  const stories = [
    {
      title: "From Refugee to Community Leader: Ahmed's Journey",
      excerpt: "After arriving from Sudan with his family, Ahmed Hassan found hope and support through Mosaic's settlement services. Today, he leads community programs helping other new arrivals.",
      author: "Sarah Chen",
      date: "December 15, 2024",
      location: "Newcastle",
      category: "Settlement Success",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
      readTime: "5 min read"
    },
    {
      title: "Preserving Culture Through Aged Care",
      excerpt: "Maria's story shows how culturally appropriate aged care helps seniors maintain their identity while receiving the support they need in their golden years.",
      author: "Jennifer Kim",
      date: "December 10, 2024",
      location: "Central Coast",
      category: "Aged Care",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
      readTime: "4 min read"
    },
    {
      title: "Building Bridges: The Youth Leadership Program",
      excerpt: "Young people from diverse backgrounds come together to develop leadership skills and create positive change in their communities through our youth programs.",
      author: "David Thompson",
      date: "December 5, 2024",
      location: "Lake Macquarie",
      category: "Youth Programs",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600",
      readTime: "6 min read"
    },
    {
      title: "Family Reunification: A Story of Hope",
      excerpt: "After years of separation, the Chen family was reunited in Australia. Our family support services helped them rebuild their lives and strengthen their bonds.",
      author: "Lisa Wong",
      date: "November 28, 2024",
      location: "Hunter Region",
      category: "Family Support",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
      readTime: "7 min read"
    },
    {
      title: "Volunteer Spotlight: Making a Difference",
      excerpt: "Meet Jennifer, a dedicated volunteer who has been supporting settlement services for three years, helping dozens of families find their place in Australia.",
      author: "Ahmed Hassan",
      date: "November 20, 2024",
      location: "Newcastle",
      category: "Volunteer Stories",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
      readTime: "4 min read"
    },
    {
      title: "Cultural Festival Brings Community Together",
      excerpt: "The annual Multicultural Festival showcased the rich diversity of our community, featuring food, music, and traditions from over 20 different cultures.",
      author: "Carlos Rodriguez",
      date: "November 15, 2024",
      location: "All Locations",
      category: "Community Events",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600",
      readTime: "5 min read"
    }
  ];

  const categories = ["All Stories", "Settlement Success", "Aged Care", "Youth Programs", "Family Support", "Volunteer Stories", "Community Events"];
  const [selectedCategory, setSelectedCategory] = React.useState("All Stories");

  const filteredStories = selectedCategory === "All Stories" 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Community Stories | Mosaic Multicultural Connections</title>
        <meta name="description" content="Read inspiring stories and impact highlights from multicultural communities supported by Mosaic Multicultural Connections." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <AnimatedBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Community Stories</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">Stories & Impact</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Real stories from our community members, showcasing the transformative power of support, 
              connection, and cultural celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - Premium Glass Design */}
      <section className="relative py-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-gray-200 dark:border-slate-700 transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-blue-500/10 dark:from-slate-900/30 dark:to-blue-900/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg backdrop-blur-md border border-blue-400/30'
                    : 'backdrop-blur-md bg-white/60 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/20 border border-white/40 dark:border-white/20 shadow-lg hover:shadow-xl'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid - Enhanced Glass Morphism */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Enhanced glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story, index) => (
              <article key={index} className="group relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden cursor-pointer border border-white/50 dark:border-white/20 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/15">
                
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                    {story.category}
                  </div>
                  <div className="absolute top-4 right-4 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm border border-white/20 dark:border-slate-700/50">
                    {story.readTime}
                  </div>
                </div>
                
                <div className="p-6 relative z-10">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-sky transition-colors">
                    {story.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-white/80 leading-relaxed mb-6">
                    {story.excerpt}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600 dark:text-white/70">
                      <User className="h-4 w-4 mr-2 text-sky" />
                      {story.author}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-white/70">
                      <Calendar className="h-4 w-4 mr-2 text-sky" />
                      {story.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-white/70">
                      <MapPin className="h-4 w-4 mr-2 text-sky" />
                      {story.location}
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center group transition-colors">
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Subtle top accent */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-b-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 opacity-60"></div>
                
                {/* Corner glow effect */}
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm"></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Community Impact</h2>
            <p className="text-xl text-blue-200 dark:text-blue-300 max-w-3xl mx-auto">
              These numbers represent real lives changed and communities strengthened through our work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "2,500+", label: "Families Supported", description: "Across all our programs" },
              { number: "150+", label: "Success Stories", description: "Documented transformations" },
              { number: "25+", label: "Languages", description: "Community representation" },
              { number: "95%", label: "Positive Outcomes", description: "Client satisfaction rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-sky mb-2">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-blue-200 dark:text-blue-300 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup - Premium Glass Design */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 text-center border border-white/50 dark:border-white/20 shadow-2xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Stay Updated</h2>
            <p className="text-xl text-gray-600 dark:text-white/80 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter to receive the latest stories, program updates, and community news.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white/80 dark:bg-slate-700/80 text-gray-900 dark:text-white backdrop-blur-sm"
              />
              <button className="bg-gradient-to-r from-ocean to-sky hover:from-ocean/90 hover:to-sky/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-gray-600 dark:text-white/70 text-sm mt-4">
              Monthly updates • Unsubscribe anytime • Privacy respected
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoriesPage;