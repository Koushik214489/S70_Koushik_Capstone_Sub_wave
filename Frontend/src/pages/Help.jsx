import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  QuestionMarkCircleIcon,
  ChatBubbleOvalLeftIcon,
  DocumentIcon,
  BookOpenIcon,
  EnvelopeIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="border-b border-white/5 last:border-0"
    >
      <button
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-bold text-gray-200 group-hover:text-primary transition-colors">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-6 flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors"
        >
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 pt-2">
              <p className="text-gray-400 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay, gradient }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.a
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      href={`#${title.toLowerCase()}`}
      className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:bg-white/10 transition-all duration-300 group relative overflow-hidden flex flex-col items-center text-center"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </motion.a>
  );
};

const Help = () => {
  const faqs = [
    {
      question: 'How do I add a new subscription?',
      answer: 'To add a new subscription, go to the Dashboard or Subscriptions page and click the "+ Add New" or "+ Add Subscription" button. Fill in the required details like service name, cost, billing cycle, and next renewal date.',
    },
    {
      question: 'How can I track my spending?',
      answer: 'You can track your spending through the Dashboard which provides a high-level summary, or the detailed Budget page which breaks down your expenses by category and tracks your progress against your set monthly budget.',
    },
    {
      question: 'Will I be notified before a subscription renews?',
      answer: 'Yes! SubWave will automatically alert you based on your Notification Preferences. You can manage these in the Notifications tab to receive alerts via email or push notifications before a payment is due.',
    },
    {
      question: 'Can I export my subscription data?',
      answer: 'Currently, subscription data export is available for Pro users in the Settings tab under Billing. You can export to CSV or PDF formats.',
    },
    {
      question: 'How do I change my primary currency?',
      answer: 'Navigate to the Settings page and select the Preferences tab. From there, you can choose your preferred currency from the dropdown menu. All charts and numbers will automatically update.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4 mb-8"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-primary border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/20 blur-xl"></div>
          <QuestionMarkCircleIcon className="w-8 h-8 text-white relative z-10" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Help & Support</h1>
          <p className="text-gray-400">Everything you need to know about using SubWave.</p>
        </div>
      </motion.div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          icon={EnvelopeIcon}
          title="Email Support"
          description="Get help via email within 24 hours. Ideal for account or billing issues."
          delay={0.1}
          gradient="from-blue-500/5 to-primary/5"
        />
        <FeatureCard
          icon={ChatBubbleOvalLeftIcon}
          title="Live Chat"
          description="Chat with our support team in real-time for immediate assistance."
          delay={0.2}
          gradient="from-secondary/5 to-accent/5"
        />
        <FeatureCard
          icon={DocumentIcon}
          title="Documentation"
          description="Browse our detailed guides and API documentation for developers."
          delay={0.3}
          gradient="from-accent/5 to-orange-500/5"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden shadow-2xl h-fit"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Frequently Asked Questions</h2>

          <div className="relative z-10">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </motion.div>

        {/* Contact Side Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border border-secondary/30 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <div className="w-20 h-20 mx-auto bg-black/40 border border-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative z-10">
              <span className="text-4xl">👋</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">Still need help?</h3>
            <p className="text-gray-300 text-sm mb-8 relative z-10">
              Our customer success team is available 24/7 to assist you with any questions.
            </p>
            <button className="w-full px-6 py-3 bg-white text-purple-900 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 relative z-10">
              Contact Support
            </button>
          </div>

          <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <h3 className="text-white font-bold mb-4">Quick Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-sm text-gray-400 hover:text-primary transition-colors group">
                  <BookOpenIcon className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" /> Getting Started Guide
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-sm text-gray-400 hover:text-secondary transition-colors group">
                  <QuestionMarkCircleIcon className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" /> Keyboard Shortcuts
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;