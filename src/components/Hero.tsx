import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FlipWords } from './ui/flip-words';

const Hero = () => {
  const { t } = useTranslation();
  
  // FlipWords animation
  const rotatingWords = ['Multicultural', 'Migrant', 'Refugee', 'Vibrant', 'Connected', 'Thriving', 'United', 'Diverse', 'Resilient', 'Empowered'];
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-32 pb-24 lg:pt-40 lg:pb-32 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced glass morphism background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
      
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl dark:bg-blue-500/10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl dark:bg-purple-500/10 animate-blob-delayed"></div>
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-green-400/12 rounded-full blur-3xl dark:bg-green-500/8 animate-blob-reverse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl dark:bg-indigo-500/8 animate-pulse-gentle"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/20 border border-white/30 px-4 py-2 text-sm shadow-lg dark:bg-slate-800/30 dark:border-slate-700/50 animate-fade-in-up hover:bg-white/30 dark:hover:bg-slate-800/40 transition-all duration-300 group cursor-pointer">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse group-hover:animate-heartbeat"></span>
                <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">{t('hero.badge')}</span>
              </div>
              
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-5xl leading-[1.1] text-gray-900 dark:text-white animate-fade-in-up-delay-100 max-w-4xl">
                <span className="block sm:inline">Supporting{" "}</span>
                <FlipWords 
                  words={rotatingWords}
                  duration={3000}
                  className="bg-gradient-to-r from-sky via-ocean to-earth bg-clip-text text-transparent inline-block min-w-0"
                />{" "}
                <span className="block sm:inline mt-1 sm:mt-0">Communities Across NSW</span>
              </h1>
              
              <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-300 leading-relaxed animate-fade-in-up-delay-200">
                {t('hero.description')}
              </p>
            </div>
            
            <div className="flex flex-col gap-4 min-[400px]:flex-row animate-fade-in-up-delay-300">
              <Link
                to="/services"
                className="group inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 backdrop-blur-sm dark:from-blue-500 dark:to-blue-600 hover:scale-105 active:scale-98 hover:shadow-2xl hover:shadow-blue-500/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/stories"
                className="group inline-flex h-12 items-center justify-center rounded-xl backdrop-blur-md bg-white/20 border border-white/30 px-8 text-sm font-semibold shadow-lg transition-all duration-300 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:bg-slate-800/30 dark:border-slate-700/50 dark:text-gray-100 dark:hover:bg-slate-800/50 hover:scale-105 active:scale-98 hover:shadow-xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Stories
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 animate-fade-in-up-delay-400">
              {[
                { number: "43+", label: "Years of Service" },
                { number: "2,500+", label: "Families Supported" },
                { number: "25+", label: "Languages Spoken" }
              ].map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-all duration-300 cursor-pointer p-2 rounded-lg hover:bg-white/10 dark:hover:bg-slate-800/20">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-earth dark:group-hover:text-earth transition-all duration-300 group-hover:animate-pulse-gentle">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content - Image with subtle animations */}
          <div className="relative animate-fade-in-right">
            <div className="relative mx-auto aspect-square max-w-[500px] overflow-hidden rounded-3xl backdrop-blur-md bg-gradient-to-br from-white/20 to-blue-100/30 shadow-2xl dark:from-slate-800/30 dark:to-blue-900/20 hover:scale-105 transition-all duration-700 group hover:shadow-3xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
              <img
                src="/pexels-yankrukov-8199708.jpg"
                alt="Diverse group of young people celebrating together in a library setting"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000 group-hover:brightness-110"
              />
              
              {/* Floating cards with micro-interactions */}
              <div className="absolute -bottom-4 -left-4 rounded-xl backdrop-blur-md bg-white/80 p-4 shadow-xl border border-white/20 dark:bg-slate-800/80 dark:border-slate-700/50 hover:scale-110 hover:-translate-y-2 transition-all duration-300 group/card cursor-pointer animate-fade-in-delay-200 hover:shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center dark:from-blue-400 dark:to-blue-500 group-hover/card:animate-pulse">
                    <span className="text-white font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">Office Locations</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Across NSW</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 rounded-xl backdrop-blur-md bg-white/80 p-4 shadow-xl border border-white/20 dark:bg-slate-800/80 dark:border-slate-700/50 hover:scale-110 hover:-translate-y-2 transition-all duration-300 group/card cursor-pointer animate-fade-in-delay-300 hover:shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center dark:from-green-400 dark:to-green-500 group-hover/card:animate-pulse">
                    <span className="text-white font-semibold text-sm">95%</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">Satisfaction Rate</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Client feedback</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -z-10 -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-xl dark:from-blue-500/20 dark:to-purple-500/20 animate-float"></div>
            <div className="absolute -z-10 -bottom-8 -left-8 h-24 w-24 rounded-full bg-gradient-to-br from-green-400/30 to-blue-400/30 blur-xl dark:from-green-500/20 dark:to-blue-500/20 animate-float-delayed"></div>
          </div>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20 dark:bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)]"></div>
    </section>
  );
};

export default Hero;