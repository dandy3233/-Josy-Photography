import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

interface Gallery {
  id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  is_featured: boolean;
  category: string;
}

const GalleryList = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    const { data, error } = await supabase
      .from('galleries')
      .select('id, title, description, cover_image, is_featured, category')
      .eq('is_public', true)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setGalleries(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center md:text-left"
          >
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              Browse Collections
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              Galleries
            </h1>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : galleries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No galleries available yet.</p>
            </div>
          ) : (
            /* Authentic Masonry Layout - Same as Popular Images */
            <div className="px-5 sm:px-8">
              <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4">
                {galleries.map((gallery, index) => (
                  <motion.div
                          key={gallery.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.08 }}
                          className="mb-5 sm:mb-8 break-inside-avoid"
                        >
                    {/* <Link to={`/gallery/${gallery.id}`} className="group block"> */}
                      <div className="relative overflow-hidden rounded-2xl shadow-xl">
                        {gallery.cover_image ? (
                          <img
                            src={gallery.cover_image}
                            alt={gallery.title}
                            className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-96 bg-muted flex items-center justify-center rounded-2xl">
                            <span className="text-muted-foreground">No cover image</span>
                          </div>
                        )}

                        {/* Hover Overlay with Title + View More */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100">
                          <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                            {gallery.title}
                          </h3>
                          {gallery.description && (
                            <p className="text-white/80 text-sm line-clamp-2 mb-3">
                              {gallery.description}
                            </p>
                          )}
                          <p className="text-primary font-body text-sm tracking-wider uppercase">
                            View Gallery →
                          </p>
                        </div>

                        {/* Featured Badge */}
                        {gallery.is_featured && (
                          <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-3 py-1 font-body tracking-wider uppercase z-10 rounded-full">
                            Featured
                          </span>
                        )}

                        {/* Optional Category Tag */}
                        <span className="absolute top-4 right-4 bg-background/80 text-foreground text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                          {gallery.category}
                        </span>
                      </div>
                    {/* </Link> */}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GalleryList;