import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface PortfolioProps {
  items: PortfolioItem[];
}

const Portfolio = ({ items }: PortfolioProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            Portfolio
          </h2>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className={`group relative ${index % 3 === 0 ? 'md:col-span-2' : ''}`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <a href="#" className="block relative overflow-hidden">
                {/* Image Container */}
                <div className={`relative overflow-hidden ${index % 3 === 0 ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === item.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-background/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
                  <div className="flex items-end justify-between">
                    <div>
                      <motion.p
                        className="text-primary/80 font-body text-xs tracking-[0.2em] uppercase mb-2"
                        animate={{ 
                          y: hoveredId === item.id ? 0 : 10,
                          opacity: hoveredId === item.id ? 1 : 0.7 
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.category}
                      </motion.p>
                      <motion.h3
                        className="font-display text-2xl lg:text-3xl text-foreground"
                        animate={{ y: hoveredId === item.id ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.title}
                      </motion.h3>
                    </div>
                    <motion.div
                      animate={{ 
                        opacity: hoveredId === item.id ? 1 : 0,
                        x: hoveredId === item.id ? 0 : -10 
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-full border border-primary flex items-center justify-center"
                    >
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="/galleries"
            className="group inline-flex items-center gap-3 font-body text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
