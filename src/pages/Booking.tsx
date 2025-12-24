// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { Calendar, Clock, ArrowLeft } from 'lucide-react';
// // import { Link } from 'react-router-dom';
// // import { supabase } from '@/integrations/supabase/client';
// // import { useToast } from '@/hooks/use-toast';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Label } from '@/components/ui/label';
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from '@/components/ui/select';

// // interface Service {
// //   id: string;
// //   title: string;
// //   price: number | null;
// //   duration: string | null;
// //   description: string | null;
// // }

// // const Booking = () => {
// //   const { toast } = useToast();
// //   const [services, setServices] = useState<Service[]>([]);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     service_id: '',
// //     booking_date: '',
// //     notes: '',
// //   });

// //   useEffect(() => {
// //     fetchServices();
// //   }, []);

// //   const fetchServices = async () => {
// //     const { data } = await supabase
// //       .from('services')
// //       .select('id, title, price, duration, description')
// //       .eq('is_active', true)
// //       .order('title');
    
// //     if (data) setServices(data);
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     try {
// //       // First, create or find the client
// //       const { data: existingClient } = await supabase
// //         .from('clients')
// //         .select('id')
// //         .eq('email', formData.email)
// //         .maybeSingle();

// //       let clientId = existingClient?.id;

// //       if (!clientId) {
// //         const { data: newClient, error: clientError } = await supabase
// //           .from('clients')
// //           .insert({
// //             name: formData.name,
// //             email: formData.email,
// //             phone: formData.phone || null,
// //           })
// //           .select('id')
// //           .single();

// //         if (clientError) throw clientError;
// //         clientId = newClient.id;
// //       }

// //       // Get service price
// //       const selectedService = services.find(s => s.id === formData.service_id);
      
// //       // Create the booking
// //       const { error: bookingError } = await supabase
// //         .from('bookings')
// //         .insert({
// //           client_id: clientId,
// //           service_id: formData.service_id,
// //           booking_date: formData.booking_date,
// //           notes: formData.notes || null,
// //           total_amount: selectedService?.price || null,
// //           status: 'pending',
// //         });

// //       if (bookingError) throw bookingError;

// //       toast({
// //         title: "Booking Submitted!",
// //         description: "We'll confirm your booking within 24 hours.",
// //       });

// //       setFormData({
// //         name: '',
// //         email: '',
// //         phone: '',
// //         service_id: '',
// //         booking_date: '',
// //         notes: '',
// //       });
// //     } catch (error: unknown) {
// //       const message =
// //         error instanceof Error ? error.message : String(error ?? "Failed to submit booking");

// //       toast({
// //         title: "Error",
// //         description: message || "Failed to submit booking",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* Header */}
// //       <div className="bg-card border-b border-border">
// //         <div className="container mx-auto px-6 py-6">
// //           <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
// //             <ArrowLeft className="w-4 h-4" />
// //             <span className="font-body text-sm">Back to Home</span>
// //           </Link>
// //         </div>
// //       </div>

// //       <div className="container mx-auto px-6 py-16">
// //         <div className="max-w-2xl mx-auto">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //           >
// //             <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4 text-center">
// //               Book a Session
// //             </p>
// //             <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6 text-center">
// //               Schedule Your <span className="italic text-primary">Shoot</span>
// //             </h1>
// //             <p className="font-body text-muted-foreground text-center mb-12 max-w-lg mx-auto">
// //               Fill out the form below and we'll confirm your booking within 24 hours.
// //             </p>
// //           </motion.div>

// //           <motion.form
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //             onSubmit={handleSubmit}
// //             className="space-y-6 bg-card p-8 border border-border"
// //           >
// //             <div className="grid sm:grid-cols-2 gap-6">
// //               <div className="space-y-2">
// //                 <Label htmlFor="name">Full Name *</Label>
// //                 <Input
// //                   id="name"
// //                   required
// //                   value={formData.name}
// //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                   placeholder="Your full name"
// //                 />
// //               </div>
// //               <div className="space-y-2">
// //                 <Label htmlFor="email">Email *</Label>
// //                 <Input
// //                   id="email"
// //                   type="email"
// //                   required
// //                   value={formData.email}
// //                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                   placeholder="your@email.com"
// //                 />
// //               </div>
// //             </div>

// //             <div className="grid sm:grid-cols-2 gap-6">
// //               <div className="space-y-2">
// //                 <Label htmlFor="phone">Phone</Label>
// //                 <Input
// //                   id="phone"
// //                   type="tel"
// //                   value={formData.phone}
// //                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// //                   placeholder="+1 (555) 000-0000"
// //                 />
// //               </div>
// //               <div className="space-y-2">
// //                 <Label htmlFor="date">Preferred Date *</Label>
// //                 <div className="relative">
// //                   <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// //                   <Input
// //                     id="date"
// //                     type="date"
// //                     required
// //                     className="pl-10"
// //                     value={formData.booking_date}
// //                     onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
// //                     min={new Date().toISOString().split('T')[0]}
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="service">Select Service *</Label>
// //               <Select
// //                 value={formData.service_id}
// //                 onValueChange={(value) => setFormData({ ...formData, service_id: value })}
// //                 required
// //               >
// //                 <SelectTrigger>
// //                   <SelectValue placeholder="Choose a service" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   {services.map((service) => (
// //                     <SelectItem key={service.id} value={service.id}>
// //                       <div className="flex items-center gap-2">
// //                         <span>{service.title}</span>
// //                         {service.price && (
// //                           <span className="text-muted-foreground">- ${service.price}</span>
// //                         )}
// //                         {service.duration && (
// //                           <span className="flex items-center gap-1 text-muted-foreground text-xs">
// //                             <Clock className="w-3 h-3" />
// //                             {service.duration}
// //                           </span>
// //                         )}
// //                       </div>
// //                     </SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="notes">Additional Notes</Label>
// //               <Textarea
// //                 id="notes"
// //                 value={formData.notes}
// //                 onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
// //                 placeholder="Tell us about your vision, location preferences, or any special requests..."
// //                 rows={4}
// //               />
// //             </div>

// //             <Button
// //               type="submit"
// //               disabled={isSubmitting}
// //               className="w-full"
// //               size="lg"
// //             >
// //               {isSubmitting ? 'Submitting...' : 'Book Now'}
// //             </Button>
// //           </motion.form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Booking;
// // dddddddddddddddddddddddddddddddddddddddddddd
// // src/pages/Booking.tsx
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Calendar as CalendarIcon, Clock, MapPin, ArrowLeft, Loader2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { format } from 'date-fns';

// // Supabase
// import { supabase } from '@/integrations/supabase/client';
// import { useToast } from '@/hooks/use-toast';

// // shadcn/ui components
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Calendar } from '@/components/ui/calendar';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { cn } from '@/lib/utils';

