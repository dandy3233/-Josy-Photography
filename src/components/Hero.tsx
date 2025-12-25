import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface HeroImage {
  id: string;
  url: string;
  title: string | null;
  subtitle: string | null;
}

interface HeroProps {
  fallbackImage?: string;
}

const Hero = ({ fallbackImage }: HeroProps) => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    const { data, error } = await supabase
      .from('hero_images')
      .select('id, url, title, subtitle')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      setImages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const currentImage = images[currentIndex];
  const displayImage = currentImage?.url || fallbackImage;

  if (loading) {
    return (
      <section className="relative h-screen w-full bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {displayImage ? (
            <img
              src={displayImage}
              alt={currentImage?.title || 'Josy Photography Hero'}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-background" />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
        </>
      )}

      {/* Main Content - Less overloaded, more breathing room */}
      <div className="relative z-10 h-full flex flex-col justify-end py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36">
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            {/* Tagline - Slightly smaller on mobile */}
            <motion.p
              key={`tagline-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-primary font-body text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 sm:mb-6"
            >
              {currentImage?.title || 'Visual Storytelling'}
            </motion.p>

            {/* Main Heading - Smoother scaling, less aggressive */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-4xl sm:text-5xl md:text-4xl lg:text-7xl xl:text-8xl leading-[0.92] text-white drop-shadow-2xl mb-6 md:mb-8"
            >
              Capturing
              <br />
              <span className="italic text-primary">Moments</span>
              <br />
              That Last
            </motion.h1>

            {/* Subtitle - Reduced size on smaller screens */}
            <motion.p
              key={`subtitle-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-base sm:text-lg md:text-xl text-white/90 max-w-xl leading-relaxed drop-shadow-md"
            >
              {currentImage?.subtitle ||
                'Premium photography that transforms fleeting moments into timeless art. Based in Oromia, Ethiopia, working worldwide.'}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? 'w-10 bg-primary'
                  : 'w-3 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#portfolio"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-white/70 hover:text-primary transition-colors"
        >
          <span className="text-xs sm:text-sm tracking-widest uppercase font-light">Scroll to Explore</span>
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.a>
      </motion.div>

      {/* Side Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2"
      >
        <p className="text-white/60 font-body text-xs tracking-[0.4em] uppercase [writing-mode:vertical-lr] rotate-180">
          Est. 2018 — Oromia, Ethiopia
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;