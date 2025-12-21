import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { uploadPhoto, deletePhoto } from '@/lib/storage';
import { Plus, Trash2, ArrowLeft, Loader2, Image as ImageIcon, Star, StarOff } from 'lucide-react';

interface Gallery {
  id: string;
  title: string;
}

interface Photo {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  is_featured: boolean;
  created_at: string;
}

const GalleryPhotosPage = () => {
  const { id } = useParams<{ id: string }>();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    const [galleryRes, photosRes] = await Promise.all([
      supabase.from('galleries').select('id, title').eq('id', id).single(),
      supabase.from('photos').select('*').eq('gallery_id', id).order('created_at', { ascending: false })
    ]);

    if (galleryRes.data) {
      setGallery(galleryRes.data);
    }
    if (photosRes.data) {
      setPhotos(photosRes.data);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFiles || uploadFiles.length === 0) return;

    setUploading(true);
    let successCount = 0;

    for (const file of Array.from(uploadFiles)) {
      const url = await uploadPhoto(file, `gallery-${id}`);
      if (url) {
        const { error } = await supabase.from('photos').insert({
          gallery_id: id,
          url,
          title: formData.title || null,
          description: formData.description || null,
        });
        if (!error) successCount++;
      }
    }

    if (successCount > 0) {
      toast({ title: 'Success', description: `${successCount} photo(s) uploaded successfully` });
      fetchData();
    }

    setUploading(false);
    setDialogOpen(false);
    setUploadFiles(null);
    setFormData({ title: '', description: '' });
  };

  const handleDelete = async (photo: Photo) => {
    if (!confirm('Delete this photo?')) return;

    await deletePhoto(photo.url);
    const { error } = await supabase.from('photos').delete().eq('id', photo.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Photo deleted' });
      fetchData();
    }
  };

  const toggleFeatured = async (photo: Photo) => {
    const { error } = await supabase
      .from('photos')
      .update({ is_featured: !photo.is_featured })
      .eq('id', photo.id);

    if (!error) {
      fetchData();
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (!gallery) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">Gallery not found</p>
          <Link to="/admin/galleries" className="text-primary hover:underline">
            Back to galleries
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link 
              to="/admin/galleries" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to galleries
            </Link>
            <h1 className="font-display text-3xl text-foreground">{gallery.title}</h1>
            <p className="text-muted-foreground mt-1">{photos.length} photo(s)</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display">Upload Photos</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="photos">Select Photos</Label>
                  <Input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setUploadFiles(e.target.files)}
                    required
                  />
                  {uploadFiles && (
                    <p className="text-xs text-muted-foreground">{uploadFiles.length} file(s) selected</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title (optional)</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Applied to all photos"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading || !uploadFiles}>
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Upload'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {photos.length === 0 ? (
          <Card className="border-border/50 bg-card/50">
            <CardContent className="py-12 text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No photos yet. Upload some photos!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {photos.map((photo) => (
              <Card key={photo.id} className="border-border/50 bg-card/50 overflow-hidden group">
                <div className="aspect-square relative">
                  <img
                    src={photo.url}
                    alt={photo.title || 'Photo'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => toggleFeatured(photo)}
                      title={photo.is_featured ? 'Remove featured' : 'Mark as featured'}
                    >
                      {photo.is_featured ? <Star className="h-4 w-4 fill-primary text-primary" /> : <StarOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(photo)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {photo.is_featured && (
                    <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>
                {photo.title && (
                  <CardContent className="p-2">
                    <p className="text-sm text-foreground truncate">{photo.title}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GalleryPhotosPage;