// interface Service {
//   id: string;
//   title: string;
//   price: number | null;
//   duration: string | null;
//   description?: string;
// }

// const Booking = () => {
//   const { toast } = useToast();

//   const [services, setServices] = useState<Service[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [date, setDate] = useState<Date | undefined>(undefined);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     location: '',        // ← New location field
//     service_id: '',
//     notes: '',
//   });

//   // Fetch services from Supabase
//   useEffect(() => {
//     const fetchServices = async () => {
//       const { data, error } = await supabase
//         .from('services')
//         .select('id, title, price, duration, description')
//         .eq('is_active', true)
//         .order('title');

//       if (error) {
//         toast({
//           title: "Error",
//           description: "Could not load services. Please try again later.",
//           variant: "destructive",
//         });
//         console.error(error);
//       } else if (data) {
//         setServices(data);
//       }
//     };

//     fetchServices();
//   }, [toast]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!date) {
//       toast({
//         title: "Date Required",
//         description: "Please select your preferred date.",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!formData.service_id) {
//       toast({
//         title: "Service Required",
//         description: "Please choose a service.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // 1. Find or create client
//       const { data: existingClient } = await supabase
//         .from('clients')
//         .select('id')
//         .eq('email', formData.email)
//         .single();

//       let clientId = existingClient?.id;

