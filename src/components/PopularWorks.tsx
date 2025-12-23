// import { motion, useInView } from 'framer-motion';
// import { useRef, useState } from 'react';

// const images = [
//   'https://anjelopictures.com/wp-content/uploads/2024/05/5M0A5845-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/7U0A7220-1-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/3D3A4168-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/1D6A0924-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A8127-1-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/5M0A2135-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/3D3A0154-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/1I5A4469-1-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/1I5A4473-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/1I5A9961-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/438A1822-1-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A6994-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/1I5A0169-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A8688-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/438A8514-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/3D3A1251-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/886A9116-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/886A8964-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/C72A2869-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A6539-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/kirstena-4-2-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A5011-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A6840-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A7665-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A7558-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A9550-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/3D3A6509-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/1I5A3016-1-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/1D6A0936-1-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/1D6A1030-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/438A2210-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/1D6A0929-scaled.jpg',
//   'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A6545-scaled.jpg',
// ];

// const PopularWorks = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: '-100px' });
//   const [hoveredImage, setHoveredImage] = useState<string | null>(null);

//   return (
//     <section id="popular-works" className="py-24 lg:py-32 bg-background" ref={ref}>
//       <div className="container mx-auto px-6 lg:px-12">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="mb-16 lg:mb-24 text-center"
//         >
//           <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
//             Your memory with Anjelo Pictures
//           </p>
//           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
//             Popular Works
//           </h2>
//           <p className="mt-8 max-w-3xl mx-auto text-muted-foreground text-lg">
//             Our journey began with a vision to redefine photography, blending technical expertise with an artistic touch. Meet the faces behind the lens – a team of seasoned professionals driven by a shared commitment to transform your special moments into timeless memories. Learn more about our story and what sets Anjelo Pictures apart.
//           </p>
//         </motion.div>

//         {/* True Masonry Layout using Tailwind Columns */}
//         <div className="p-5 sm:p-8">
//           <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>div:not(:first-child)]:mt-8">
//             {images.map((src, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={isInView ? { opacity: 1, scale: 1 } : {}}
//                 transition={{ duration: 0.6, delay: index * 0.05 }}
//                 className="relative overflow-hidden rounded-2xl shadow-xl mb-8 break-inside-avoid group"
//                 onMouseEnter={() => setHoveredImage(src)}
//                 onMouseLeave={() => setHoveredImage(null)}
//               >
//                 <img
//                   src={src}
//                   alt={`Popular work ${index + 1} - Anjelo Pictures`}
//                   className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   loading="lazy"
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PopularWorks;


// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react'; // Optional: for nice icons (install lucide-react if you want)

const images = [
  'https://anjelopictures.com/wp-content/uploads/2024/05/5M0A5845-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/7U0A7220-1-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/3D3A4168-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/1D6A0924-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A8127-1-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/5M0A2135-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/3D3A0154-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/1I5A4469-1-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/1I5A4473-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/1I5A9961-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/438A1822-1-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A6994-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/1I5A0169-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A8688-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/438A8514-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/3D3A1251-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/886A9116-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/886A8964-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/C72A2869-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A6539-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/kirstena-4-2-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A5011-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A6840-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A7665-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A7558-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A9550-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/3D3A6509-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/1I5A3016-1-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/1D6A0936-1-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/1D6A1030-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/438A2210-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/1D6A0929-scaled.jpg',
  'https://anjelopictures.com/wp-content/uploads/2024/05/CY5A6545-scaled.jpg',
];

const PopularWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="popular-works" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24 text-center"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Your memory with Josy Photography
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            Popular Works
          </h2>
          <p className="mt-8 max-w-3xl mx-auto text-muted-foreground text-lg">
            Our journey began with a vision to redefine photography, blending technical expertise with an artistic touch. Meet the faces behind the lens – a team of seasoned professionals driven by a shared commitment to transform your special moments into timeless memories. Learn more about our story and what sets Josy Photography apart.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="p-5 sm:p-8">
          <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>div:not(:first-child)]:mt-8">
            {images.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="relative overflow-hidden rounded-2xl shadow-xl mb-8 break-inside-avoid group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={src}
                  alt={`Popular work ${index + 1} - Josy Photography `}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  {/* <span className="text-white text-lg font-medium">View Larger</span> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal (Facebook-style) */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={closeLightbox}
          >
            <X size={40} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <ChevronLeft size={50} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <ChevronRight size={50} />
          </button>

          <motion.img
            key={currentIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="max-h-[95vh] max-w-[95vw] object-contain"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
          />
        </motion.div>
      )}
    </section>
  );
};

export default PopularWorks;