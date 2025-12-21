import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Import images
import heroImage from '@/assets/hero-image.jpg';
import aboutImage from '@/assets/about-portrait.jpg';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-5.png';

const portfolioItems = [
  {
    id: 1,
    title: 'Eternal Elegance',
    category: 'Editorial',
    image: portfolio1,
  },
  {
    id: 2,
    title: 'Golden Hour Love',
    category: 'Wedding',
    image: portfolio2,
  },
  {
    id: 3,
    title: 'Shadow & Light',
    category: 'Portrait',
    image: portfolio3,
  },
  {
    id: 4,
    title: 'Luxury Essence',
    category: 'Commercial',
    image: portfolio4,
  },
  {
    id: 5,
    title: 'Ethereal Dreams',
    category: 'Fine Art',
    image: portfolio4,
    // image: portfolio6,
  },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Josy Photography | Premium Visual Storytelling</title>
        <meta name="description" content="Josy Photography - Premium photography capturing moments that last. Specializing in editorial, wedding, portrait, and fine art photography. Based in New York, working worldwide." />
        <meta name="keywords" content="photography, wedding photographer, portrait photography, editorial photography, fine art, New York photographer" />
        <meta property="og:title" content="Josy Photography | Premium Visual Storytelling" />
        <meta property="og:description" content="Capturing moments that last. Premium photography for weddings, portraits, and commercial projects." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://josyphotography.com" />
      </Helmet>

      <Navigation />
      
      <main>
        <Hero fallbackImage={heroImage} />
        <Portfolio items={portfolioItems} />
        <About aboutImage={aboutImage} />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default Index;
