import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Loader2, ArrowUpRight } from 'lucide-react';

interface Gallery {
  id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  is_featured: boolean;
}

const GalleryList = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    const { data, error } = await supabase
      .from('galleries')
      .select('id, title, description, cover_image, is_featured')
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
            className="mb-16"
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
              <p className="text-muted-foreground">No galleries available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleries.map((gallery, index) => (
                <motion.div
                  key={gallery.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredId(gallery.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Link to={`/gallery/${gallery.id}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-lg">
                      {gallery.cover_image ? (
                        <motion.img
                          src={gallery.cover_image}
                          alt={gallery.title}
                          className="w-full h-full object-cover"
                          animate={{ scale: hoveredId === gallery.id ? 1.05 : 1 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-muted-foreground">No cover</span>
                        </div>
                      )}
                      <motion.div
                        className="absolute inset-0 bg-background/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === gallery.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      {gallery.is_featured && (
                        <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                      <motion.div
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-full border border-primary flex items-center justify-center"
                        animate={{ 
                          opacity: hoveredId === gallery.id ? 1 : 0,
                          scale: hoveredId === gallery.id ? 1 : 0.8
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      </motion.div>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
                        {gallery.title}
                      </h3>
                      {gallery.description && (
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                          {gallery.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GalleryList;
