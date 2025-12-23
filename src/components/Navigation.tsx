// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, Calendar } from 'lucide-react';
// import { GALLERY_CATEGORIES } from '@/pages/CategoryGallery';

// import Logo from "@/assets/Logo1.png";

// const navLinks = [
//   { name: 'Work', href: '#portfolio' },
//   { name: 'Gallery', href: '/gallery', hasDropdown: true },
//   { name: 'About', href: '#about' },
//   { name: 'Services', href: '#services' },
//   { name: 'Contact', href: '#contact' },
//   // { name: 'Galleries', href: '/galleries' },
// ];

// const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleNavClick = (href: string) => {
//     setIsOpen(false);
//     if (href.startsWith('/#')) {
//       const sectionId = href.replace('/#', '');
//       if (location.pathname === '/') {
//         const element = document.getElementById(sectionId);
//         element?.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   };

//   return (
//     <>
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border/50' : ''
//         }`}
//       >
//         <nav className="container mx-auto px-6 lg:px-12 py-6">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <a href="/" className="group relative flex items-center gap-3">
//               <img
//                 src={Logo}
//                 alt="Josy Photography Logo"
//                 className="h-14 w-auto object-contain"
//               />
//               <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
//             </a>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-12">
//               {navLinks.map((link, index) => (
//                 <motion.a
//                   key={link.name}
//                   href={link.href}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className="group relative text-sm font-body tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
//                 >
//                   {link.name}
//                   <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
//                 </motion.a>
//               ))}

//               {/* Modern Advanced Book Now Button in Header */}
//               <motion.a
//                 href="/booking"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.5 }}
//                 className="group relative overflow-hidden px-8 py-3.5 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full shadow-lg hover:shadow-2xl transition-all duration-500"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   Book Now
//                   <Calendar className="w-4 h-4" />
//                 </span>
//                 <motion.div
//                   className="absolute inset-0 bg-foreground"
//                   initial={{ x: '100%' }}
//                   whileHover={{ x: '0%' }}
//                   transition={{ duration: 0.5, ease: 'easeInOut' }}
//                 />
//                 <motion.div
//                   className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20"
//                   initial={{ scale: 0.8 }}
//                   whileHover={{ scale: 1.2 }}
//                   transition={{ duration: 0.6 }}
//                 />
//               </motion.a>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(true)}
//               className="md:hidden relative z-50 p-2 text-foreground"
//               aria-label="Open menu"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//           </div>
//         </nav>
//       </motion.header>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-50 bg-background"
//           >
//             <div className="container mx-auto px-6 py-6">
//               <div className="flex justify-between items-center">
//                 {/* Logo */}
//             <a href="/" className="group relative flex items-center gap-3">
//               <img
//                 src={Logo}
//                 alt="Josy Photography Logo"
//                 className="h-14 w-auto object-contain"
//               />
//               <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
//             </a>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="p-2 text-foreground"
//                   aria-label="Close menu"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//             </div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3, delay: 0.1 }}
//               className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-8"
//             >
//               {navLinks.map((link, index) => (
//                 <motion.a
//                   key={link.name}
//                   href={link.href}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   onClick={() => setIsOpen(false)}
//                   className="font-display text-4xl text-foreground hover:text-primary transition-colors duration-300"
//                 >
//                   {link.name}
//                 </motion.a>
//               ))}

//               {/* Mobile Book Now Button */}
//               <motion.a
//                 href="/booking"
//                 className="mt-8 px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-body tracking-wider uppercase shadow-2xl"
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Book Now
//               </motion.a>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navigation;

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  const location = useLocation();

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
          isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border/50' : ''
        }`}
      >
        <nav className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group relative flex items-center gap-3">
              <img
                src={Logo}
                alt="Josy Photography Logo"
                className="h-14 w-auto object-contain"
              />
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
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
                    <div className="flex items-center gap-1">
                      <span className="group relative text-sm font-body tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer">
                        {link.name}
                        <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
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
                      className="group relative text-sm font-body tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </a>
                  )}

                  {/* Gallery Dropdown */}
                  <AnimatePresence>
                    {link.hasDropdown && galleryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48"
                      >
                        <div className="bg-background/95 backdrop-blur-md border border-border/50 py-3 rounded-lg shadow-xl">
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
                                className="block px-6 py-2.5 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors duration-200"
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
                className="group relative overflow-hidden px-8 py-3.5 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Now
                  <Calendar className="w-4 h-4" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-foreground"
                  initial={{ x: '100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden relative z-50 p-2 text-foreground"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="flex justify-between items-center">
                <Link to="/" className="group relative flex items-center gap-3">
                  <img
                    src={Logo}
                    alt="Josy Photography Logo"
                    className="h-14 w-auto object-contain"
                  />
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-foreground"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {link.hasDropdown ? (
                    <div className="text-center">
                      <span className="font-display text-4xl text-foreground block mb-6">
                        {link.name}
                      </span>
                      <div className="flex flex-col gap-4 mt-4">
                        {GALLERY_CATEGORIES.map((cat) => (
                          <Link
                            key={cat}
                            to={`/gallery/category/${encodeURIComponent(cat)}`}
                            onClick={() => setIsOpen(false)}
                            className="text-xl text-muted-foreground hover:text-primary transition-colors"
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                        setIsOpen(false);
                      }}
                      className="font-display text-4xl text-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  )}
                </motion.div>
              ))}

              <motion.a
                href="/booking"
                className="mt-8 px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-body tracking-wider uppercase shadow-2xl"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
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