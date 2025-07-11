import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FlipWords } from './ui/flip-words';

const HeroWithFlipWords = () => {
  const { t } = useTranslation();
  
  // FlipWords compatible word array
  const rotatingWords = ['Multicultural', 'Vibrant', 'Connected', 'Thriving', 'United', 'Diverse'];
  
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
              
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-5xl leading-tight text-gray-900 dark:text-white animate-fade-in-up-delay-100 max-w-4xl">
                <span className="block sm:inline">Supporting{" "}</span>
                <FlipWords 
                  words={rotatingWords}
                  duration={3000}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 inline-block min-w-0"
                />{" "}
                <span className="block sm:inline mt-1 sm:mt-0">Communities Across NSW</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up-delay-200 max-w-2xl">
                {t('hero.description')}
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-300">
              <Link
                to="/services"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 backdrop-blur-sm dark:from-blue-500 dark:to-blue-600"
              >
                <span className="relative z-10 flex items-center">
                  {t('hero.primaryCTA')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <Link
                to="/get-involved"
                className="group inline-flex h-12 items-center justify-center rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-slate-800/80 px-8 py-3 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-400 dark:hover:border-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {t('hero.secondaryCTA')}
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
              
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 dark:from-blue-400/10 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-75"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroWithFlipWords;