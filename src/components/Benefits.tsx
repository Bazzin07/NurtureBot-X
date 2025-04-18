import React from 'react';
import { Dna, Brain, FileText, RefreshCw, PieChart, Bot, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: Dna,
    title: 'AI-Powered Lead DNA',
    description: 'Deep lead profiling that understands and predicts customer behavior patterns.',
  },
  {
    icon: Brain,
    title: 'Predictive Lead Intent',
    description: 'AI behavioral scoring to identify high-potential leads and optimal engagement timing.',
  },
  {
    icon: FileText,
    title: 'AI Call Summary Generator',
    description: 'Automated generation of call summaries and action items for efficient follow-up.',
  },
  {
    icon: RefreshCw,
    title: 'CRM Re-engagement',
    description: 'Smart identification of cold leads and automated proactive outreach strategies.',
  },
  {
    icon: PieChart,
    title: 'Deal Closing Probability',
    description: 'AI-powered predictions for deal success rates and winning strategies.',
  },
  {
    icon: Bot,
    title: 'AI Copilot for Sales',
    description: 'Intelligent assistant providing real-time guidance and recommendations.',
  },
];

const Benefits = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const navigate = useNavigate();

  const handleCardClick = (title: string) => {
    if (title === 'Predictive Lead Intent') {
      navigate('/predictive-intent');
    } else if (title === 'Deal Closing Probability') {
      navigate('/deal-closing');
    } else if (title === 'AI Copilot for Sales') {
      navigate('/ai-copilot');
    }
  };

  return (
    <section
      className="py-24 bg-gradient-to-b from-emerald-50 to-emerald-100/50"
      id="benefits"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sm:text-4xl">
            Transform Your Sales Performance
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Unlock the power of AI for your sales team with these powerful benefits
          </p>
        </motion.div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                onClick={() => handleCardClick(benefit.title)}
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
                    <benefit.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-500 leading-relaxed group-hover:text-white">
                    {benefit.description}
                  </p>
                </div>

                {/* Optional: Callout badge for Copilot */}
                {benefit.title === 'AI Copilot for Sales' && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-xs font-medium text-gray-900 px-2 py-1 rounded-full">
                    Try Now
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;