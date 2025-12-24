import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2, Calendar } from 'lucide-react';

interface Booking {
  id: string;
  booking_date: string;
  status: string;
  total_amount: number | null;
  notes: string | null;
  client_id: string | null;
  service_id: string | null;
  client_name: string | null;
  client_email: string | null;
  client_phone: string | null;
  preferred_location: string | null;
  created_at: string;
}

interface Client {
  id: string;
  name: string;
}

interface Service {
  id: string;
  title: string;
}

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState({
    booking_date: '',
    status: 'pending',
    total_amount: '',
    notes: '',
    client_id: '',
    service_id: '',
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [bookingsRes, clientsRes, servicesRes] = await Promise.all([
      supabase.from('bookings').select('*').order('booking_date', { ascending: false }),
      supabase.from('clients').select('id, name'),
      supabase.from('services').select('id, title').eq('is_active', true),
    ]);

    if (bookingsRes.data) setBookings(bookingsRes.data);
    if (clientsRes.data) setClients(clientsRes.data);
    if (servicesRes.data) setServices(servicesRes.data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      booking_date: formData.booking_date,
      status: formData.status,
      total_amount: formData.total_amount ? parseFloat(formData.total_amount) : null,
      notes: formData.notes || null,
      client_id: formData.client_id || null,
      service_id: formData.service_id || null,
    };

    if (editingBooking) {
      const { error } = await supabase.from('bookings').update(data).eq('id', editingBooking.id);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Booking updated successfully' });
        fetchData();
        closeDialog();
      }
    } else {
      const { error } = await supabase.from('bookings').insert(data);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Booking created successfully' });
        fetchData();
        closeDialog();
      }
    }

    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    const { error } = await supabase.from('bookings').delete().eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Booking deleted successfully' });
      fetchData();
    }
  };

  const openEditDialog = (booking: Booking) => {
    setEditingBooking(booking);
    setFormData({
      booking_date: booking.booking_date,
      status: booking.status || 'pending',
      total_amount: booking.total_amount?.toString() || '',
      notes: booking.notes || '',
      client_id: booking.client_id || '',
      service_id: booking.service_id || '',
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingBooking(null);
    setFormData({ booking_date: '', status: 'pending', total_amount: '', notes: '', client_id: '', service_id: '' });
  };

  const getClientName = (id: string | null) => clients.find(c => c.id === id)?.name || 'Unknown';
  const getServiceTitle = (id: string | null) => services.find(s => s.id === id)?.title || 'Unknown';

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-500',
    confirmed: 'bg-green-500/20 text-green-500',
    completed: 'bg-blue-500/20 text-blue-500',
    cancelled: 'bg-red-500/20 text-red-500',
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-foreground">Bookings</h1>
            <p className="text-muted-foreground mt-1">Manage client bookings and sessions</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
            <DialogTrigger asChild>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {editingBooking ? 'Edit Booking' : 'New Booking'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="booking_date">Booking Date</Label>
                  <Input
                    id="booking_date"
                    type="date"
                    value={formData.booking_date}
                    onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Select value={formData.client_id} onValueChange={(v) => setFormData({ ...formData, client_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                    <SelectContent>
                      {clients.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Service</Label>
                  <Select value={formData.service_id} onValueChange={(v) => setFormData({ ...formData, service_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total_amount">Total Amount</Label>
                  <Input
                    id="total_amount"
                    type="number"
                    step="0.01"
                    value={formData.total_amount}
                    onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
                  <Button type="submit" disabled={saving}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingBooking ? 'Update' : 'Create'}
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
        ) : bookings.length === 0 ? (
          <Card className="border-border/50 bg-card/50">
            <CardContent className="py-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No bookings yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="border-border/50 bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {new Date(booking.booking_date).toLocaleDateString('en-US', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {booking.client_name || 'No client'} • {booking.service_id ? getServiceTitle(booking.service_id) : 'No service'}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                          {booking.client_email && <span>📧 {booking.client_email}</span>}
                          {booking.client_phone && <span>📞 {booking.client_phone}</span>}
                          {booking.preferred_location && <span>📍 {booking.preferred_location}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {booking.total_amount && (
                        <span className="font-medium text-foreground">${booking.total_amount}</span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded ${statusColors[booking.status || 'pending']}`}>
                        {booking.status}
                      </span>
                      <Button size="sm" variant="ghost" onClick={() => openEditDialog(booking)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(booking.id)}>
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

export default BookingsPage;
