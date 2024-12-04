import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaClock, FaBell, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { subscribeEmail, handleSocialShare } from '../services/notificationService';

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await subscribeEmail(email);
      showNotification(result.message, result.success ? 'success' : 'error');
      if (result.success) {
        setEmail('');
      }
    } catch (error) {
      showNotification('Something went wrong. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (platform: string) => {
    const result = handleSocialShare(platform);
    showNotification(result.message, result.success ? 'info' : 'error');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-8 left-8"
        >
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-6xl mb-8"
          >
            <FaRocket className="inline-block text-blue-400" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Coming Soon
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            We're working hard to bring you something amazing!
          </motion.p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <FaClock className="text-blue-400" />,
                title: "Launch Countdown",
                description: "Stay tuned for our exciting launch",
              },
              {
                icon: <FaBell className="text-purple-400" />,
                title: "Get Notified",
                description: "Subscribe to receive updates",
              },
              {
                icon: <FaEnvelope className="text-pink-400" />,
                title: "Early Access",
                description: "Be the first to experience it",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
                className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-400 transition-colors"
                required
                disabled={isSubmitting}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold 
                  hover:from-blue-600 hover:to-purple-600 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : 'Notify Me'}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex justify-center space-x-6"
          >
            {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
              <motion.button
                key={social}
                onClick={() => handleSocialClick(social)}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <span className="sr-only">{social}</span>
                <i className={`fab fa-${social.toLowerCase()} text-2xl`}></i>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default ComingSoon;
