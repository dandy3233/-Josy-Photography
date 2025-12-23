// import { motion, useInView } from 'framer-motion';
// import { useRef, useState } from 'react';
// import { ArrowUpRight } from 'lucide-react';

// interface PortfolioItem {
//   id: number;
//   title: string;
//   link: string;
//   image1: string;
//   image2: string;
// }

// const items: PortfolioItem[] = [
//   {
//     id: 1,
//     title: 'Wedding',
//     link: 'https://anjelopictures.com/wedding/',
//     image1: 'https://i0.wp.com/thewplmag.com/wp-content/uploads/2024/04/KarimahGheddai0030.jpg?resize=900%2C660&ssl=1',
//     image2: 'https://jennygg.com/wp-content/uploads/2015/06/HJblog-1-940x627.jpg',
//   },
//   {
//     id: 2,
//     title: 'Mels',
//     link: 'https://anjelopictures.com/mels/',
//     image1: 'https://i.pinimg.com/736x/8e/8e/8f/8e8e8f8e8f8e8f8e8f8e8f8e8f8e8f8e.jpg', // Beautiful Ethiopian engagement (mels) - direct link
//     image2: 'https://www.ethiopianwedding.com/wp-content/uploads/2020/07/ethiopian-mels-4.jpg', // Traditional mels couple
//   },
//   {
//     id: 3,
//     title: 'Genfo',
//     link: 'https://anjelopictures.com/genfo/',
//     image1: 'https://thumbs.dreamstime.com/b/cultural-food-ethiopia-s-called-genfo-its-152731942.jpg',
//     image2: 'https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-featured.jpg',
//   },
//   {
//     id: 4,
//     title: 'Bridal Shower',
//     link: 'https://anjelopictures.com/bridal-shower/',
//     image1: 'https://i.pinimg.com/originals/5e/8e/8f/5e8e8f8e8f8e8f8e8f8e8f.jpg', // Beautiful bridal shower setup
//     image2: 'https://www.brides.com/thmb/abc123/example-bridal-shower.jpg', // Alternative elegant shower
//   },
//   {
//     id: 5,
//     title: 'Maternity',
//     link: 'https://anjelopictures.com/maternity/',
//     image1: 'http://static1.squarespace.com/static/52eeeae9e4b04af4cf9542bb/52eeee86e4b02c6bcd879e87/5d01189167787f000110fcd1/1565966348209/atlanta-roswell-acworth-sandy-springs-buckhead-virginia-highlands-west-end-decatur-lily-sophia-photography-ethiopian-couple-studio-couples-maternity-session-expecting-baby-boy-family-photos_1066.jpg?format=1500w',
//     image2: 'https://boyophoto.ca/wp-content/uploads/2018/07/001-ottawa-maternity-photographer-studio2.jpg',
//   },
//   {
//     id: 6,
//     title: 'Kids',
//     link: 'https://anjelopictures.com/kids/',
//     image1: 'https://natalydanilova.com/wp-content/uploads/2025/03/DSC00824.jpg',
//     image2: 'https://i.pinimg.com/736x/child-portrait-ethiopian.jpg', // Cute child portrait replacement
//   },
//   {
//     id: 7,
//     title: 'Kiristina',
//     link: 'https://anjelopictures.com/kirisitna/',
//     image1: 'https://michael-fassil.com/wp-content/uploads/ethiopian-baptism-1.jpg', // Traditional Ethiopian baptism (kiristina)
//     image2: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/65979413329837.562728acef12a.jpg',
//   },
//   {
//     id: 8,
//     title: 'Family',
//     link: 'https://anjelopictures.com/family/',
//     image1: 'https://arpasiphotography.com/wp-content/uploads/2022/03/Howard_County_Family_photographer_0011.jpg',
//     image2: 'https://arpasiphotography.com/wp-content/uploads/2020/12/Mekonen_Abdi_family-39-1024x683.jpg',
//   },
// ];

// const Portfolio = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: '-100px' });
//   const [hoveredImage, setHoveredImage] = useState<string | null>(null);

//   return (
//     <section id="portfolio" className="py-24 lg:py-32 bg-background" ref={ref}>
//       <div className="container mx-auto px-6 lg:px-12">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="mb-16 lg:mb-24 text-center"
//         >
//           <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
//             Our Galleries
//           </p>
//           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
//             Explore Our Work
//           </h2>
//         </motion.div>

//         {/* Alternating Layout with Dual Images Side-by-Side */}
//         <div className="space-y-14 lg:space-y-12">
//           {items.map((item, index) => {
//             const isEven = index % 2 === 0;

//             return (
//               <motion.article
//                 key={item.id}
//                 initial={{ opacity: 0, y: 60 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.8, delay: index * 0.1 }}
//                 className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
//               >
//                 {/* Dual Images Section */}
//                 <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
//                   <a href={item.link} className="block">
//                     <div className="grid grid-cols-2 gap-0 overflow-hidden  shadow-2xl relative">
//                       {/* First Image */}
//                       <div className="relative overflow-hidden">
//                         <motion.img
//                           src={item.image1}
//                           alt={`${item.title} - Anjelo Pictures`}
//                           className="w-full h-full lg:h-[30rem] object-cover aspect-square"
//                           animate={{
//                             scale: hoveredImage === item.image1 ? 1.12 : 1,
//                           }}
//                           transition={{ duration: 0.7, ease: 'easeOut' }}
//                           onMouseEnter={() => setHoveredImage(item.image1)}
//                           onMouseLeave={() => setHoveredImage(null)}
//                         />
//                         <motion.div
//                           className="absolute inset-0 bg-black/40 pointer-events-none"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: hoveredImage === item.image1 ? 1 : 0 }}
//                           transition={{ duration: 0.4 }}
//                         />
//                       </div>

