// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { supabase } from '@/integrations/supabase/client';
// import Navigation from '@/components/Navigation';
// import Footer from '@/components/Footer';
// import { Loader2, ArrowLeft } from 'lucide-react';


// interface Gallery {
//   id: string;
//   title: string;
//   description: string | null;
//   cover_image: string | null;
//   is_featured: boolean;
// }

// export const GALLERY_CATEGORIES = [
//   'Wedding',
//   'Mels',
//   'Genfo',
//   'Bridal Shower',
//   'Maternity',
//   'Kids',
//   'Kiristina',
//   'Family',
// ] as const;

// export type GalleryCategory = typeof GALLERY_CATEGORIES[number];

// const CategoryGallery = () => {
//   const { category } = useParams<{ category: string }>();
//   const [galleries, setGalleries] = useState<Gallery[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredId, setHoveredId] = useState<string | null>(null);

//   const decodedCategory = category ? decodeURIComponent(category) : '';

//   useEffect(() => {
//     if (decodedCategory) {
//       fetchGalleries();
//     }
//   }, [decodedCategory]);

//   const fetchGalleries = async () => {
//     setLoading(true);
//     // Cast the supabase query to `any` to avoid deep TypeScript instantiation errors,
//     // then assert the returned data shape to our Gallery[] type.
//     const res = await (supabase as any)
//       .from('galleries')
//       .select('id, title, description, cover_image, is_featured')
//       .eq('is_public', true)
//       .eq('category', decodedCategory)
//       .order('is_featured', { ascending: false })
//       .order('created_at', { ascending: false });

//     const data = (res && res.data) as Gallery[] | null;
//     const error = res && res.error;

//     if (!error && data) {
//       setGalleries(data);
//     } else if (!data) {
//       setGalleries([]);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
      
//       <main className="pt-24 md:pt-32 pb-20">
//         <div className="container mx-auto px-6 lg:px-12">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="mb-12 md:mb-16"
//           >
//             <Link 
//               to="/" 
//               className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span className="font-body text-sm tracking-wider uppercase">Back to Galleries</span>
//             </Link>
//             <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
//               {decodedCategory} Photography
//             </p>
//             <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
//               {decodedCategory}
//             </h1>
//           </motion.div>

//           {loading ? (
//             <div className="flex justify-center py-20">
//               <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             </div>
//           ) : galleries.length === 0 ? (
//             <div className="text-center py-20">
//               <p className="text-muted-foreground mb-4">No galleries in this category yet.</p>
//               <Link 
//                 to="/gallery" 
//                 className="inline-block px-6 py-2 border border-primary text-primary font-body text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//               >
//                 View All Galleries
//               </Link>
//             </div>
//           ) : (
//             /* Masonry-like Grid - Anjelo style */
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//               {galleries.map((gallery, index) => (
//                 <motion.div
//                   key={gallery.id}
//                   initial={{ opacity: 0, y: 60 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.08 }}
//                   className={`group ${index === 0 || index === 5 ? 'md:row-span-2' : ''} ${index === 3 ? 'lg:col-span-2' : ''}`}
//                   onMouseEnter={() => setHoveredId(gallery.id)}
//                   onMouseLeave={() => setHoveredId(null)}
//                 >
//                   <Link to={`/gallery/${gallery.id}`} className="block h-full">
//                     <div className={`relative overflow-hidden h-full min-h-[280px] ${index === 0 || index === 5 ? 'min-h-[450px] md:min-h-[580px]' : ''}`}>
//                       {gallery.cover_image ? (
//                         <motion.img
//                           src={gallery.cover_image}
//                           alt={gallery.title}
//                           className="w-full h-full object-cover"
//                           animate={{ scale: hoveredId === gallery.id ? 1.1 : 1 }}
//                           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-muted flex items-center justify-center">
//                           <span className="text-muted-foreground">No cover</span>
//                         </div>
//                       )}
                      
//                       {/* Hover Overlay - Anjelo style */}
//                       <motion.div
//                         className="absolute inset-0 bg-background/80 flex flex-col justify-end p-6 md:p-8"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: hoveredId === gallery.id ? 1 : 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <motion.h3 
//                           className="font-display text-2xl md:text-3xl text-foreground mb-2"
//                           initial={{ y: 20 }}
//                           animate={{ y: hoveredId === gallery.id ? 0 : 20 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           {gallery.title}
//                         </motion.h3>
//                         {gallery.description && (
//                           <motion.p 
//                             className="text-muted-foreground font-body text-sm mb-3 line-clamp-2"
//                             initial={{ y: 20, opacity: 0 }}
//                             animate={{ 
//                               y: hoveredId === gallery.id ? 0 : 20,
//                               opacity: hoveredId === gallery.id ? 1 : 0
//                             }}
//                             transition={{ duration: 0.3, delay: 0.05 }}
//                           >
//                             {gallery.description}
//                           </motion.p>
//                         )}
//                         <motion.p 
//                           className="text-primary font-body text-sm tracking-wider uppercase"
//                           initial={{ y: 20, opacity: 0 }}
//                           animate={{ 
//                             y: hoveredId === gallery.id ? 0 : 20,
//                             opacity: hoveredId === gallery.id ? 1 : 0
//                           }}
//                           transition={{ duration: 0.3, delay: 0.1 }}
//                         >
//                           View more...
//                         </motion.p>
//                       </motion.div>

