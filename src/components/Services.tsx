import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Camera, Heart, Building2, Sparkles, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Camera,
    title: 'Portrait Photography',
    description: 'Intimate, evocative portraits that capture personality and essence. Perfect for professionals, artists, and personal branding.',
    features: ['Studio & Location', 'Retouching Included', '50+ Edited Images'],
  },
  {
    icon: Heart,
    title: 'Wedding & Events',
    description: 'Timeless documentation of your most precious moments. From intimate ceremonies to grand celebrations.',
    features: ['Full Day Coverage', 'Second Photographer', 'Custom Album'],
  },
  {
    icon: Building2,
    title: 'Commercial & Editorial',
    description: 'High-impact imagery for brands, publications, and campaigns that demand excellence.',
    features: ['Creative Direction', 'Team Coordination', 'Usage Rights'],
  },
  {
    icon: Sparkles,
    title: 'Fine Art & Conceptual',
    description: 'Artistic collaborations that push boundaries and create gallery-worthy pieces.',
    features: ['Concept Development', 'Post-Production Art', 'Limited Editions'],
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-20"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            What I Offer
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Services
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Every project is approached with meticulous attention to detail and a 
            commitment to exceeding expectations. Here's how I can help bring your 
            vision to life.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative p-8 lg:p-12 border border-border bg-card hover:border-primary/50 transition-all duration-500"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon */}
              <motion.div
                animate={{ 
                  rotate: hoveredIndex === index ? 360 : 0,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-8 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500"
              >
                <service.icon className="w-6 h-6 text-primary" />
              </motion.div>

              {/* Content */}
              <h3 className="font-display text-2xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-sm text-foreground/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-body text-sm tracking-[0.15em] uppercase text-primary hover:gap-4 transition-all duration-300"
              >
                Inquire
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Hover Accent */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-primary"
                initial={{ width: 0 }}
                animate={{ width: hoveredIndex === index ? '100%' : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
