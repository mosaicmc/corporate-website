import React from 'react';
import { Mail, Phone, User } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  qualifications: string;
  languages?: string[];
  phone?: string;
  email?: string;
  image?: string;
}

interface Team05Props {
  title: string;
  description: string;
  teamMembers: TeamMember[];
  accentColor?: string;
  bottomSection?: {
    title: string;
    description: string;
  };
}

const Team05: React.FC<Team05Props> = ({ 
  title, 
  description, 
  teamMembers, 
  accentColor = "sky",
  bottomSection 
}) => {
  const getAccentColor = (color: string) => {
    const colorMap = {
      sky: "border-sky",
      earth: "border-earth",
      care: "border-care",
      leaf: "border-leaf",
      sun: "border-sun"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      sky: "text-sky hover:bg-sky",
      earth: "text-earth hover:bg-earth",
      care: "text-care hover:bg-care",
      leaf: "text-leaf hover:bg-leaf",
      sun: "text-sun hover:bg-sun"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  const getGradientColor = (color: string) => {
    const colorMap = {
      sky: "from-sky/20 via-sky/10 to-transparent",
      earth: "from-earth/20 via-earth/10 to-transparent",
      care: "from-care/20 via-care/10 to-transparent",
      leaf: "from-leaf/20 via-leaf/10 to-transparent",
      sun: "from-sun/20 via-sun/10 to-transparent"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  const getRingColor = (color: string) => {
    const colorMap = {
      sky: "ring-sky/30",
      earth: "ring-earth/30",
      care: "ring-care/30",
      leaf: "ring-leaf/30",
      sun: "ring-sun/30"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  const getNotionGradient = (color: string, index: number) => {
    const gradients = {
      sky: [
        "from-blue-400 via-cyan-300 to-sky-400",
        "from-indigo-400 via-blue-300 to-cyan-400", 
        "from-sky-400 via-blue-300 to-indigo-400",
        "from-cyan-400 via-sky-300 to-blue-400",
        "from-blue-300 via-indigo-300 to-sky-300",
        "from-sky-300 via-cyan-300 to-blue-300"
      ],
      earth: [
        "from-orange-400 via-red-300 to-pink-400",
        "from-red-400 via-orange-300 to-yellow-400",
        "from-pink-400 via-red-300 to-orange-400",
        "from-yellow-400 via-orange-300 to-red-400",
        "from-orange-300 via-pink-300 to-red-300",
        "from-red-300 via-yellow-300 to-orange-300"
      ],
      care: [
        "from-pink-400 via-rose-300 to-fuchsia-400",
        "from-rose-400 via-pink-300 to-red-400",
        "from-fuchsia-400 via-pink-300 to-rose-400",
        "from-red-400 via-rose-300 to-pink-400",
        "from-pink-300 via-fuchsia-300 to-rose-300",
        "from-rose-300 via-red-300 to-pink-300"
      ],
      leaf: [
        "from-green-400 via-emerald-300 to-teal-400",
        "from-emerald-400 via-green-300 to-lime-400",
        "from-teal-400 via-green-300 to-emerald-400",
        "from-lime-400 via-emerald-300 to-green-400",
        "from-green-300 via-teal-300 to-emerald-300",
        "from-emerald-300 via-lime-300 to-green-300"
      ],
      sun: [
        "from-yellow-400 via-amber-300 to-orange-400",
        "from-amber-400 via-yellow-300 to-lime-400",
        "from-orange-400 via-yellow-300 to-amber-400",
        "from-lime-400 via-amber-300 to-yellow-400",
        "from-yellow-300 via-orange-300 to-amber-300",
        "from-amber-300 via-lime-300 to-yellow-300"
      ]
    };
    
    const colorGradients = gradients[color as keyof typeof gradients] || gradients.sky;
    return colorGradients[index % colorGradients.length];
  };

  const getNotionPattern = (index: number) => {
    const patterns = [
      // Geometric patterns
      <div key="pattern1" className="absolute inset-0 opacity-20">
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/40"></div>
        <div className="absolute top-4 right-3 w-2 h-2 rounded-full bg-white/30"></div>
        <div className="absolute bottom-3 left-4 w-2.5 h-2.5 rounded-full bg-white/35"></div>
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-white/25"></div>
      </div>,
      
      <div key="pattern2" className="absolute inset-0 opacity-15">
        <div className="absolute top-3 left-3 w-4 h-1 rounded-full bg-white/40"></div>
        <div className="absolute top-6 right-4 w-3 h-1 rounded-full bg-white/30"></div>
        <div className="absolute bottom-4 left-2 w-5 h-1 rounded-full bg-white/35"></div>
        <div className="absolute bottom-6 right-3 w-2 h-1 rounded-full bg-white/25"></div>
      </div>,
      
      <div key="pattern3" className="absolute inset-0 opacity-25">
        <div className="absolute top-2 left-4 w-2 h-2 rotate-45 bg-white/40"></div>
        <div className="absolute top-5 right-2 w-1.5 h-1.5 rotate-45 bg-white/30"></div>
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rotate-45 bg-white/35"></div>
        <div className="absolute bottom-5 right-4 w-1 h-1 rotate-45 bg-white/25"></div>
      </div>,
      
      <div key="pattern4" className="absolute inset-0 opacity-20">
        <div className="absolute top-1 left-1 w-6 h-0.5 bg-white/30 transform rotate-12"></div>
        <div className="absolute top-4 right-1 w-4 h-0.5 bg-white/25 transform -rotate-12"></div>
        <div className="absolute bottom-2 left-2 w-5 h-0.5 bg-white/35 transform rotate-45"></div>
        <div className="absolute bottom-4 right-3 w-3 h-0.5 bg-white/20 transform -rotate-45"></div>
      </div>,
      
      <div key="pattern5" className="absolute inset-0 opacity-15">
        <div className="absolute top-2 left-2 w-1 h-4 bg-white/30"></div>
        <div className="absolute top-1 right-3 w-1 h-3 bg-white/25"></div>
        <div className="absolute bottom-3 left-4 w-1 h-5 bg-white/35"></div>
        <div className="absolute bottom-1 right-1 w-1 h-2 bg-white/20"></div>
      </div>,
      
      <div key="pattern6" className="absolute inset-0 opacity-25">
        <div className="absolute top-3 left-1 w-3 h-3 border border-white/30 rounded-sm"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border border-white/25 rounded-sm"></div>
        <div className="absolute top-1 right-1 w-1.5 h-1.5 border border-white/20 rounded-sm"></div>
      </div>
    ];
    
    return patterns[index % patterns.length];
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          <p className="text-xl text-gray-600 dark:text-white/80 max-w-4xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              {/* Glass morphism card */}
              <div className="relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/15 h-full">
                
                {/* Enhanced gradient overlay for depth */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColor(accentColor)} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Notion-Style Profile Icon with Enhanced Effects */}
                  <div className="relative mx-auto mb-6">
                    {/* Animated Ring Effect */}
                    <div className={`absolute inset-0 rounded-full ring-4 ${getRingColor(accentColor)} animate-pulse group-hover:ring-8 transition-all duration-500`}></div>
                    
                    {/* Gradient Border Ring */}
                    <div className={`absolute -inset-2 rounded-full bg-gradient-to-r ${getNotionGradient(accentColor, index)} opacity-0 group-hover:opacity-75 blur-sm transition-all duration-500 animate-spin-slow`}></div>
                    
                    {/* Main Profile Container with Enhanced Effects */}
                    <div className="relative w-40 h-40 group-hover:scale-110 transition-transform duration-500">
                      {/* Background Glow Effect */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getNotionGradient(accentColor, index)} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      {/* Notion-Style Icon Container */}
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/50 dark:border-white/20">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          />
                        ) : (
                          /* Beautiful Notion-Style Icon */
                          <div className={`w-full h-full bg-gradient-to-br ${getNotionGradient(accentColor, index)} flex items-center justify-center relative overflow-hidden`}>
                            
                            {/* Notion-style geometric patterns */}
                            {getNotionPattern(index)}
                            
                            {/* Main User Icon */}
                            <div className="relative z-10">
                              <User className="w-16 h-16 text-white drop-shadow-lg" strokeWidth={1.5} />
                            </div>
                            
                            {/* Subtle shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Floating particles effect */}
                            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                            <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                          </div>
                        )}
                        
                        {/* Overlay Gradient for Professional Look */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                    
                    {/* Enhanced Contact Icons with Better Positioning */}
                    <div className="absolute -bottom-3 -right-3 flex space-x-2">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className={`w-12 h-12 rounded-full bg-white/95 dark:bg-slate-800/95 border-2 border-white dark:border-slate-700 shadow-xl flex items-center justify-center ${getIconColor(accentColor)} hover:text-white transition-all duration-300 hover:scale-125 hover:rotate-12 backdrop-blur-sm`}
                          title={`Email ${member.name}`}
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone.replace(/\s/g, '')}`}
                          className={`w-12 h-12 rounded-full bg-white/95 dark:bg-slate-800/95 border-2 border-white dark:border-slate-700 shadow-xl flex items-center justify-center ${getIconColor(accentColor)} hover:text-white transition-all duration-300 hover:scale-125 hover:-rotate-12 backdrop-blur-sm`}
                          title={`Call ${member.name}`}
                        >
                          <Phone className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Name and Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors">{member.name}</h3>
                    <p className={`text-base font-semibold ${
                      accentColor === 'sky' ? 'text-sky' :
                      accentColor === 'earth' ? 'text-earth' :
                      accentColor === 'care' ? 'text-care' :
                      accentColor === 'leaf' ? 'text-leaf' :
                      'text-sun'
                    } group-hover:brightness-110 transition-all`}>
                      {member.role}
                    </p>
                  </div>
                  
                  {/* Qualifications */}
                  <div className="flex-1 mb-4">
                    <p className="text-sm text-gray-600 dark:text-white/80 leading-relaxed text-center">
                      {member.qualifications}
                    </p>
                  </div>
                  
                  {/* Languages */}
                  {member.languages && (
                    <div className="mt-auto">
                      <p className="text-xs font-medium text-gray-500 dark:text-white/60 mb-2 text-center">Languages:</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {member.languages.map((lang, idx) => (
                          <span key={idx} className="text-xs bg-white/60 dark:bg-white/15 px-3 py-1 rounded-full text-gray-600 dark:text-white/70 border border-white/40 dark:border-white/20 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/25 transition-colors">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced accent border with animation */}
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-b-full bg-gradient-to-r ${getNotionGradient(accentColor, index)} opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500`}></div>
                
                {/* Enhanced corner glow effect */}
                <div className={`absolute -top-3 -right-3 w-6 h-6 rounded-full ${
                  accentColor === 'sky' ? 'bg-sky' :
                  accentColor === 'earth' ? 'bg-earth' :
                  accentColor === 'care' ? 'bg-care' :
                  accentColor === 'leaf' ? 'bg-leaf' :
                  'bg-sun'
                } opacity-0 group-hover:opacity-80 transition-all duration-500 blur-sm animate-pulse`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        {bottomSection && (
          <div className="text-center mt-16">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{bottomSection.title}</h3>
              <p className="text-gray-600 dark:text-white/80 leading-relaxed">
                {bottomSection.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team05;