//                       {/* Featured Badge */}
//                       {gallery.is_featured && (
//                         <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-3 py-1 font-body tracking-wider uppercase">
//                           Featured
//                         </span>
//                       )}

//                       {/* Always visible title at bottom for mobile */}
//                       <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent md:opacity-0 md:group-hover:opacity-0">
//                         <h3 className="font-display text-xl text-foreground">
//                           {gallery.title}
//                         </h3>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default CategoryGallery;

import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Loader2, ArrowLeft } from 'lucide-react';

export const GALLERY_CATEGORIES = [
  'Wedding',
  'Mels',
  'Genfo',
  'Bridal Shower',
  'Maternity',
  'Kids',
  'Kiristina',
  'Family',
] as const;

export type GalleryCategory = typeof GALLERY_CATEGORIES[number];

interface Gallery {
  id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  is_featured: boolean;
}

const defaultImages = [
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

const CategoryGallery = () => {
  const { category } = useParams<{ category: GalleryCategory }>();
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const decodedCategory = category ? decodeURIComponent(category) : '';

  // Separate ref for masonry fallback to ensure useInView works reliably
  const masonryRef = useRef<HTMLDivElement>(null);
  const isMasonryInView = useInView(masonryRef, { once: true, margin: '-100px' });

  // Lightbox stub — replace with real lightbox later
  const openLightbox = (index: number) => {
    console.log('Open lightbox at image index:', index);
  };

  useEffect(() => {
    if (decodedCategory) {
      fetchGalleries();
    }
  }, [decodedCategory]);

  const fetchGalleries = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('galleries')
      .select('id, title, description, cover_image, is_featured')
      .eq('is_public', true)
      .eq('category', decodedCategory)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching galleries:', error);
      setGalleries([]);
    } else {
      setGalleries(data ?? []);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 md:pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body text-sm tracking-wider uppercase">
                Back to Galleries
              </span>
            </Link>
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              {decodedCategory} Photography
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              {decodedCategory}
            </h1>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : galleries.length > 0 ? (
            /* Real Galleries Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {galleries.map((gallery, index) => (
                <motion.div
                  key={gallery.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className={`group ${index === 0 || index === 5 ? 'md:row-span-2' : ''} ${index === 3 ? 'lg:col-span-2' : ''}`}
                  onMouseEnter={() => setHoveredId(gallery.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Link to={`/gallery/${gallery.id}`} className="block h-full">
                    <div className={`relative overflow-hidden h-full min-h-[280px] ${index === 0 || index === 5 ? 'min-h-[450px] md:min-h-[580px]' : ''}`}>
                      {gallery.cover_image ? (
                        <motion.img
                          src={gallery.cover_image}
                          alt={gallery.title}
                          className="w-full h-full object-cover"
                          animate={{ scale: hoveredId === gallery.id ? 1.1 : 1 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">No cover</span>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-background/80 flex flex-col justify-end p-6 md:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === gallery.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                          {gallery.title}
                        </motion.h3>
                        <motion.p className="text-primary font-body text-sm tracking-wider uppercase">
                          View more...
                        </motion.p>
                      </motion.div>

                      {gallery.is_featured && (
                        <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-3 py-1 font-body tracking-wider uppercase">
                          Featured
                        </span>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent md:opacity-0 md:group-hover:opacity-0">
                        <h3 className="font-display text-xl text-foreground">{gallery.title}</h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Fallback: Beautiful Masonry Grid with Default Images */
            <div ref={masonryRef}>
              <p className="text-center text-muted-foreground mb-12 text-lg">
                No galleries in this category yet. Enjoy some of our popular work!
              </p>

              <div className="p-5 sm:p-8">
                <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>div:not(:first-child)]:mt-8">
                  {defaultImages.map((src, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isMasonryInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className="relative overflow-hidden rounded-2xl shadow-xl mb-8 break-inside-avoid group cursor-pointer"
                      onClick={() => openLightbox(index)}
                    >
                      <img
                        src={src}
                        alt={`Popular work ${index + 1} - Josy Photography`}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white text-lg font-medium">View Larger</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-12">
                <Link
                  to="/gallery"
                  className="inline-block px-8 py-3 border border-primary text-primary font-body text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  View All Galleries
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryGallery;