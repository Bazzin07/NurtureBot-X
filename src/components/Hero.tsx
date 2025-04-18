import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

const Hero = () => {
  const controls = useAnimation();
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden"); // Reset when leaving view
        }
      },
      { threshold: 0.3 }
    );

    const ref = heroRef.current;
    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls]);

  return (
    <div
      ref={heroRef}
      className="relative bg-gradient-to-b from-emerald-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.h1
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0, duration: 0.8 },
                  },
                }}
                className="text-4xl tracking-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sm:text-5xl md:text-6xl"
              >
                <span className="block">Revolutionize Your</span>
              </motion.h1>

              <motion.h1
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.6, duration: 0.8 },
                  },
                }}
                className="text-4xl tracking-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 sm:text-5xl md:text-6xl"
              >
                <span className="block">Lead Nurturing</span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 1.2, duration: 0.8 },
                  },
                }}
                className="mt-6 text-base text-gray-500 sm:mt-8 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0"
              >
                AI THAT PERSONALIZES OUTREACH AND NURTURES LEADS. Nurturebot X by Team Loopify is an AI-driven CRM system designed to personalize outreach, automate lead nurturing, and boost sales conversions.
              </motion.p>

              <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 1.8, duration: 0.8 },
                  },
                }}
                className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4"
              >
                <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/20 transition-all md:text-lg md:px-10">
                  Get started
                </button>
                <button className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-500 text-base font-medium rounded-xl text-emerald-600 bg-white hover:bg-emerald-50 transition-all md:text-lg md:px-10">
                  Learn more <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </motion.div>
            </div>
          </main>
        </div>
      </div>

      {/* Image */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-l-3xl shadow-2xl shadow-emerald-900/10"
          src="https://i.pinimg.com/736x/5f/02/00/5f0200b64a92b535f32076c74d15f60e.jpg"
          alt="Team working on analytics"
        />
      </div>
    </div>
  );
};

export default Hero;