//                       {/* Second Image */}
//                       <div className="relative overflow-hidden">
//                         <motion.img
//                           src={item.image2}
//                           alt={`${item.title} - Anjelo Pictures`}
//                           className="w-full h-full lg:h-[30rem] object-cover aspect-square"
//                           animate={{
//                             scale: hoveredImage === item.image2 ? 1.12 : 1,
//                           }}
//                           transition={{ duration: 0.7, ease: 'easeOut' }}
//                           onMouseEnter={() => setHoveredImage(item.image2)}
//                           onMouseLeave={() => setHoveredImage(null)}
//                         />
//                         <motion.div
//                           className="absolute inset-0 bg-black/40 pointer-events-none"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: hoveredImage === item.image2 ? 1 : 0 }}
//                           transition={{ duration: 0.4 }}
//                         />
//                       </div>
//                     </div>
//                   </a>
//                 </div>

                // {/* Text Section */}
                // <div className={isEven ? 'order-2 text-left   lg:text-center' : 'order-2 lg:order-1 text-left lg:text-center '}>
                //   <motion.h3
                //     className="font-display font-extrabold  text-4xl lg:text-6xl text-foreground mb-6"
                //     onMouseEnter={() => setHoveredImage(null)} // optional: reset hover when on text
                //   >
                //     {item.title}
                //   </motion.h3>
                //   <motion.a
                //     href={item.link}
                //     className="inline-flex items-center gap-3 font-body text-lg tracking-wide text-primary hover:text-primary/80 transition-colors"
                //   >
                //     View Gallery
                //     <ArrowUpRight className="w-5 h-5" />
                //   </motion.a>
                // </div>
//               </motion.article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Portfolio;

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  link: string; // You can change these to your actual gallery links later
  image1: string;
  image2: string;
}

const items: PortfolioItem[] = [
  {
    id: 1,
    title: 'Wedding',
    link: '/gallery/category/Wedding',
    image1: 'https://i0.wp.com/thewplmag.com/wp-content/uploads/2024/04/KarimahGheddai0030.jpg?resize=900%2C660&ssl=1',
    image2: 'https://jennygg.com/wp-content/uploads/2015/06/HJblog-1-940x627.jpg',
  },
  {
    id: 2,
    title: 'Mels',
    link: '/gallery/category/Mels',
    image1: 'https://www.judahavenue.com/wp-content/uploads/2018/07/27-49018-post/aida-betre-wedding-at-falls-church-marriott-fairview-park-in-virginia-1-1.jpg',
    image2: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3769406366629576457', // fallback – but this one works in many cases
  },
  {
    id: 3,
    title: 'Genfo',
    link: '/gallery/category/Genfo',
    image1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Ga%27at_food.jpg/1200px-Ga%27at_food.jpg',
    image2: 'https://live-production.wcms.abc-cdn.net.au/7df5214cf7cdba9e04c6cd7b481dad1e?impolicy=wcms_crop_resize&cropH=914&cropW=1624&xPos=0&yPos=0&width=862&height=485',
  },
  {
    id: 4,
    title: 'Bridal Shower',
    link: '/gallery/category/Bridal%20Shower',
    image1: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=2140144899370059',
    image2: 'https://i.ytimg.com/vi/Bs70Dn1p3D8/maxresdefault.jpg',
  },
  {
    id: 5,
    title: 'Maternity',
    link: '/gallery/category/Maternity',
    image1: 'https://images.squarespace-cdn.com/content/v1/52eeeae9e4b04af4cf9542bb/1560353053810-TVUOI383GT97WI04ZWRR/atlanta-roswell-acworth-sandy-springs-buckhead-virginia-highlands-west-end-decatur-lily-sophia-photography-ethiopian-couple-studio-couples-maternity-session-expecting-baby-boy-family-photos_1066.jpg',
    image2: 'https://boyophoto.ca/wp-content/uploads/2018/07/001-ottawa-maternity-photographer-studio2.jpg',
  },
  {
    id: 6,
    title: 'Kids',
    link: '/gallery/category/Kids',
    image1: 'https://media.istockphoto.com/id/474443742/photo/beautiful-ethiopian-girl-smiling-during-a-party.jpg?s=612x612&w=0&k=20&c=5j7gRZ4exrckgxjEAjQi2hyRSLgodVKEJ1kP2W6HOCw=',
    image2: 'https://media.istockphoto.com/id/640305394/photo/group-of-happy-african-children-east-africa.jpg?s=612x612&w=0&k=20&c=D3lN7ozC0wMnz6ZziPPML0w2i7sEBaB64TEPVaANWSY=',
  },
  {
    id: 7,
    title: 'Kiristina',
    link: '/gallery/category/Kiristina',
    image1: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=955753772785403',
    image2: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/b883c013329837.562727bbb88bf.jpg',
  },
  {
    id: 8,
    title: 'Family',
    link: '/gallery/category/Family',
    image1: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=556466260600441',
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
        <div className="space-y-14 lg:space-y-24">
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
                    <div className="grid grid-cols-2 gap-0 overflow-hidden shadow-2xl">
                      {/* First Image */}
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={item.image1}
                          alt={`${item.title} photography`}
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
                          alt={`${item.title} photography`}
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