import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { uploadPhoto, deletePhoto } from '@/lib/storage';
import { Plus, Trash2, Loader2, Image as ImageIcon, GripVertical, Eye, EyeOff, Pencil } from 'lucide-react';

interface HeroImage {
  id: string;
  url: string;
  title: string | null;
  subtitle: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const HeroImagesPage = () => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    is_active: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('hero_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setImages(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = editingImage?.url || '';

    if (uploadFile) {
      const url = await uploadPhoto(uploadFile, 'hero');
      if (url) {
        imageUrl = url;
      } else {
        toast({ title: 'Error', description: 'Failed to upload image', variant: 'destructive' });
        setUploading(false);
        return;
      }
    }

    if (!imageUrl) {
      toast({ title: 'Error', description: 'Please select an image', variant: 'destructive' });
      setUploading(false);
      return;
    }

    if (editingImage) {
      const { error } = await supabase
        .from('hero_images')
        .update({
          url: imageUrl,
          title: formData.title || null,
          subtitle: formData.subtitle || null,
          is_active: formData.is_active,
        })
        .eq('id', editingImage.id);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Hero image updated' });
        fetchImages();
        closeDialog();
      }
    } else {
      const maxOrder = images.length > 0 ? Math.max(...images.map(i => i.display_order)) + 1 : 0;

      const { error } = await supabase.from('hero_images').insert({
        url: imageUrl,
        title: formData.title || null,
        subtitle: formData.subtitle || null,
        is_active: formData.is_active,
        display_order: maxOrder,
      });

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Hero image added' });
        fetchImages();
        closeDialog();
      }
    }

    setUploading(false);
  };

  const handleDelete = async (image: HeroImage) => {
    if (!confirm('Delete this hero image?')) return;

    await deletePhoto(image.url);
    const { error } = await supabase.from('hero_images').delete().eq('id', image.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Hero image deleted' });
      fetchImages();
    }
  };

  const toggleActive = async (image: HeroImage) => {
    const { error } = await supabase
      .from('hero_images')
      .update({ is_active: !image.is_active })
      .eq('id', image.id);

    if (!error) {
      fetchImages();
    }
  };

  const moveImage = async (image: HeroImage, direction: 'up' | 'down') => {
    const currentIndex = images.findIndex(i => i.id === image.id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= images.length) return;

    const targetImage = images[targetIndex];

    await Promise.all([
      supabase.from('hero_images').update({ display_order: targetImage.display_order }).eq('id', image.id),
      supabase.from('hero_images').update({ display_order: image.display_order }).eq('id', targetImage.id),
    ]);

    fetchImages();
  };

  const openEditDialog = (image: HeroImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title || '',
      subtitle: image.subtitle || '',
      is_active: image.is_active,
    });
    setUploadFile(null);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingImage(null);
    setFormData({ title: '', subtitle: '', is_active: true });
    setUploadFile(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-foreground">Hero Images</h1>
            <p className="text-muted-foreground mt-1">Manage homepage slider images</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
            <DialogTrigger asChild>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {editingImage ? 'Edit Hero Image' : 'Add Hero Image'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    required={!editingImage}
                  />
                  {editingImage && !uploadFile && (
                    <p className="text-xs text-muted-foreground">Current image will be kept if no new file selected</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title (optional)</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Visual Storytelling"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle (optional)</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g., Capturing moments that last"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_active" className="cursor-pointer">Active</Label>
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : editingImage ? 'Update' : 'Add'}
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
        ) : images.length === 0 ? (
          <Card className="border-border/50 bg-card/50">
            <CardContent className="py-12 text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hero images yet. Add your first slider image!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {images.map((image, index) => (
              <Card key={image.id} className="border-border/50 bg-card/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center px-2 py-4 bg-muted/50">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        disabled={index === 0}
                        onClick={() => moveImage(image, 'up')}
                      >
                        ▲
                      </Button>
                      <GripVertical className="h-4 w-4 text-muted-foreground my-1" />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        disabled={index === images.length - 1}
                        onClick={() => moveImage(image, 'down')}
                      >
                        ▼
                      </Button>
                    </div>
                    <div className="w-40 h-24 flex-shrink-0">
                      <img
                        src={image.url}
                        alt={image.title || 'Hero image'}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 py-4">
                      <h3 className="font-display text-lg text-foreground">
                        {image.title || 'Untitled'}
                      </h3>
                      {image.subtitle && (
                        <p className="text-sm text-muted-foreground">{image.subtitle}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Order: {image.display_order + 1}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pr-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleActive(image)}
                        title={image.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {image.is_active ? (
                          <Eye className="h-4 w-4 text-green-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => openEditDialog(image)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(image)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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

export default HeroImagesPage;
