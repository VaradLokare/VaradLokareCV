import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import myPhoto from "./Images/Gemini_Generated_Image_a3nulva3nulva3nu (1).png";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [activePage, setActivePage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Refs for scroll animations
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Refs for GSAP animations
  const sphereRef = useRef(null);
  const cubeRef = useRef(null);
  const pyramidRef = useRef(null);
  const torusRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const titleRef = useRef(null);
  const animatedLinesRef = useRef([]);
  
  // Animation controls
  const mainControls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  // Initialize GSAP animations
  useEffect(() => {
    // Sphere animation
    gsap.to(sphereRef.current, {
      rotationY: 360,
      rotationX: 20,
      duration: 15,
      repeat: -1,
      ease: "none"
    });

    // Cube animation
    gsap.to(cubeRef.current, {
      rotationY: 360,
      rotationZ: 15,
      duration: 20,
      repeat: -1,
      ease: "power1.inOut",
      yoyo: true
    });

    // Pyramid animation
    gsap.to(pyramidRef.current, {
      rotationY: 180,
      rotationX: 45,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Torus animation
    gsap.to(torusRef.current, {
      rotationY: 360,
      rotationX: 360,
      duration: 25,
      repeat: -1,
      ease: "power2.inOut"
    });

    // Floating elements animation
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          y: index % 2 === 0 ? -30 : 30,
          rotation: index % 2 === 0 ? 10 : -10,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5
        });
      }
    });

    // Animated lines
    animatedLinesRef.current.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          scaleX: 1.2,
          duration: 2 + index,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.3
        });
      }
    });

    // Title animation with GSAP
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Animated grid background
    const gridItems = document.querySelectorAll('.grid-bg-item');
    gridItems.forEach((item, index) => {
      gsap.to(item, {
        opacity: 0.7,
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });
    });

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 75 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const rotateIn = {
    hidden: { opacity: 0, rotate: -5 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Navigation handler
  const handleNavigation = (page) => {
    setActivePage(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Render the appropriate page content
  const renderPageContent = () => {
    switch(activePage) {
      case 'work':
        return <WorkPage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-900 overflow-hidden relative" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Animated grid background */}
      <div className="fixed inset-0 -z-20 opacity-10">
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-2">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i}
              className="grid-bg-item bg-blue-300 rounded-sm"
              style={{ opacity: 0.3 }}
            ></div>
          ))}
        </div>
      </div>

      {/* Animated background elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        {/* Sphere element */}
        <div 
          ref={sphereRef}
          className="absolute top-20 left-10% w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-80 shadow-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        ></div>
        
        {/* Cube element */}
        <div 
          ref={cubeRef}
          className="absolute bottom-20 right-10% w-32 h-32 bg-gradient-to-br from-yellow-300 to-pink-400 opacity-80 shadow-2xl"
          style={{ transformStyle: 'preserve-3d', borderRadius: '15px' }}
        ></div>
        
        {/* Pyramid element */}
        <div 
          ref={pyramidRef}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 opacity-80 shadow-2xl"
          style={{ 
            transformStyle: 'preserve-3d',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        ></div>
        
        {/* Torus element */}
        <div 
          ref={torusRef}
          className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-gradient-to-br from-red-400 to-orange-500 opacity-80 shadow-2xl"
          style={{ 
            transformStyle: 'preserve-3d',
            borderRadius: '50% / 10%'
          }}
        ></div>
        
        {/* Animated lines */}
        {[1, 2, 3].map((_, i) => (
          <div 
            key={i}
            ref={el => animatedLinesRef.current[i] = el}
            className={`absolute h-1 bg-gradient-to-r from-blue-400 to-purple-500 opacity-60`}
            style={{
              top: `${15 + i * 25}%`,
              left: `${5}%`,
              width: `${30 + i * 10}%`,
              transform: `rotate(${i * 15}deg)`
            }}
          ></div>
        ))}
        
        {/* Floating elements */}
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div 
            key={i}
            ref={el => floatingElementsRef.current[i] = el}
            className={`absolute w-10 h-10 rounded-full opacity-60 ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'}`}
            style={{
              top: `${15 + i * 10}%`,
              left: `${5 + i * 15}%`,
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`
            }}
          ></div>
        ))}
        
        <motion.div 
          className="absolute top-10% left-5% w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-40"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10% right-5% w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-yellow-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      {/* Header Section */}
      <motion.header 
        className="container mx-auto px-6 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => handleNavigation('home')}
            className="cursor-pointer"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Varad Lokare
            </h1>
            <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>Software Engineer</p>
          </motion.div>
          
          <nav className="hidden md:flex space-x-8">
            {[
              { id: 'work', label: 'Work' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <motion.a 
                key={item.id}
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigation(item.id); }}
                className={`${activePage === item.id ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition-colors relative group`}
                whileHover={{ y: -2 }}
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 ${activePage === item.id ? 'w-full' : 'w-0'} h-0.5 bg-blue-600 transition-all group-hover:w-full`}></span>
              </motion.a>
            ))}
          </nav>
          
          <motion.button 
            className="md:hidden text-2xl"
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div 
            className="md:hidden mt-4 bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {[
                { id: 'work', label: 'Work' },
                { id: 'about', label: 'About' },
                { id: 'services', label: 'Services' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <a 
                  key={item.id}
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavigation(item.id); }}
                  className={`${activePage === item.id ? 'text-blue-600 font-semibold' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Main Content */}
      {renderPageContent()}

      {/* Footer - Show on all pages except contact */}
      {activePage !== 'contact' && (
        <motion.footer 
          className="bg-white py-16 border-t border-gray-100 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Varad Lokare
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "'Open Sans', sans-serif" }}>Software Engineer</p>
              </div>
              
              <div className="flex space-x-6">
                {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map((item, index) => (
                  <motion.a 
                    key={index}
                    href="#" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-gray-600" style={{ fontFamily: "'Open Sans', sans-serif" }}>© {new Date().getFullYear()} Varad Lokare</p>
                <p className="text-gray-500 text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>All rights reserved</p>
              </div>
            </div>
          </div>
        </motion.footer>
      )}
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  const heroRef = useRef(null);
  
  useEffect(() => {
    // Hero section animations
    gsap.fromTo(".hero-title", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-title",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    gsap.fromTo(".hero-avatar", 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".hero-avatar",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    gsap.fromTo(".hero-text", 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hero-text",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Stats counter animation
    gsap.to(".stat-number", {
      textContent: function(i, target) {
        return parseInt(target.getAttribute("data-value"));
      },
      duration: 2,
      ease: "power1.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      onUpdate: function() {
        this.targets()[0].textContent = Math.ceil(this.targets()[0].textContent);
      }
    });
  }, []);
  
  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Large title covering the whole width */}
        <motion.div 
          className="absolute w-full text-center z-0 hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tight opacity-10 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent" style={{ fontFamily: "'Poppins', sans-serif", lineHeight: '0.9' }}>
            Varad Lokare
          </h1>
        </motion.div>
        
        {/* Avatar image positioned over the title */}
        <motion.div 
          className="relative z-10 flex flex-col items-center hero-avatar"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl relative">
            {/* Image */}
            <img
              src={myPhoto}
              alt="Varad Lokare"
              className="w-full h-full object-cover"
            />

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full"></div>
          </div>
          
          <motion.div 
            className="mt-8 text-center hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
             Software Engineer
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              I’m passionate about building creative digital solutions — from websites and applications to innovative platforms that solve real-world challenges. With experience in React, Firebase, and modern web technologies, I love turning ideas into impactful projects that connect people and businesses.
            </p>
            
            <motion.div 
              className="flex justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="relative z-10">View Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button 
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg shadow-sm hover:shadow-md transition-all hover:border-blue-400 group relative overflow-hidden"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="relative z-10">Contact Me</span>
                <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-gray-600 text-sm mb-2">Scroll down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="bg-white py-16 border-y border-gray-100 relative stats-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated background elements for stats */}
        <div className="absolute -top-20 right-10 w-40 h-40 bg-blue-100 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 left-10 w-40 h-40 bg-purple-100 rounded-full filter blur-3xl opacity-30"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-4xl font-bold text-gray-900 mb-2 stat-number" data-value={stat.value} style={{ fontFamily: "'Poppins', sans-serif" }}>0</h3>
                <p className="text-gray-600 text-sm uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Preview Section */}
      <section className="container mx-auto px-6 py-24 relative">
        {/* Animated decorative elements */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-yellow-100 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-pink-100 rounded-full filter blur-3xl opacity-20"></div>
        
        <motion.div
          className="mb-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-500 text-sm mb-2 block" style={{ fontFamily: "'Open Sans', sans-serif" }}>// SERVICES</span>
          
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 max-w-2xl"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Development & Design Solutions
          </h2>
          
          <p 
            className="text-lg text-gray-700 max-w-2xl"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Creating digital experiences that combine technical excellence with beautiful design, 
            delivering solutions that users love.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {services.slice(0, 3).map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-blue-100 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {service.title}
                </h3>
                <span className="text-gray-400 text-sm bg-gray-100 px-3 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  {service.number}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6 relative z-10" style={{ fontFamily: "'Open Sans', sans-serif" }}>{service.description}</p>
              
              <motion.div 
                className="text-blue-500 font-medium flex items-center gap-2 relative z-10"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                <span>Learn more</span>
                <span>→</span>
              </motion.div>
              
              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            View All Services
          </motion.button>
        </motion.div>
      </section>

      {/* Testimonial Section */}
      <motion.section 
        className="bg-gray-50 py-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Animated decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-100 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-5xl text-gray-300 mb-8"
            >
              "
            </motion.div>
            
            <motion.p 
              className="text-2xl font-light text-gray-800 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Varad transformed our web application with incredible technical expertise and creative vision. The results exceeded our expectations and helped us stand out in a crowded market.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="font-semibold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>Sarah Johnson</p>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>CEO, Nexus Technologies</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Animated decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white rounded-full opacity-10"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white rounded-full opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Ready to bring your vision to life?
          </motion.h2>
          
          <motion.p 
            className="text-xl opacity-90 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Let's collaborate to create something extraordinary that resonates with your audience.
          </motion.p>
          
          <motion.button 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all font-semibold relative overflow-hidden group"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onClick={() => window.location.href = '#contact'}
          >
            <span className="relative z-10">Start a Project</span>
            <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </div>
      </motion.section>
    </>
  );
};

// Work Page Component
const WorkPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'design', label: 'UI/UX Design' }
  ];
  
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'A full-featured online shopping platform with payment integration and inventory management.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Fitness Tracking App',
      category: 'mobile',
      description: 'Mobile application for tracking workouts, nutrition, and health metrics.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['React Native', 'Firebase', 'Redux']
    },
    {
      id: 3,
      title: 'Corporate Website Redesign',
      category: 'design',
      description: 'Complete redesign of corporate website with improved UX and modern aesthetics.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['Figma', 'Adobe XD', 'Illustrator']
    },
    {
      id: 4,
      title: 'Task Management System',
      category: 'web',
      description: 'Project management tool with team collaboration features and real-time updates.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['Vue.js', 'Express', 'PostgreSQL']
    },
    {
      id: 5,
      title: 'Travel Companion App',
      category: 'mobile',
      description: 'Mobile guide for travelers with offline maps and local recommendations.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['Flutter', 'Google Maps API', 'SQLite']
    },
    {
      id: 6,
      title: 'Brand Identity Design',
      category: 'design',
      description: 'Complete brand identity package including logo, style guide, and marketing materials.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['Illustrator', 'Photoshop', 'InDesign']
    }
  ];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
  return (
    <section className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>My Work</h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-10" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          A selection of projects I've worked on, showcasing my skills in development and design.
        </p>
      </motion.div>
      
      {/* Category Filters */}
      <motion.div 
        className="flex flex-wrap gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-2 rounded-full transition-all ${selectedCategory === category.id 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            {category.label}
          </button>
        ))}
      </motion.div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div 
            key={project.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
              {project.title}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{project.title}</h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i}
                    className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <motion.button 
                className="text-blue-600 font-medium flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                <span>View Project</span>
                <span>→</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// About Page Component
const AboutPage = () => {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'AWS', level: 65 }
  ];
  
  const experiences = [
    {
      role: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      period: '2021 - Present',
      description: 'Leading frontend development for various client projects, implementing modern frameworks and best practices.'
    },
    {
      role: 'Web Developer',
      company: 'Digital Solutions LLC',
      period: '2019 - 2021',
      description: 'Developed and maintained web applications for clients across various industries.'
    },
    {
      role: 'UI/UX Designer',
      company: 'Creative Minds Agency',
      period: '2017 - 2019',
      description: 'Created user-centered designs for websites and mobile applications, focusing on usability and aesthetics.'
    }
  ];
  
  const education = [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'University of Technology',
      period: '2013 - 2017'
    },
    {
      degree: 'Web Development Bootcamp',
      institution: 'Code Academy',
      period: '2016'
    }
  ];
  
  return (
    <section className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>About Me</h1>
        <p className="text-lg text-gray-700 max-w-3xl" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          I'm a passionate software engineer with over 5 years of experience creating digital solutions 
          that combine technical excellence with user-centered design. My approach focuses on writing 
          clean, maintainable code while delivering exceptional user experiences.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>Skills & Expertise</h2>
          
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span style={{ fontFamily: "'Open Sans', sans-serif" }}>{skill.name}</span>
                  <span style={{ fontFamily: "'Open Sans', sans-serif" }}>{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>Experience</h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-blue-200">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="text-xl font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>{exp.role}</h3>
                <p className="text-gray-600 mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>{exp.company} • {exp.period}</p>
                <p className="text-gray-700" style={{ fontFamily: "'Open Sans', sans-serif" }}>{exp.description}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mt-12 mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>Education</h2>
          
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-blue-200">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="text-xl font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>{edu.degree}</h3>
                <p className="text-gray-600 mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>{edu.institution} • {edu.period}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Services Page Component
const ServicesPage = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>Services</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          I offer a range of services to help bring your digital ideas to life with technical excellence and creative design.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-blue-100 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {service.title}
              </h3>
              <span className="text-gray-400 text-sm bg-gray-100 px-3 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                {service.number}
              </span>
            </div>
            
            <p className="text-gray-600 mb-6 relative z-10" style={{ fontFamily: "'Open Sans', sans-serif" }}>{service.description}</p>
            
            <motion.div 
              className="text-blue-500 font-medium flex items-center gap-2 relative z-10"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              <span>Learn more</span>
              <span>→</span>
            </motion.div>
            
            {/* Hover effect line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
          </motion.div>
        ))}
      </div>
      
      {/* Process Section */}
      <motion.div 
        className="mt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-center mb-16" style={{ fontFamily: "'Poppins', sans-serif" }}>My Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Discovery', description: 'Understanding your goals, audience, and requirements.' },
            { step: '02', title: 'Planning', description: 'Creating a detailed project roadmap and architecture.' },
            { step: '03', title: 'Execution', description: 'Developing the solution with regular updates and feedback.' },
            { step: '04', title: 'Delivery', description: 'Launching and maintaining the finished product.' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-4 mx-auto">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.title}</h3>
              <p className="text-gray-600" style={{ fontFamily: "'Open Sans', sans-serif" }}>{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Contact Page Component
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <section className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>Get In Touch</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          Have a project in mind or want to discuss potential collaboration? I'd love to hear from you.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
        >
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-gray-700 mb-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              ></textarea>
            </div>
            
            <motion.button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all font-semibold"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
        
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>Email</h3>
                <p className="text-gray-600" style={{ fontFamily: "'Open Sans', sans-serif" }}>varad@example.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>Phone</h3>
                <p className="text-gray-600" style={{ fontFamily: "'Open Sans', sans-serif" }}>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>Location</h3>
                <p className="text-gray-600" style={{ fontFamily: "'Open Sans', sans-serif" }}>San Francisco, California</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Connect With Me</h3>
            <div className="flex space-x-4">
              {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map((item, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.charAt(0)}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const services = [
  {
    title: "Web Development",
    number: "01",
    description: "Building responsive, modern web applications with the latest technologies and frameworks."
  },
  {
    title: "UI/UX Design",
    number: "02",
    description: "Creating intuitive user interfaces and experiences that delight users and drive engagement."
  },
  {
    title: "Mobile Apps",
    number: "03",
    description: "Developing cross-platform mobile applications that work seamlessly on iOS and Android."
  },
  {
    title: "API Development",
    number: "04",
    description: "Designing and building robust RESTful APIs and GraphQL endpoints for your applications."
  },
  {
    title: "DevOps & Deployment",
    number: "05",
    description: "Setting up CI/CD pipelines and deploying applications to cloud platforms with best practices."
  },
  {
    title: "Technical Consulting",
    number: "06",
    description: "Providing expert advice on technology stack, architecture, and implementation strategies."
  }
];

const stats = [
  { value: "50", label: "Projects Completed" },
  { value: "5", label: "Years Experience" },
  { value: "25", label: "Happy Clients" },
  { value: "15", label: "Technologies" }
];

export default Portfolio;