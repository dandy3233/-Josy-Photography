import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Camera,
  Save,
  Check,
  Key,
  Smartphone,
  Clock,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
}

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingAlerts, setBookingAlerts] = useState(true);
  const [inquiryAlerts, setInquiryAlerts] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      // Load admin email from localStorage for now
      const savedAdminEmail = localStorage.getItem('admin_notification_email');
      if (savedAdminEmail) setAdminEmail(savedAdminEmail);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (data) {
      setProfile(data);
      setFullName(data.full_name || '');
      setPhone(data.phone || '');
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone: phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : (typeof err === 'object' && err !== null && 'message' in err)
            ? String((err as { message?: unknown }).message)
            : String(err);
      toast({
        title: "Error",
        description: message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = () => {
    localStorage.setItem('admin_notification_email', adminEmail);
    localStorage.setItem('email_notifications', String(emailNotifications));
    localStorage.setItem('booking_alerts', String(bookingAlerts));
    localStorage.setItem('inquiry_alerts', String(inquiryAlerts));
    
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AdminLayout>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="font-display text-3xl text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <motion.div variants={itemVariants}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-lg">Profile Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-dashed border-primary/30">
                        <Camera className="h-8 w-8 text-primary/50" />
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Profile Photo</p>
                      <p className="text-xs text-muted-foreground/70">JPG, PNG or GIF. Max 2MB</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-muted/50 text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+251 91 000 0000"
                          className="pl-10 bg-background/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">User ID</Label>
                      <Input
                        value={user?.id || ''}
                        disabled
                        className="bg-muted/50 text-muted-foreground font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={loading} className="gap-2">
                      {loading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Email Notifications */}
            <motion.div variants={itemVariants}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-lg">Email Notifications</CardTitle>
                      <CardDescription>Configure booking and inquiry notifications</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail" className="text-sm font-medium">
                      Admin Notification Email
                    </Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Receive booking notifications at this email address
                    </p>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminEmail"
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="admin@yourstudio.com"
                        className="pl-10 bg-background/50"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive all email notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">New Booking Alerts</p>
                          <p className="text-xs text-muted-foreground">Get notified when a new booking is made</p>
                        </div>
                      </div>
                      <Switch
                        checked={bookingAlerts}
                        onCheckedChange={setBookingAlerts}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">Inquiry Alerts</p>
                          <p className="text-xs text-muted-foreground">Get notified about new inquiries</p>
                        </div>
                      </div>
                      <Switch
                        checked={inquiryAlerts}
                        onCheckedChange={setInquiryAlerts}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveNotifications} variant="outline" className="gap-2">
                      <Check className="h-4 w-4" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Account Status */}
            <motion.div variants={itemVariants}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-lg">Account Status</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Role</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      Admin
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                      Active
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Verified</span>
                    <div className="flex items-center gap-1 text-green-500">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Yes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security */}
            <motion.div variants={itemVariants}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                      <Key className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-lg">Security</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Button variant="outline" className="w-full justify-start gap-2" disabled>
                    <Key className="h-4 w-4" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" disabled>
                    <Smartphone className="h-4 w-4" />
                    Two-Factor Auth
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Additional security options coming soon
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="font-medium">Quick Links</span>
                  </div>
                  <div className="space-y-2">
                    <a 
                      href="/" 
                      target="_blank" 
                      className="block p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors text-sm"
                    >
                      View Public Site →
                    </a>
                    <a 
                      href="/booking" 
                      target="_blank" 
                      className="block p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors text-sm"
                    >
                      Booking Page →
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default SettingsPage;
