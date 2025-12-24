// src/components/Contact.tsx or src/sections/Contact.tsx
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controlled phone input for +251 format
  const [phoneInput, setPhoneInput] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string).trim();
    const email = (formData.get('email') as string).toLowerCase().trim();
    const message = (formData.get('message') as string).trim();
    const fullPhone = phoneInput ? `+251${phoneInput.replace(/\D/g, '')}` : null;

    try {
      // Check if client exists
      const { data: existingClient } = await supabase
        .from('clients')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingClient) {
        // Update existing client
        const { error } = await supabase
          .from('clients')
          .update({
            phone: fullPhone,
            notes: message, // Overwrite or append as needed
          })
          .eq('id', existingClient.id);

        if (error) throw error;
      } else {
        // Create new client
        const { error } = await supabase.from('clients').insert({
          name,
          email,
          phone: fullPhone,
          notes: message,
        });

        if (error) throw error;
      }

      toast({
        title: 'Message Sent Successfully! 🎉',
        description: "Thank you! I'll respond within 24 hours.",
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
      setPhoneInput('');
    } catch (error: unknown) {
      const description =
        error instanceof Error
          ? error.message
          : String(error) || 'Please try again or contact me directly.';

      toast({
        title: 'Failed to Send',
        description,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      label: 'Studio Location',
      value: 'Burayu, Oromia Region',
      subtitle: 'Josy Photography Studio',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@josyphotography.com',
      href: 'mailto:hello@josyphotography.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+251 91 234 5678',
      href: 'tel:+251912345678',
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Info & Map (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="order-2 lg:order-1"
          >
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Get In Touch
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
              Let's Create
              <br />
              <span className="italic text-primary">Together</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-lg">
              Ready to capture your story? Whether it's a wedding, family portrait, or creative shoot — 
              I'm here to bring your vision to life. Drop me a message!
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-8 mb-12">
              {contactDetails.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target={item.href?.startsWith('mailto') || item.href?.startsWith('tel') ? '_self' : '_blank'}
                  rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                    {item.subtitle && (
                      <p className="text-sm text-muted-foreground mt-1">{item.subtitle}</p>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Embedded Map - Desktop Only */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="hidden lg:block"
            >
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
                Find My Studio
              </p>
              <div className="w-full h-96 rounded-2xl overflow-hidden border border-border shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d985.301299429467!2d38.6819033!3d9.0714483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b884f824eede3%3A0x8ba8f15164975aa7!2s3MCJ%2BHQW%2C%20Burayu!5e0!3m2!1sen!2sus!4v1735680000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Josy Photography Studio Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-10 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs tracking-widest uppercase text-muted-foreground">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs tracking-widest uppercase text-muted-foreground">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Phone with Flag */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs tracking-widest uppercase text-muted-foreground">
                    Phone Number *
                  </label>
                  <div className="flex items-center border-b border-border py-3 focus-within:border-primary transition-colors">
                    <div className="flex items-center gap-3 pr-4 border-r border-border">
                      <img
                        src="https://flagcdn.com/w40/et.png"
                        alt="Ethiopia flag"
                        className="w-7 h-5 rounded shadow-sm"
                      />
                      <span className="text-foreground font-medium">+251</span>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="91 234 5678"
                      value={phoneInput}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
                        setPhoneInput(digits);
                      }}
                      className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none ml-4"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs tracking-widest uppercase text-muted-foreground">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your shoot idea, date, location, or any special requests..."
                    className="w-full px-0 py-3 bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto px-10 py-5 bg-primary text-primary-foreground font-medium text-sm tracking-wider uppercase rounded-full hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>Sending Message...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Mobile Map */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-20 lg:hidden"
        >
          <p className="text-center text-xs tracking-widest uppercase text-muted-foreground mb-6">
            Studio Location
          </p>
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-border shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d985.301299429467!2d38.6819033!3d9.0714483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b884f824eede3%3A0x8ba8f15164975aa7!2s3MCJ%2BHQW%2C%20Burayu!5e0!3m2!1sen!2sus!4v1735680000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Josy Photography Studio"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Josy Photography Studio · Burayu, Oromia, Ethiopia
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;


// oooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// import { motion, useInView } from 'framer-motion';
// import { useRef, useState } from 'react';
// import { Send, MapPin, Mail, Phone } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { supabase } from '@/integrations/supabase/client';

// const Contact = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const { toast } = useToast();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Form state - only name, email, phone, message (notes)
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: '',
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const { error } = await supabase
//         .from('clients')
//         .insert({
//           name: formData.name.trim(),
//           email: formData.email.trim(),
//           phone: formData.phone ? formData.phone.trim() : null,
//           notes: formData.message.trim() || null,
//           status: 'lead', // optional: you can remove if not needed
//         }, { returning: 'minimal' }); // prevents SELECT after insert (safer with RLS)

//       if (error) throw error;

//       toast({
//         title: "Message Sent!",
//         description: "Thank you for reaching out. I'll get back to you within 24 hours.",
//       });

//       // Reset form
//       setFormData({ name: '', email: '', phone: '', message: '' });
//       (e.target as HTMLFormElement).reset();
//     } catch (err: any) {
//       toast({
//         title: "Something went wrong",
//         description: err.message || "Failed to send your message. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const contactInfo = [
//     { icon: MapPin, label: 'Studio', value: 'Oromia, Ethiopia' },
//     { icon: Mail, label: 'Email', value: 'hello@josyphotography.com' },
//     { icon: Phone, label: 'Phone (Ethiopia)', value: '+251 912 345 678', href: 'tel:+251912345678' },
//   ];

//   return (
//     <section id="contact" className="py-20 md:py-32 bg-background" ref={ref}>
//       <div className="container mx-auto px-6 lg:px-12">
//         <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
//           {/* Left Column - Info + Map */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.8 }}
//             className="order-2 lg:order-1"
//           >
//             <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
//               Get In Touch
//             </p>
//             <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
//               Let's Create
//               <br />
//               <span className="italic text-primary">Together</span>
//             </h2>
//             <p className="font-body text-lg text-muted-foreground leading-relaxed mb-12 max-w-md">
//               Ready to bring your vision to life? I'd love to hear about your project.
//               Whether it's a wedding, portrait session, or commercial work—let's start
//               the conversation.
//             </p>

//             <div className="space-y-6 mb-12">
//               {contactInfo.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={isInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
//                   className="flex items-center gap-4"
//                 >
//                   <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
//                     <item.icon className="w-5 h-5 text-primary" />
//                   </div>
//                   <div>
//                     <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
//                       {item.label}
//                     </p>
//                     {item.href ? (
//                       <a href={item.href} className="font-body text-foreground hover:text-primary transition-colors duration-300">
//                         {item.value}
//                       </a>
//                     ) : (
//                       <p className="font-body text-foreground">{item.value}</p>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Desktop Map */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="hidden lg:block"
//             >
//               <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
//                 Studio Location
//               </p>
//               <div className="w-full h-[500px] rounded-xl overflow-hidden border border-border shadow-2xl">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d985.301299429467!2d38.6819033!3d9.0714483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b884f824eede3%3A0x8ba8f15164975aa7!2s3MCJ%2BHQW%2C%20Burayu!5e0!3m2!1sen!2sus!4v1735680000000"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen={false}
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="Josy Photography Studio - Burayu, Oromia, Ethiopia"
//                 />
//               </div>
//               <p className="font-body text-sm text-muted-foreground mt-4 text-center">
//                 Josy Photography Studio · 3MCJ+HQW, Burayu, Oromia Region, Ethiopia
//               </p>
//             </motion.div>
//           </motion.div>

//           {/* Right Column - Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="order-1 lg:order-2"
//           >
//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="grid sm:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="w-full bg-transparent border-b border-border py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors duration-300"
//                     placeholder="Your name"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full bg-transparent border-b border-border py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors duration-300"
//                     placeholder="your@email.com"
//                   />
//                 </div>
//               </div>

//               <div className="relative">
//                 <label htmlFor="phone" className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
//                   Phone Number
//                 </label>
//                 <div className="flex items-center border-b border-border py-3 focus-within:border-primary transition-colors duration-300">
//                   <div className="flex items-center gap-2 pr-3">
//                     <img
//                       src="https://flagcdn.com/w40/et.png"
//                       alt="Ethiopia flag"
//                       className="w-6 h-4 object-cover rounded-sm"
//                     />
//                     <span className="font-body text-foreground">+251</span>
//                   </div>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="9XX XXX XXX"
//                     value={formData.phone ? formData.phone.slice(4) : ''}
//                     onChange={(e) => setFormData({ ...formData, phone: '+251' + e.target.value.replace(/\D/g, '').slice(0, 9) })}
//                     maxLength={9}
//                     className="w-full bg-transparent font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="message" className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows={4}
//                   required
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   className="w-full bg-transparent border-b border-border py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors duration-300 resize-none"
//                   placeholder="Tell me about your project..."
//                 />
//               </div>

//               <motion.button
//                 type="submit"
//                 disabled={isSubmitting}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? 'Sending...' : 'Send Message'}
//                 <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
//               </motion.button>
//             </form>
//           </motion.div>
//         </div>

//         {/* Mobile Map */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="mt-20 lg:hidden"
//         >
//           <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4 text-center">
//             Studio Location
//           </p>
//           <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden border border-border shadow-2xl">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d985.301299429467!2d38.6819033!3d9.0714483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b884f824eede3%3A0x8ba8f15164975aa7!2s3MCJ%2BHQW%2C%20Burayu!5e0!3m2!1sen!2sus!4v1735680000000"
//               width="100%"
//               height="100%"
//               style={{ border: 0 }}
//               allowFullScreen={false}
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="Josy Photography Studio - Burayu, Oromia, Ethiopia"
//             />
//           </div>
//           <p className="font-body text-sm text-muted-foreground mt-4 text-center">
//             Josy Photography Studio · 3MCJ+HQW, Burayu, Oromia Region, Ethiopia
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Contact;