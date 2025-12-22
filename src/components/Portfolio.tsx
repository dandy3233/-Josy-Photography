import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  link: string;
  image1: string;
  image2: string;
}

const items: PortfolioItem[] = [
  {
    id: 1,
    title: 'Wedding',
    link: 'https://anjelopictures.com/wedding/',
    image1: 'https://i0.wp.com/thewplmag.com/wp-content/uploads/2024/04/KarimahGheddai0030.jpg?resize=900%2C660&ssl=1',
    image2: 'https://jennygg.com/wp-content/uploads/2015/06/HJblog-1-940x627.jpg',
  },
  {
    id: 2,
    title: 'Mels',
    link: 'https://anjelopictures.com/mels/',
    image1: 'https://www.judahavenue.com/wp-content/uploads/2018/07/27-49018-post/aida-betre-wedding-at-falls-church-marriott-fairview-park-in-virginia-1-1.jpg',
    image2: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3368375372686140246',
  },
  {
    id: 3,
    title: 'Genfo',
    link: 'https://anjelopictures.com/genfo/',
    image1: 'https://thumbs.dreamstime.com/b/cultural-food-ethiopia-s-called-genfo-its-152731942.jpg',
    image2: 'https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-featured.jpg',
  },
  {
    id: 4,
    title: 'Bridal Shower',
    link: 'https://anjelopictures.com/bridal-shower/',
    image1: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=2140144899370059',
    image2: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=3423273927716563',
  },
  {
    id: 5,
    title: 'Maternity',
    link: 'https://anjelopictures.com/maternity/',
    image1: 'http://static1.squarespace.com/static/52eeeae9e4b04af4cf9542bb/52eeee86e4b02c6bcd879e87/5d01189167787f000110fcd1/1565966348209/atlanta-roswell-acworth-sandy-springs-buckhead-virginia-highlands-west-end-decatur-lily-sophia-photography-ethiopian-couple-studio-couples-maternity-session-expecting-baby-boy-family-photos_1066.jpg?format=1500w',
    image2: 'https://boyophoto.ca/wp-content/uploads/2018/07/001-ottawa-maternity-photographer-studio2.jpg',
  },
  {
    id: 6,
    title: 'Kids',
    link: 'https://anjelopictures.com/kids/',
    image1: 'https://natalydanilova.com/wp-content/uploads/2025/03/DSC00824.jpg',
    image2: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=2888844952630177811',
  },
  {
    id: 7,
    title: 'Kiristina',
    link: 'https://anjelopictures.com/kirisitna/',
    image1: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1100157168142341',
    image2: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/65979413329837.562728acef12a.jpg',
  },
  {
    id: 8,
    title: 'Family',
    link: 'https://anjelopictures.com/family/',
    image1: 'https://arpasiphotography.com/wp-content/uploads/2022/03/Howard_County_Family_photographer_0011.jpg',
    image2: 'https://arpasiphotography.com/wp-content/uploads/2020/12/Mekonen_Abdi_family-39-1024x683.jpg',
  },
];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24 text-center"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Our Galleries
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            Explore Our Work
          </h2>
        </motion.div>

        {/* Alternating Layout with Dual Images Side-by-Side */}
        <div className="space-y-14 lg:space-y-12">
          {items.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              >
                {/* Dual Images Section */}
                <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
                  <a href={item.link} className="block">
                    <div className="grid grid-cols-2 gap-0 overflow-hidden  shadow-2xl relative">
                      {/* First Image */}
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={item.image1}
                          alt={`${item.title} - Anjelo Pictures`}
                          className="w-full h-full lg:h-[30rem] object-cover aspect-square"
                          animate={{
                            scale: hoveredImage === item.image1 ? 1.12 : 1,
                          }}
                          transition={{ duration: 0.7, ease: 'easeOut' }}
                          onMouseEnter={() => setHoveredImage(item.image1)}
                          onMouseLeave={() => setHoveredImage(null)}
                        />
                        <motion.div
                          className="absolute inset-0 bg-black/40 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredImage === item.image1 ? 1 : 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      {/* Second Image */}
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={item.image2}
                          alt={`${item.title} - Anjelo Pictures`}
                          className="w-full h-full lg:h-[30rem] object-cover aspect-square"
                          animate={{
                            scale: hoveredImage === item.image2 ? 1.12 : 1,
                          }}
                          transition={{ duration: 0.7, ease: 'easeOut' }}
                          onMouseEnter={() => setHoveredImage(item.image2)}
                          onMouseLeave={() => setHoveredImage(null)}
                        />
                        <motion.div
                          className="absolute inset-0 bg-black/40 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredImage === item.image2 ? 1 : 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                  </a>
                </div>

                {/* Text Section */}
                <div className={isEven ? 'order-2 text-left   lg:text-center' : 'order-2 lg:order-1 text-left lg:text-center '}>
                  <motion.h3
                    className="font-display font-extrabold  text-4xl lg:text-6xl text-foreground mb-6"
                    onMouseEnter={() => setHoveredImage(null)} // optional: reset hover when on text
                  >
                    {item.title}
                  </motion.h3>
                  <motion.a
                    href={item.link}
                    className="inline-flex items-center gap-3 font-body text-lg tracking-wide text-primary hover:text-primary/80 transition-colors"
                  >
                    View Gallery
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;