import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  PenTool as Tools,
  MessageSquare,
  TrendingDown,
} from "lucide-react";
import { useInView } from "react-intersection-observer"; // ✅ Correct import

const problems = [
  {
    icon: Users,
    title: "Overwhelmed Sales Teams",
    description:
      "Sales teams struggle to manage and nurture multiple leads effectively, leading to missed opportunities and reduced productivity.",
  },
  {
    icon: Tools,
    title: "Lack of Effective Tools",
    description:
      "Current CRM systems lack intelligent automation and personalization capabilities, making lead management a manual and time-consuming process.",
  },
  {
    icon: MessageSquare,
    title: "Inconsistent Lead Engagement",
    description:
      "Without proper tools, maintaining consistent and personalized communication with leads becomes challenging and often falls through the cracks.",
  },
  {
    icon: TrendingDown,
    title: "Suboptimal Conversion Rates",
    description:
      "Poor lead nurturing and follow-up processes result in lower conversion rates and lost revenue opportunities.",
  },
];

const Problem = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3, // Trigger when 30% visible
  });

  return (
    <section className="py-24 bg-gray-50/50" id="problems" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sm:text-4xl"
          >
            Common Challenges in Lead Management
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-500"
          >
            We understand the challenges sales teams face daily. Here's how
            Nurturebot X addresses these pain points.
          </motion.p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.4 + index * 0.2,
                  duration: 0.6,
                }}
                className="relative group bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <div>
                  <span className="rounded-xl inline-flex p-3 bg-gradient-to-br from-emerald-500 to-teal-500 text-white ring-4 ring-white">
                    <problem.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-500 leading-relaxed">
                    {problem.description}
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

export default Problem;