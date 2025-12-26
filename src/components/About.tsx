import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AboutProps {
  aboutImage: string;
}

interface AboutData {
  title: string;
  name: string;
  description: string[];
  stats: { value: string; label: string }[];
  location: string;
}

const aboutJson: AboutData = {
  title: "About Me",
  name: "Josy Photography (Josy Chala)",
  description: [
    "I believe that photography is more than capturing images—it's about preserving emotions, telling stories, and creating art that resonates with the soul.",
    "With over a decade of experience in editorial, fashion, and portrait photography, I've had the privilege of working with renowned brands and individuals across the globe. My approach combines technical precision with artistic intuition, ensuring every shot tells a compelling story.",
    "Based in Oromia, Ethiopia, I travel worldwide for projects that inspire and challenge me. When I'm not behind the lens, you'll find me exploring galleries, studying light, and seeking the next beautiful moment."
  ],
  stats: [
    { value: "2+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "25+", label: "Awards Won" }
  ],
  location: "Oromia, Ethiopia"
};

const About = ({ aboutImage }: AboutProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-20 sm:py-24 md:py-28 lg:py-32 bg-card"
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={aboutImage}
                alt={aboutJson.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Element */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-6  sm:-bottom-8 sm:-right-8 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 border border-primary/30"
            />
          </motion.div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
                {aboutJson.title}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-8">
                {aboutJson.name}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6 mb-12"
            >
              {aboutJson.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border"
            >
              {aboutJson.stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Location Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 text-xs text-muted-foreground font-body tracking-[0.3em] uppercase"
            >
              {aboutJson.location}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
