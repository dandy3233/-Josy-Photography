import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, ChevronDown } from 'lucide-react';
import { GALLERY_CATEGORIES } from '@/pages/CategoryGallery';

import Logo from "@/assets/Logo1.png";

const navLinks = [
  { name: 'Work', href: '#portfolio' },
  { name: 'Gallery', href: '/gallery', hasDropdown: true },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-lg border-b border-border/40 shadow-md py-2 sm:py-3'
            : 'bg-transparent py-4 sm:py-5 lg:py-6'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between">

            {/* Logo - Perfectly Scaled & Responsive */}
            <Link to="/" className="group relative flex items-center gap-3 flex-shrink-0">
              <img
                src={Logo}
                alt="Josy Photography Logo"
                className="h-14 sm:h-14 md:h-14 lg:h-14 xl:h-14 w-auto object-contain transition-all duration-300"
              />
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>

            {/* Desktop & Tablet Navigation - Shows from md+ */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setGalleryDropdownOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setGalleryDropdownOpen(false)}
                >
                  {link.hasDropdown ? (
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span className="group relative text-xs lg:text-sm font-body tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 py-2">
                        {link.name}
                        <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 lg:w-4 lg:h-4 text-muted-foreground transition-transform duration-300 ${
                          galleryDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="group relative text-xs lg:text-sm font-body tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 py-2"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </a>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.hasDropdown && galleryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-56"
                      >
                        <div className="bg-background/95 backdrop-blur-lg border border-border/50 py-4 rounded-2xl shadow-2xl">
                          {GALLERY_CATEGORIES.map((cat, catIndex) => (
                            <motion.div
                              key={cat}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: catIndex * 0.05 }}
                            >
                              <Link
                                to={`/gallery/category/${encodeURIComponent(cat)}`}
                                onClick={() => {
                                  setGalleryDropdownOpen(false);
                                  setIsOpen(false);
                                }}
                                className="block px-8 py-3 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
                              >
                                {cat}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Book Now Button */}
              <motion.a
                href="/booking"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="group relative overflow-hidden px-6 lg:px-8 py-3 bg-primary text-primary-foreground font-body text-xs lg:text-sm tracking-widest uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Now
                  <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-foreground"
                  initial={{ x: '100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </motion.a>
            </div>

            {/* Mobile Toggle Button - Larger & Better Positioned */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden relative z-50 p-3 text-foreground"
              aria-label="Open menu"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Full Screen & Safe Area Friendly */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background pt-safe-top pb-safe-bottom"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="flex justify-between items-center">
                <Link to="/" className="group relative flex items-center gap-3">
                  <img
                    src={Logo}
                    alt="Josy Photography Logo"
                    className="h-14 sm:h-14 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 text-foreground"
                  aria-label="Close menu"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full max-h-[calc(100vh-120px)] gap-10 px-6 overflow-y-auto"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center w-full"
                >
                  {link.hasDropdown ? (
                    <>
                      <span className="font-display text-5xl sm:text-6xl text-foreground block mb-8">
                        {link.name}
                      </span>
                      <div className="flex flex-col gap-6">
                        {GALLERY_CATEGORIES.map((cat) => (
                          <Link
                            key={cat}
                            to={`/gallery/category/${encodeURIComponent(cat)}`}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                        setIsOpen(false);
                      }}
                      className="font-display text-5xl sm:text-6xl text-foreground hover:text-primary transition-colors duration-300 block"
                    >
                      {link.name}
                    </a>
                  )}
                </motion.div>
              ))}

              <motion.a
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="mt-12 px-12 py-5 bg-primary text-primary-foreground rounded-full text-xl font-body tracking-widest uppercase shadow-2xl"
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;