import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Star, Trash2 } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  client_title: string | null;
  content: string;
  rating: number;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setTestimonials(data);
    setLoading(false);
  };

  const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
    const { error } = await supabase.from('testimonials').update(updates).eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      fetchTestimonials();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) fetchTestimonials();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl text-foreground">Testimonials</h1>
          <p className="text-muted-foreground mt-1">Manage client testimonials</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : testimonials.length === 0 ? (
          <Card className="border-border/50 bg-card/50">
            <CardContent className="py-12 text-center">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No testimonials yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {testimonials.map((t) => (
              <Card key={t.id} className="border-border/50 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-foreground">{t.client_name}</h3>
                      {t.client_title && <p className="text-sm text-muted-foreground">{t.client_title}</p>}
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < (t.rating || 5) ? 'text-primary fill-primary' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Approved</span>
                        <Switch checked={t.is_approved ?? false} onCheckedChange={(v) => updateTestimonial(t.id, { is_approved: v })} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Featured</span>
                        <Switch checked={t.is_featured ?? false} onCheckedChange={(v) => updateTestimonial(t.id, { is_featured: v })} />
                      </div>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(t.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-foreground/80">{t.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TestimonialsPage;
