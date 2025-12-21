import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { uploadPhoto, deletePhoto } from '@/lib/storage';
import { Plus, Pencil, Trash2, Image, Loader2, Eye, EyeOff, Star, Images } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Gallery {
  id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  is_public: boolean;
  is_featured: boolean;
  created_at: string;
}

const GalleriesPage = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_public: true,
    is_featured: false,
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    const { data, error } = await supabase
      .from('galleries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setGalleries(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let coverUrl = editingGallery?.cover_image || null;

    if (coverImage) {
      const uploadedUrl = await uploadPhoto(coverImage, 'covers');
      if (uploadedUrl) {
        coverUrl = uploadedUrl;
      }
    }

    if (editingGallery) {
      const { error } = await supabase
        .from('galleries')
        .update({
          title: formData.title,
          description: formData.description || null,
          cover_image: coverUrl,
          is_public: formData.is_public,
          is_featured: formData.is_featured,
        })
        .eq('id', editingGallery.id);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Gallery updated successfully' });
        fetchGalleries();
        closeDialog();
      }
    } else {
      const { error } = await supabase.from('galleries').insert({
        title: formData.title,
        description: formData.description || null,
        cover_image: coverUrl,
        is_public: formData.is_public,
        is_featured: formData.is_featured,
      });

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Gallery created successfully' });
        fetchGalleries();
        closeDialog();
      }
    }

    setSaving(false);
  };

  const handleDelete = async (gallery: Gallery) => {
    if (!confirm('Are you sure you want to delete this gallery?')) return;

    if (gallery.cover_image) {
      await deletePhoto(gallery.cover_image);
    }

    const { error } = await supabase.from('galleries').delete().eq('id', gallery.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Gallery deleted successfully' });
      fetchGalleries();
    }
  };

  const openEditDialog = (gallery: Gallery) => {
    setEditingGallery(gallery);
    setFormData({
      title: gallery.title,
      description: gallery.description || '',
      is_public: gallery.is_public,
      is_featured: gallery.is_featured,
    });
    setCoverImage(null);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingGallery(null);
    setFormData({ title: '', description: '', is_public: true, is_featured: false });
    setCoverImage(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-foreground">Galleries</h1>
            <p className="text-muted-foreground mt-1">Manage your photo galleries</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
            <DialogTrigger asChild>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Gallery
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {editingGallery ? 'Edit Gallery' : 'Create Gallery'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover">Cover Image</Label>
                  <Input
                    id="cover"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                  />
                  {editingGallery?.cover_image && !coverImage && (
                    <p className="text-xs text-muted-foreground">Current cover image set</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_public" className="cursor-pointer">Public Gallery</Label>
                  <Switch
                    id="is_public"
                    checked={formData.is_public}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_featured" className="cursor-pointer">Featured Gallery</Label>
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingGallery ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : galleries.length === 0 ? (
          <Card className="border-border/50 bg-card/50">
            <CardContent className="py-12 text-center">
              <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No galleries yet. Create your first gallery!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((gallery) => (
              <Card key={gallery.id} className="border-border/50 bg-card/50 overflow-hidden group">
                <div className="aspect-video bg-muted relative">
                  {gallery.cover_image ? (
                    <img
                      src={gallery.cover_image}
                      alt={gallery.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    {gallery.is_featured && (
                      <span className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Star className="h-3 w-3" /> Featured
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded ${gallery.is_public ? 'bg-green-500/90 text-white' : 'bg-muted text-muted-foreground'}`}>
                      {gallery.is_public ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display text-lg text-foreground">{gallery.title}</h3>
                  {gallery.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{gallery.description}</p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link to={`/admin/galleries/${gallery.id}/photos`}>
                        <Images className="h-4 w-4 mr-1" /> Photos
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => openEditDialog(gallery)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(gallery)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GalleriesPage;
