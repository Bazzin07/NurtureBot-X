import React from 'react';
import { Brain, Database, Send, Target, BarChart3, Layout, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

type Feature = {
  icon: LucideIcon;
  name: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Brain,
    name: 'Smart, Centralized, Proactive CRM',
    description: 'An intelligent system that proactively manages and nurtures leads through their journey.'
  },
  {
    icon: Database,
    name: 'Centralized Lead Capture',
    description: 'Automatically capture and organize leads from multiple sources in one central location.'
  },
  {
    icon: Send,
    name: 'Automated Follow-ups',
    description: 'AI-powered automated follow-ups that maintain personalized communication with leads.'
  },
  {
    icon: Target,
    name: 'AI Lead Prioritization',
    description: 'Smart algorithms that prioritize leads based on engagement and conversion probability.'
  },
  {
    icon: BarChart3,
    name: 'Data-Driven Insights',
    description: 'Advanced analytics and insights to optimize your sales strategy and performance.'
  },
  {
    icon: Layout,
    name: 'User-Friendly Dashboard',
    description: 'Intuitive interface that provides quick access to all essential features and metrics.'
  }
];

const Solution: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const navigate = useNavigate();

  const handleCardClick = (featureName: string): void => {
    switch (featureName) {
      case 'Smart, Centralized, Proactive CRM':
        navigate('/crm-dashboard');
        break;
      case 'Data-Driven Insights':
        navigate('/data-insights');
        break;
      case 'Automated Follow-ups':
        navigate('/follow-ups-dashboard');
        break;
      case 'AI Lead Prioritization':
        navigate('/ai-prioritizer-dashboard');
        break;
      default:
        console.log(`No route defined for: ${featureName}`);
    }
  };

  return (
    <section className="py-24 bg-white" id="features" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:text-center"
        >
          <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sm:text-4xl">
            The Smart Solution for Modern Lead Management
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Nurturebot X combines AI intelligence with powerful CRM features to transform your lead management process.
          </p>
        </motion.div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                onClick={() => handleCardClick(feature.name)}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + index * 0.2,
                  duration: 0.5,
                }}
                className="cursor-pointer relative bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 transition-all duration-300 group hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:shadow-lg"
              >
                <div>
                  <span className="rounded-xl inline-flex p-3 bg-gradient-to-br from-emerald-500 to-teal-500 text-white ring-4 ring-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-3 text-base text-gray-500 leading-relaxed group-hover:text-white">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;