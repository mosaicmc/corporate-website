import React from 'react';
import { AU } from '@/lib/auSpelling';
import { ArrowRight, Heart, Users, BookOpen, Lightbulb, Home, Utensils } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Healthcare Access",
      description: AU("Providing essential medical care and health education to underserved communities."),
      image: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Education Support",
      description: AU("Building schools and providing educational resources for children in remote areas."),
      image: "https://images.pexels.com/photos/8423049/pexels-photo-8423049.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Food Security",
      description: AU("Establishing sustainable food programs and teaching agricultural techniques."),
      image: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Housing Development",
      description: AU("Building safe, affordable housing and improving living conditions."),
      image: "https://images.pexels.com/photos/8926563/pexels-photo-8926563.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Skills Training",
      description: AU("Empowering communities through vocational training and micro-enterprise development."),
      image: "https://images.pexels.com/photos/8923197/pexels-photo-8923197.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Development",
      description: "Strengthening local leadership and building sustainable community programs.",
      image: "https://images.pexels.com/photos/6647021/pexels-photo-6647021.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Action on Poverty programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We work across multiple areas to create lasting change in communities worldwide. 
            Explore how we're making sustainable change through community-driven solutions.
          </p>
          <div className="flex justify-center mt-6">
            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center group">
              Explore all programs
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-full">
                  <div className="text-blue-600">
                    {program.icon}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center group">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
