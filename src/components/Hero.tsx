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

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

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
      <section className="relative h-screen w-full overflow-hidden bg-background">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {displayImage && (
            <img
              src={displayImage}
              alt={currentImage?.title || 'Josy Photography - Visual Storytelling'}
              className="w-full h-full object-cover"
            />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
          <div className="absolute inset-0 bg-background/30" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-background/20 backdrop-blur-sm border border-border/30 text-foreground/80 hover:bg-background/40 hover:text-foreground transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-background/20 backdrop-blur-sm border border-border/30 text-foreground/80 hover:bg-background/40 hover:text-foreground transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            {/* Tagline */}
            <motion.p
              key={`tagline-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6"
            >
              {currentImage?.title || 'Visual Storytelling'}
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.95] mb-8"
            >
              Capturing
              <br />
              <span className="italic text-primary">Moments</span>
              <br />
              That Last
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              key={`subtitle-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              {currentImage?.subtitle || 'Premium photography that transforms fleeting moments into timeless art. Based in Oromia, Ethiopia, working worldwide.'}
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'bg-foreground/30 hover:bg-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator - only show when no indicators */}
      {images.length <= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#portfolio"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <span className="text-xs tracking-[0.2em] uppercase font-body">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      )}

      {/* Side Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground [writing-mode:vertical-lr] rotate-180">
          Est. 2018 — Oromia, Ethiopia
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
