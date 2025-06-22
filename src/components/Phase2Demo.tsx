import React, { useState } from 'react';
import { Home, Heart, Users, Globe, FileText, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const Phase2Demo = () => {
  const [openFaq, setOpenFaq] = useState<string | undefined>("faq-1");

  const toggleFaq = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? undefined : faqId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 Phase 2 Demo: Professional Service Pages
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Professional touch with glowing effects on service category cards and feature highlights
          </p>
        </div>

        {/* Main Services Page Demo */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            📋 Main Services Page - Category Cards
          </h2>
          <div className="max-w-screen-lg w-full mx-auto space-y-20">
            {[
              {
                category: "Settlement Support",
                title: "SETS Program for New Arrivals", 
                details: "Comprehensive support for new arrivals to help establish their lives in Australia with dignity and independence.",
                emoji: "🏠"
              },
              {
                category: "Aged Care Services",
                title: "Culturally Appropriate Care",
                details: "Honoring traditions while providing professional aged care services in familiar languages.",
                emoji: "❤️"
              }
            ].map((service, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-x-20 gap-y-6 md:odd:flex-row-reverse"
              >
                <div className="relative w-full aspect-[6/4] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-gray-200 dark:border-gray-700 basis-1/2 flex items-center justify-center">
                  {/* GlowingEffect for service category cards */}
                  <GlowingEffect
                    spread={25}
                    glow={true}
                    disabled={false}
                    proximity={80}
                    inactiveZone={0.1}
                    movementDuration={1.8}
                    borderWidth={2}
                  />
                  <div className="text-6xl opacity-20 dark:opacity-30">
                    {service.emoji}
                  </div>
                </div>
                <div className="basis-1/2 shrink-0">
                  <span className="uppercase font-semibold text-sm text-earth">
                    {service.category}
                  </span>
                  <h4 className="my-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {service.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-100 text-[17px]">
                    {service.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Individual Service Page Demo */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            📄 Individual Service Pages - Feature Highlights
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "Housing & Accommodation Support",
                description: "Finding safe, affordable housing is often the first priority for new arrivals.",
                features: [
                  "Property search assistance and real estate liaison",
                  "Rental application support and bond assistance",
                  "Tenant rights education and advocacy"
                ],
                icon: <Home className="h-8 w-8" />,
                color: "sky"
              },
              {
                title: "Employment & Career Development", 
                description: "Securing meaningful employment is crucial for independence and community integration.",
                features: [
                  "Resume writing and interview preparation",
                  "Job search strategies and employer connections",
                  "Skills recognition and qualification assessment"
                ],
                icon: <Users className="h-8 w-8" />,
                color: "earth"
              }
            ].map((service, index) => (
              <div key={index} className="group relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-3xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                {/* GlowingEffect for service feature cards */}
                <GlowingEffect
                  spread={28}
                  glow={true}
                  disabled={false}
                  proximity={90}
                  inactiveZone={0.08}
                  movementDuration={1.6}
                  borderWidth={2}
                />

                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                      service.color === 'sky' ? 'bg-gradient-to-br from-sky to-sky/80' : 'bg-gradient-to-br from-earth to-earth/80'
                    }`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-white/80 leading-relaxed mb-6">{service.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <CheckCircle className={`h-5 w-5 mr-2 ${service.color === 'sky' ? 'text-sky' : 'text-earth'}`} />
                    What We Provide:
                  </h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          service.color === 'sky' ? 'bg-sky' : 'bg-earth'
                        }`}></div>
                        <span className="text-gray-600 dark:text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Demo */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            ❓ FAQ Sections - Interactive Accordions
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                id: "faq-1",
                question: "Who is eligible for settlement support services?",
                answer: "Settlement support is available to recent migrants and refugees within their first 5 years in Australia, family members of eligible migrants, and people from culturally diverse backgrounds."
              },
              {
                id: "faq-2", 
                question: "What housing assistance do you provide?",
                answer: "We help with finding suitable accommodation, understanding rental processes, connecting with real estate agents, and assistance with rental applications and bond support."
              }
            ].map((faq) => (
              <div key={faq.id} className="group relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden hover:scale-[1.01]">
                {/* GlowingEffect for FAQ items */}
                <GlowingEffect
                  spread={20}
                  glow={true}
                  disabled={false}
                  proximity={70}
                  inactiveZone={0.15}
                  movementDuration={2.2}
                  borderWidth={1}
                />
                
                {/* Question Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-white/80 dark:hover:bg-white/15 transition-all duration-300 group"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-4 leading-relaxed">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openFaq === faq.id ? (
                      <ChevronUp className="h-6 w-6 text-sky transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-sky transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFaq === faq.id 
                      ? 'max-h-[500px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 border-t border-white/30 dark:border-white/20 pt-6">
                    <p className="text-gray-600 dark:text-white/80 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                {/* Accent line */}
                <div className={`h-1 bg-gradient-to-r from-sky to-sky/80 transition-all duration-500 ${
                  openFaq === faq.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>
            ))}
          </div>
        </section>

        {/* Implementation Summary */}
        <div className="backdrop-blur-md bg-white/60 dark:bg-slate-800/60 rounded-2xl p-8 border border-white/30 dark:border-slate-700/30">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            ✨ Phase 2 Implementation Summary
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-sky mb-2">Services Page</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Service category cards</li>
                <li>• Moderate glow spread (25px)</li>
                <li>• Professional animation (1.8s)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-earth mb-2">Feature Cards</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Service feature highlights</li>
                <li>• Enhanced proximity (90px)</li>
                <li>• Smooth animation (1.6s)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-leaf mb-2">FAQ Sections</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Interactive accordion items</li>
                <li>• Subtle glow (20px spread)</li>
                <li>• Elegant animation (2.2s)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase2Demo;