"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-gradient-to-br from-sand via-sky/10 to-ocean/5 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans md:px-10 relative overflow-hidden transition-colors duration-300"
      ref={containerRef}
    >
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand/30 via-transparent to-ocean/20 dark:from-slate-900/50 dark:to-ocean/30"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky/20 dark:bg-sky/10 rounded-full blur-3xl animate-pulse-slow"></div>
      
      <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-10 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-earth animate-pulse"></span>
            <span className="text-gray-700 dark:text-white/90 font-medium">Our Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 font-bold text-gray-900 dark:text-white max-w-4xl mx-auto">
            Our History
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            From government initiative to community cornerstone - four decades of multicultural support
          </p>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 absolute left-3 md:left-3 w-12 rounded-full bg-gradient-to-br from-ocean to-sky dark:from-sky dark:to-ocean flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-700">
                <div className="h-5 w-5 rounded-full bg-white dark:bg-slate-800 border border-sky/30 dark:border-sky/50" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-ocean dark:text-sky">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-ocean dark:text-sky">
                {item.title}
              </h3>
              <div className="backdrop-blur-xl bg-sand/70 dark:bg-white/10 rounded-xl p-6 border border-sky/30 dark:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-sand/80 dark:hover:bg-white/15">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-sky/40 dark:via-sky/60 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] rounded-full"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-earth via-ocean to-sky from-[0%] via-[50%] to-[100%] rounded-full shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
