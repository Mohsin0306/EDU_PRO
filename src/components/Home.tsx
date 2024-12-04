import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaBus, FaUsers, FaChalkboardTeacher, FaMoneyBillWave, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaMobileAlt, FaCloudDownloadAlt, FaBell, FaChartLine, FaLock } from 'react-icons/fa';
import { BsChatDots, BsCalendarCheck } from 'react-icons/bs';
import { MdOnlinePrediction, MdLibraryBooks, MdMeetingRoom } from 'react-icons/md';
import { useInView } from 'react-intersection-observer';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RiUserAddLine, RiTeamLine, RiDashboardLine, RiShieldCheckLine } from 'react-icons/ri';
import { ErrorBoundary } from 'react-error-boundary';
import '../styles/globals.css';

const fixResizeObserverLoop = () => {
  const THROTTLE_TIMEOUT = 20;
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  const throttledResizeObserver = (entries: ResizeObserverEntry[]) => {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        if (entries && entries.length) {
          entries.forEach((entry) => {
            // Handle resize here
          });
        }
      }, THROTTLE_TIMEOUT);
    }
  };

  window.ResizeObserver = class ResizeObserver extends window.ResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      super((entries, observer) => {
        throttledResizeObserver(entries);
        if (callback) {
          callback(entries, observer);
        }
      });
    }
  };
};

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/coming-soon');
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent === 'accepted') {
      setShowCookieConsent(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    setShowCookieConsent(false);
    // You can also store the consent in localStorage
    localStorage.setItem('cookieConsent', 'accepted');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>EduManager Pro - Complete School Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Transform your school management with EduManager Pro. Features include student management, online classes, fee management, and more." />
        <meta name="keywords" content="school management system, education software, student management, online classes" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Navigation Links */}
        <nav className="p-4">
          <div className="container mx-auto">
            <div className="flex justify-end space-x-6">
              <a href="#" onClick={handleNavigation} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">Features</a>
              <a href="#" onClick={handleNavigation} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">About</a>
              <a href="#" onClick={handleNavigation} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient animate-gradient" />
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-6">
                Welcome to{' '}
                <span className="text-blue-600 dark:text-blue-400">EduManager Pro</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                Your Complete School Management Solution
              </p>
              <div className="flex space-x-4 justify-center mt-8">
                <button
                  onClick={() => navigate('/coming-soon')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate('/coming-soon')}
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-gray-600 dark:border-gray-400 rounded-full flex justify-center">
              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-16"
            >
              Comprehensive School Management Features
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-blue-50 dark:bg-gray-700 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-2xl">
                      {feature.icon}
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Online Classroom Section */}
        <section className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2 w-full"
              >
                <div className="relative mx-auto max-w-md">
                  <img
                    src="./images/online.webp"
                    alt="Virtual Classroom Interface"
                    className="rounded-2xl shadow-2xl w-full"
                  />
                  
                  {/* Floating Elements with better mobile positioning */}
                  <motion.div
                    animate={{
                      y: [-10, 10, -10],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 
                               sm:translate-x-1/3 sm:-translate-y-1/3
                               bg-white dark:bg-gray-700 p-3 sm:p-4 rounded-xl shadow-lg
                               max-w-[200px] sm:max-w-none"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                      <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                        24 Students Online
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [10, -10, 10],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 
                               sm:-translate-x-1/3 sm:translate-y-1/3
                               bg-white dark:bg-gray-700 p-3 sm:p-4 rounded-xl shadow-lg
                               max-w-[200px] sm:max-w-none"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                      <FaChalkboardTeacher className="text-blue-500 text-base sm:text-xl" />
                      <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                        Live Interactive Sessions
                      </span>
                    </div>
                  </motion.div>

                  {/* Optional: Add a decorative element for better mobile appearance */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-blue-500/20 dark:border-blue-400/20 
                                -m-4 hidden sm:block"></div>
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Transform Your Teaching with Our{' '}
                    <span className="text-blue-600 dark:text-blue-400">
                      Virtual Classroom
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Experience education like never before with our advanced virtual classroom platform.
                    Engage students in an interactive learning environment that makes online education effective and enjoyable.
                  </p>

                  <div className="space-y-4">
                    {classroomFeatures.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-start gap-4"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold
                               hover:bg-blue-700 transition-colors duration-300"
                    >
                      Start Teaching
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 
                               rounded-full font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/50 
                               transition-colors duration-300"
                    >
                      Watch Demo
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Developer & Producer Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                Meet the Creator
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                The mind behind EduManager Pro
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="md:flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <img
                      className="w-full h-64 md:h-full object-cover rounded-lg"
                      src="./images/developer.jpg"
                      alt="Developer"
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-blue-600 dark:text-blue-400 font-semibold">
                      Developer & Producer
                    </div>
                    <h3 className="mt-2 text-3xl leading-tight font-bold text-gray-900 dark:text-white">
                      Mohsin Ashraf
                    </h3>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                      A passionate full-stack developer with expertise in educational technology. 
                      Mohsin brings years of experience in creating innovative solutions for the education sector.
                    </p>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'MongoDB', 'AWS', 'UI/UX Design', 'EdTech'].map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex space-x-4">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://linkedin.com/in/mohsin-ashraf" // Add your LinkedIn profile
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        <FaLinkedin className="w-6 h-6" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://github.com/mohsin-ashraf" // Add your GitHub profile
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <FaGithub className="w-6 h-6" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://twitter.com/mohsin-ashraf" // Add your Twitter profile
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200"
                      >
                        <FaTwitter className="w-6 h-6" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-blue-600 dark:bg-blue-800">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              {stats.map((stat) => (
                <div className="text-center p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm sm:text-base">{stat.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Features Showcase */}
        <section className="py-20 mb-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-16"
            >
              Powerful Tools for Modern Education
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {showcaseFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                      <div className="text-3xl text-blue-600 dark:text-blue-400 mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {feature.description}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-600 dark:text-blue-400 font-semibold flex items-center"
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        {/* Registration Process Section */}
        <section className="py-20 mt-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Get Started in Minutes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Join thousands of educational institutions that trust EduManager Pro. Our simple registration process gets you up and running quickly.
              </p>
            </motion.div>

            {/* Registration Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {registrationSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg relative"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 
                                w-8 h-8 bg-blue-600 text-white rounded-full flex items-center 
                                justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4 mt-2">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Registration Benefits */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    Why Register with EduManager Pro?
                  </h3>
                  <ul className="space-y-4">
                    {registrationBenefits.map((benefit, index) => (
                      <motion.li
                        key={benefit.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="flex-shrink-0 w-6 h-6 text-green-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            {benefit.description}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    src="/images/dashboard.png"
                    alt="Dashboard Preview"
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-lg">
                    <p className="font-semibold">Start Free Trial</p>
                    <p className="text-sm">No credit card required</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full
                         font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Register Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Sign in</Link>
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-white mb-8"
              >
                Ready to Transform Your School Management?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl text-blue-100 mb-10"
              >
                Join thousands of schools already using EduManager Pro to streamline their operations
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold
                          hover:bg-blue-50 transition-colors duration-300 inline-block"
                >
                  Schedule a Demo
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mobile App Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2 mb-12 lg:mb-0"
              >
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                  Take Control On The Go
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Access your school management system anywhere, anytime with our mobile app.
                </p>
                <div className="flex flex-wrap gap-4">
                  {appFeatures.map((feature, index) => (
                    <div 
                      key={feature.title}
                      className="flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2"
                    >
                      <span className="text-blue-600 dark:text-blue-400 mr-2">{feature.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300">{feature.title}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                 
                  
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2 relative"
              >
                <motion.img
                  animate={{
                    y: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  src="/images/app.jpeg"
                  alt="Mobile App Preview"
                  className="w-full max-w-md mx-auto rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        
        {/* Footer */}
        <footer className="bg-gray-900 text-white pt-20 pb-10">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">EduManager Pro</h3>
                <p className="text-gray-400 mb-6">
                  Transforming education management with innovative solutions.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      whileHover={{ scale: 1.1 }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
              {footerLinks.map((column) => (
                <div key={column.title}>
                  <h4 className="text-lg font-semibold mb-6">{column.title}</h4>
                  <ul className="space-y-4">
                    {column.links.map((link) => (
                      <li key={link.text}>
                        <Link
                          to={link.url}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} EduManager Pro. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Add WhatsApp floating button */}
        <FloatingWhatsApp
          phoneNumber="+923313269415"
          accountName="EduManager Support"
          allowClickAway
          notification
          notificationDelay={30000}
          notificationSound
          statusMessage="Typically replies within 1 hour"
          chatMessage="Hello! 👋 How can we help you today?"
          darkMode={false}
        />

        {/* Add Scroll to Top button */}
        <ScrollToTop />

        {/* Add Cookie Consent */}
        {showCookieConsent && (
          <motion.div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-center sm:text-left mb-4 sm:mb-0">
                We use cookies to enhance your experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  onClick={handleAcceptCookies}
                  className="w-full sm:w-auto bg-blue-600 px-6 py-2 rounded-full"
                >
                  Accept
                </button>
                <button
                  onClick={() => setShowCookieConsent(false)}
                  className="w-full sm:w-auto bg-gray-700 px-6 py-2 rounded-full"
                >
                  Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Add Chat Support Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 left-8 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
          onClick={() => {/* Add chat support logic */}}
        >
          <BsChatDots className="w-6 h-6" />
        </motion.button>
      </div>
    </HelmetProvider>
  );
};

const features = [
  {
    icon: <FaGraduationCap />,
    title: "Academic Management",
    description: "Comprehensive tools for managing courses, classes, and academic progress tracking."
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Fee Management",
    description: "Streamlined fee collection, tracking, and reporting system."
  },
  {
    icon: <MdOnlinePrediction />,
    title: "Online Classes",
    description: "Integrated virtual classroom platform for seamless remote learning."
  },
  // Add more features...
];

const stats = [
  { value: "5000+", title: "Schools" },
  { value: "1M+", title: "Students" },
  { value: "100K+", title: "Teachers" },
  { value: "98%", title: "Satisfaction Rate" }
];

const showcaseFeatures = [
  {
    icon: <FaChalkboardTeacher className="w-8 h-8" />,
    title: "Virtual Classrooms",
    description: "Conduct seamless online classes with interactive whiteboards, screen sharing, and real-time collaboration tools."
  },
  {
    icon: <MdLibraryBooks className="w-8 h-8" />,
    title: "Digital Library",
    description: "Access thousands of educational resources, e-books, and research materials at your fingertips."
  },
  {
    icon: <BsChatDots className="w-8 h-8" />,
    title: "Communication Hub",
    description: "Stay connected with integrated messaging, announcements, and parent-teacher communication tools."
  },
  {
    icon: <FaBus className="w-8 h-8" />,
    title: "Transport Management",
    description: "Track school buses in real-time, manage routes, and ensure student safety during transit."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "School Principal",
    image: "/images/testimonials/sarah.jpg",
    quote: "EduManager Pro has revolutionized how we manage our school. The comprehensive features and user-friendly interface have made administrative tasks a breeze."
  },
  {
    name: "Michael Chen",
    role: "IT Administrator",
    image: "/images/testimonials/michael.jpg",
    quote: "The technical support and regular updates keep our system running smoothly. It's the most reliable school management solution we've used."
  },
  {
    name: "Emily Rodriguez",
    role: "Teacher",
    image: "/images/testimonials/emily.jpg",
    quote: "The virtual classroom features and student progress tracking tools have made remote learning effective and engaging for our students."
  }
];

const appFeatures = [
  {
    title: 'Mobile Access',
    icon: <FaMobileAlt size={20} />
  },
  {
    title: 'Offline Mode',
    icon: <FaCloudDownloadAlt size={20} />
  },
  {
    title: 'Push Notifications',
    icon: <FaBell size={20} />
  },
  {
    title: 'Performance Tracking',
    icon: <FaChartLine size={20} />
  },
  {
    title: 'Secure Data',
    icon: <FaLock size={20} />
  }
];

const newsUpdates = [
  {
    title: "New Virtual Lab Features Released",
    date: "June 15, 2024",
    image: "/images/news/virtual-lab.jpg",
    excerpt: "Experience enhanced virtual science labs with 3D models and interactive experiments."
  },
  {
    title: "Mobile App Update Available",
    date: "June 10, 2024",
    image: "/images/news/mobile-app.jpg",
    excerpt: "Download the latest version with improved performance and new features."
  },
  {
    title: "Success Stories: Wilson Academy",
    date: "June 5, 2024",
    image: "/images/news/success-story.jpg",
    excerpt: "Learn how Wilson Academy transformed their administration with EduManager Pro."
  }
];

const socialLinks = [
  { name: 'Facebook', icon: <FaFacebook size={24} />, url: '#' },
  { name: 'Twitter', icon: <FaTwitter size={24} />, url: '#' },
  { name: 'LinkedIn', icon: <FaLinkedin size={24} />, url: '#' },
  { name: 'Instagram', icon: <FaInstagram size={24} />, url: '#' }
];

const footerLinks = [
  {
    title: "Product",
    links: [
      { text: "Features", url: "/features" },
      { text: "Pricing", url: "/pricing" },
      { text: "Updates", url: "/updates" },
      { text: "Demo", url: "/demo" }
    ]
  },
  {
    title: "Resources",
    links: [
      { text: "Documentation", url: "/docs" },
      { text: "Training", url: "/training" },
      { text: "Blog", url: "/blog" },
      { text: "Support", url: "/support" }
    ]
  },
  {
    title: "Company",
    links: [
      { text: "About Us", url: "/about" },
      { text: "Careers", url: "/careers" },
      { text: "Contact", url: "/contact" },
      { text: "Partners", url: "/partners" }
    ]
  }
];

const classroomFeatures = [
  {
    icon: <MdOnlinePrediction className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Real-time Interaction",
    description: "Engage with students through live video, chat, and interactive whiteboards for an immersive learning experience."
  },
  {
    icon: <BsChatDots className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Collaborative Tools",
    description: "Enable group discussions, breakout rooms, and shared documents for effective collaborative learning."
  },
  {
    icon: <MdLibraryBooks className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Resource Integration",
    description: "Seamlessly integrate multimedia content, presentations, and educational resources into your lessons."
  },
  {
    icon: <BsCalendarCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Automated Attendance",
    description: "Track student participation and engagement with automated attendance and activity monitoring."
  }
];

const registrationSteps = [
  {
    icon: <RiUserAddLine className="mx-auto" />,
    title: "Create Account",
    description: "Fill in your basic information and create your administrator account."
  },
  {
    icon: <RiTeamLine className="mx-auto" />,
    title: "Add Your Team",
    description: "Invite teachers, staff, and other administrators to join your platform."
  },
  {
    icon: <RiDashboardLine className="mx-auto" />,
    title: "Setup Dashboard",
    description: "Customize your dashboard and configure school-specific settings."
  },
  {
    icon: <RiShieldCheckLine className="mx-auto" />,
    title: "Go Live",
    description: "Launch your platform and start managing your school efficiently."
  }
];

const registrationBenefits = [
  {
    title: "Free 30-Day Trial",
    description: "Experience all premium features free for 30 days with no commitment."
  },
  {
    title: "24/7 Support",
    description: "Get round-the-clock support from our dedicated technical team."
  },
  {
    title: "Data Security",
    description: "Enterprise-grade security with encrypted data storage and transfer."
  },
  {
    title: "Easy Migration",
    description: "Seamless data migration from your existing systems with expert assistance."
  },
  {
    title: "Training Resources",
    description: "Access comprehensive training materials and live webinars."
  },
  {
    title: "Regular Updates",
    description: "Stay up-to-date with continuous feature updates and improvements."
  }
];

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
    <motion.div
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
      className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
    />
  </div>
);

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 ${
        visible ? 'block' : 'hidden'
      }`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </motion.button>
  );
};

const FallbackBackground = () => (
  <div className="absolute inset-0 w-full h-full">
    <div className="w-full h-full bg-gradient-to-br from-blue-100 via-blue-50 to-white 
                    dark:from-gray-800 dark:via-gray-900 dark:to-gray-950" />
  </div>
);

export default HomePage;