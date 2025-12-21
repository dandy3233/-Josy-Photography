import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const footerLinks = [
    { name: 'Work', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Logo & Copyright */}
          <div>
            <a href="#" className="font-display text-2xl tracking-wide text-foreground mb-4 inline-block">
              Josy
            </a>
            <p className="font-body text-sm text-muted-foreground">
              © {new Date().getFullYear()} Josy Photography.
              <br />
              All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-center">
            <nav className="flex flex-wrap gap-x-8 gap-y-3 md:justify-center">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Back to Top */}
          <div className="flex items-center justify-between md:justify-end gap-8">
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              className="w-10 h-10 rounded-full border border-primary bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-16 pt-8 border-t border-border/50 text-center">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground/50">
            Crafted with passion in New York City
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
