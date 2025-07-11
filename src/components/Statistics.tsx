import React, { useState, useEffect, useRef } from 'react';

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { 
      number: 43, 
      suffix: "+", 
      label: "Years of Service",
      description: "Serving communities since 1981",
      color: "earth"
    },
    { 
      number: 4, 
      suffix: "", 
      label: "Office Locations",
      description: "Across NSW regions",
      color: "sun"
    },
    { 
      number: 2500, 
      suffix: "+", 
      label: "Families Supported",
      description: "Lives transformed annually",
      color: "sky"
    },
    { 
      number: 25, 
      suffix: "+", 
      label: "Languages Spoken",
      description: "Cultural diversity embraced",
      color: "leaf"
    }
  ];

  // Intersection Observer to trigger animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Animate numbers when visible
  useEffect(() => {
    if (!isVisible) return;

    const animateNumbers = () => {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.number / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          const currentValue = Math.min(Math.ceil(increment * currentStep), stat.number);
          
          setCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[index] = currentValue;
            return newCounts;
          });

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, duration / steps);
      });
    };

    const startDelay = setTimeout(animateNumbers, 200);
    return () => clearTimeout(startDelay);
  }, [isVisible]);

  const getGlowColor = (color: string) => {
    const colorMap = {
      ocean: "shadow-ocean/20 hover:shadow-ocean/30 dark:shadow-ocean/20 dark:hover:shadow-ocean/30",
      sky: "shadow-sky/20 hover:shadow-sky/30 dark:shadow-sky/20 dark:hover:shadow-sky/30", 
      earth: "shadow-earth/20 hover:shadow-earth/30 dark:shadow-earth/20 dark:hover:shadow-earth/30",
      leaf: "shadow-leaf/20 hover:shadow-leaf/30 dark:shadow-leaf/20 dark:hover:shadow-leaf/30",
      sun: "shadow-sun/20 hover:shadow-sun/30 dark:shadow-sun/20 dark:hover:shadow-sun/30"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.earth;
  };

  const getProgressColor = (color: string) => {
    const colorMap = {
      ocean: "bg-gradient-to-r from-ocean to-ocean/80",
      sky: "bg-gradient-to-r from-sky to-sky/80",
      earth: "bg-gradient-to-r from-earth to-earth/80", 
      leaf: "bg-gradient-to-r from-leaf to-leaf/80",
      sun: "bg-gradient-to-r from-sun to-sun/80"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.earth;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300"
    >
      {/* Enhanced glass morphism background with multiple layers - adaptive for light/dark */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/15 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-earth animate-pulse"></span>
            <span className="text-gray-700 dark:text-white/90 font-medium">See our Data</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Impact by the Numbers
          </h2>
          <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
            Four decades of measurable impact supporting multicultural communities across New South Wales
          </p>
        </div>

        {/* Statistics Grid with enhanced glass morphism */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`group relative text-center transform transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Premium glass morphism card - adaptive for light/dark */}
              <div className={`relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-6 lg:p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15 ${getGlowColor(stat.color)}`}>
                
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content with enhanced readability */}
                <div className="relative z-10">
                  {/* Large animated number */}
                  <div className="mb-4">
                    <div className={`text-4xl lg:text-6xl font-bold mb-2 transition-all duration-300 text-gray-900 dark:text-white drop-shadow-lg`}>
                      <span className="tabular-nums">
                        {counts[index].toLocaleString()}
                      </span>
                      <span className="text-gray-600 dark:text-white/70">{stat.suffix}</span>
                    </div>
                    
                    {/* Animated accent line */}
                    <div className="w-12 h-1 mx-auto rounded-full overflow-hidden bg-gray-200 dark:bg-white/20">
                      <div 
                        className={`h-full transition-all duration-2000 ease-out rounded-full ${getProgressColor(stat.color)}`}
                        style={{ 
                          width: isVisible ? '100%' : '0%',
                          transitionDelay: `${index * 150 + 500}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Label and description with perfect contrast */}
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2 drop-shadow-sm">
                    {stat.label}
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-white/80 leading-relaxed">
                    {stat.description}
                  </div>
                </div>

                {/* Subtle top accent */}
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-b-full ${getProgressColor(stat.color)} opacity-60`}></div>
                
                {/* Corner glow effect */}
                <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${stat.color === 'ocean' ? 'bg-ocean' : stat.color === 'sky' ? 'bg-sky' : stat.color === 'earth' ? 'bg-earth' : stat.color === 'sun' ? 'bg-sun' : 'bg-leaf'} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced bottom section with glass effect */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 px-8 py-4 backdrop-blur-md bg-white/60 dark:bg-white/10 rounded-full border border-white/40 dark:border-white/20 shadow-xl">
            <div className="w-2 h-2 bg-earth rounded-full animate-pulse"></div>
            <span className="text-base font-medium text-gray-700 dark:text-white">Trusted by communities across NSW</span>
            <div className="w-2 h-2 bg-sun rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;