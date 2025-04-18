import React from 'react';
import { motion } from 'framer-motion';
import {
  Repeat, Mail, BrainCog, BarChart3, Clock, FileText, Calendar, Puzzle, BellOff, BellRing
} from 'lucide-react';

const features = [
  {
    icon: <Repeat className="w-6 h-6" />,
    title: 'Follow-up Workflow Builder',
    description: 'Create automation flows with time-based or response-based actions.',
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Multi-Channel Follow-ups',
    description: 'Send via Email, WhatsApp, Chatbot, or set Call reminders.',
  },
  {
    icon: <BrainCog className="w-6 h-6" />,
    title: 'Personalization Engine',
    description: 'Use lead data to generate hyper-personalized messages.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Engagement Metrics',
    description: 'Track open, click, reply, and bounce rates across sequences.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Smart Timing / Scheduling',
    description: 'Schedule sends smartly based on AI or business hours.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Templates Library',
    description: 'Use and customize pre-built email and message templates.',
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Follow-up Calendar View',
    description: 'View all follow-ups visually in a calendar format.',
  },
  {
    icon: <Puzzle className="w-6 h-6" />,
    title: 'Trigger-Based Follow-ups',
    description: 'Add conditional logic like "If no reply, do X".',
  },
  {
    icon: <BellOff className="w-6 h-6" />,
    title: 'Lead Unsubscribe & Mute Options',
    description: 'Respect user preferences with auto-stop and mute features.',
  },
  {
    icon: <BellRing className="w-6 h-6" />,
    title: 'Real-time Notifications for Replies',
    description: 'Get notified when leads reply, skip, or complete a sequence.',
  }
];

const FollowUpsDashboard: React.FC = () => {
  return (
    <section className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          📩 Automated Follow-ups Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg hover:bg-emerald-50 transition cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4 text-emerald-600">
                {feature.icon}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FollowUpsDashboard;