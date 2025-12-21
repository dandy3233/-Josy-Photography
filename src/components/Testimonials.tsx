import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Josy has an extraordinary ability to capture the essence of a moment. The photos from our wedding day are absolutely breathtaking—each one tells a story.",
    author: "Sarah & Michael Thompson",
    role: "Wedding Clients",
  },
  {
    quote: "Working with Josy transformed our brand's visual identity. Her attention to detail and artistic vision exceeded all expectations. Truly world-class.",
    author: "Alexandra Chen",
    role: "Creative Director, Vogue",
  },
  {
    quote: "The portrait session was an incredible experience. Josy made me feel completely at ease, and the results speak for themselves. Pure artistry.",
    author: "James Rodriguez",
    role: "Actor & Musician",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 bg-card" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              Testimonials
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              Kind Words
            </h2>
          </motion.div>

          {/* Testimonial Slider */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-4 left-0 lg:-left-8">
              <Quote className="w-16 h-16 text-primary/20" />
            </div>

            {/* Testimonial Content */}
            <div className="relative overflow-hidden min-h-[280px]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: currentIndex === index ? 1 : 0,
                    x: currentIndex === index ? 0 : 50,
                    position: currentIndex === index ? 'relative' : 'absolute',
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                  style={{ top: 0, left: 0 }}
                >
                  <blockquote className="text-center">
                    <p className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed italic mb-12">
                      "{testimonial.quote}"
                    </p>
                    <footer>
                      <p className="font-body text-lg text-foreground mb-1">
                        {testimonial.author}
                      </p>
                      <p className="font-body text-sm text-muted-foreground tracking-[0.15em] uppercase">
                        {testimonial.role}
                      </p>
                    </footer>
                  </blockquote>
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