//       if (!clientId) {
//         const { data: newClient, error: clientError } = await supabase
//           .from('clients')
//           .insert({
//             name: formData.name,
//             email: formData.email,
//             phone: formData.phone || null,
//           })
//           .select('id')
//           .single();

//         if (clientError) throw clientError;
//         clientId = newClient.id;
//       }

//       // 2. Create booking
//       const selectedService = services.find(s => s.id === formData.service_id);

//       const { error: bookingError } = await supabase
//         .from('bookings')
//         .insert({
//           client_id: clientId,
//           service_id: formData.service_id,
//           booking_date: date.toISOString().split('T')[0], // YYYY-MM-DD
//           location: formData.location || null,
//           notes: formData.notes || null,
//           total_amount: selectedService?.price || null,
//           status: 'pending',
//         });

//       if (bookingError) throw bookingError;

//       toast({
//         title: "Booking Submitted! 🎉",
//         description: "Thank you! We'll confirm your session within 24 hours.",
//       });

//       // Reset form
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         location: '',
//         service_id: '',
//         notes: '',
//       });
//       setDate(undefined);
//     } catch (err: unknown) {
//       const errorMessage =
//         err instanceof Error ? err.message : String(err ?? "Please try again or contact us directly.");

//       toast({
//         title: "Submission Failed",
//         description: errorMessage,
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-card border-b border-border">
//         <div className="container mx-auto px-6 py-6">
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-body"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Home
//           </Link>
//         </div>
//       </div>

//       <div className="container mx-auto px-6 py-16 lg:py-24">
//         <div className="max-w-3xl mx-auto">
//           {/* Hero */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
//               Book a Session
//             </p>
//             <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
//               Schedule Your <span className="italic text-primary">Shoot</span>
//             </h1>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Fill in your details and preferred date/location. We’ll confirm everything soon!
//             </p>
//           </motion.div>

//           {/* Form */}
//           <motion.form
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             onSubmit={handleSubmit}
//             className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-xl"
//           >
//             {/* Name & Email */}
//             <div className="grid md:grid-cols-2 gap-6 mb-6">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name *</Label>
//                 <Input
//                   id="name"
//                   required
//                   placeholder="Your full name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address *</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   required
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>

//             {/* Phone & Location */}
//             <div className="grid md:grid-cols-2 gap-6 mb-6">
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number *</Label>
//                 <Input
//                   id="phone"
//                   type="tel"
//                   required
//                   placeholder="+251 91 123 4567"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="location">Preferred Location *</Label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
//                   <Input
//                     id="location"
//                     required
//                     placeholder="e.g. Bole, Addis Ababa or Studio"
//                     className="pl-10"
//                     value={formData.location}
//                     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Date Picker */}
//             <div className="grid md:grid-cols-2 gap-6 mb-6">
//               <div className="space-y-2 md:col-span-2">
//                 <Label>Preferred Date *</Label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant="outline"
//                       className={cn(
//                         "w-full justify-start text-left font-normal h-12",
//                         !date && "text-muted-foreground"
//                       )}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {date ? format(date, "PPP") : <span>Pick a date</span>}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                       mode="single"
//                       selected={date}
//                       onSelect={setDate}
//                       disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   Available from today onward
//                 </p>
//               </div>
//             </div>

//             {/* Service */}
//             <div className="space-y-2 mb-6">
//               <Label>Choose Service *</Label>
//               <Select
//                 value={formData.service_id}
//                 onValueChange={(value) => setFormData({ ...formData, service_id: value })}
//                 required
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a photography service" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {services.length === 0 ? (
//                     <SelectItem value="loading" disabled>
//                       Loading services...
//                     </SelectItem>
//                   ) : (
//                     services.map((service) => (
//                       <SelectItem key={service.id} value={service.id}>
//                         <div className="flex justify-between items-center w-full">
//                           <span>{service.title}</span>
//                           <div className="flex items-center gap-3 text-sm text-muted-foreground">
//                             {service.price && <span>ETB {service.price.toLocaleString()}</span>}
//                             {service.duration && (
//                               <span className="flex items-center gap-1">
//                                 <Clock className="w-3 h-3" />
//                                 {service.duration}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </SelectItem>
//                     ))
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Notes */}
//             <div className="space-y-2 mb-8">
//               <Label htmlFor="notes">Additional Notes (optional)</Label>
//               <Textarea
//                 id="notes"
//                 rows={5}
//                 placeholder="Any special requests, number of people, outfit ideas, or vision for the shoot..."
//                 value={formData.notes}
//                 onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//               />
//             </div>

//             {/* Submit */}
//             <Button
//               type="submit"
//               disabled={isSubmitting || !date || !formData.service_id}
//               className="w-full h-14 text-lg font-medium rounded-full bg-primary hover:bg-primary/90"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   Submitting Request...
//                 </>
//               ) : (
//                 'Submit Booking Request'
//               )}
//             </Button>

//             <p className="text-center text-sm text-muted-foreground mt-6">
//               We’ll review and confirm your booking within 24 hours.
//             </p>
//           </motion.form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;
// src/pages/Booking.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, Clock, ArrowLeft, MapPin, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Supabase
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Service {
  id: string;
  title: string;
  price: number | null;
  duration: string | null;
  description: string | null;
}

const Booking = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  // Advanced date picker state
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_location: '',
    service_id: '',
    notes: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoadingServices(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, title, price, duration, description')
        .eq('is_active', true)
        .order('title');

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      toast({
        title: 'Error loading services',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingServices(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast({
        title: 'Date Required',
        description: 'Please select your preferred shoot date.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedService = services.find((s) => s.id === formData.service_id);

      const { error: bookingError } = await supabase.from('bookings').insert({
        client_name: formData.name.trim(),
        client_email: formData.email.toLowerCase().trim(),
        client_phone: formData.phone || null,
        preferred_location: formData.preferred_location.trim() || null,
        service_id: formData.service_id,
        booking_date: date.toISOString().split('T')[0], // YYYY-MM-DD
        notes: formData.notes.trim() || null,
        total_amount: selectedService?.price || null,
        status: 'pending',
      });

      if (bookingError) throw bookingError;

      // Optional: Send notification
      try {
        await supabase.functions.invoke('send-booking-notification', {
          body: {
            clientName: formData.name,
            clientEmail: formData.email,
            clientPhone: formData.phone,
            bookingDate: format(date, 'PPP'),
            serviceName: selectedService?.title || '',
            preferredLocation: formData.preferred_location,
            notes: formData.notes,
          },
        });
      } catch (emailErr) {
        console.warn('Notification failed (non-critical):', emailErr);
      }

      toast({
        title: 'Booking Request Sent! 🎉',
        description: "We'll confirm your session within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferred_location: '',
        service_id: '',
        notes: '',
      });
      setDate(undefined);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error ?? 'Please try again.');

      toast({
        title: 'Submission Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-primary text-sm tracking-widest uppercase mb-4">
              Book a Session
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Schedule Your <span className="italic text-primary">Shoot</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Fill out the form below and we'll confirm your booking within 24 hours.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8 bg-card p-8 md:p-10 rounded-2xl border border-border shadow-xl"
          >
            {/* Name & Email */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Phone & Location */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+251 91 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Preferred Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="location"
                    required
                    className="pl-10"
                    placeholder="e.g. Bole, Addis Ababa, Studio"
                    value={formData.preferred_location}
                    onChange={(e) =>
                      setFormData({ ...formData, preferred_location: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Modern Date Picker & Service */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Preferred Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-12",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP") // e.g. "Wednesday, December 24, 2025"
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground mt-1">
                  Available from today onward
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Select Service *</Label>
                <Select
                  value={formData.service_id}
                  onValueChange={(value) => setFormData({ ...formData, service_id: value })}
                  disabled={isLoadingServices}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isLoadingServices ? "Loading..." : "Choose a service"} />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{service.title}</span>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            {service.price && <span>ETB {service.price.toLocaleString()}</span>}
                            {service.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {service.duration}
                              </span>
                            )}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                rows={5}
                placeholder="Tell us about your vision, special requests, outfits, number of people..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !date || !formData.service_id}
              className="w-full h-14 text-lg font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Book Now'
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Booking;