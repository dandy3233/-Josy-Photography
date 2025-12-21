import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Images, 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Stats {
  totalGalleries: number;
  totalPhotos: number;
  totalClients: number;
  totalBookings: number;
  pendingInquiries: number;
  activeServices: number;
}

interface RecentActivity {
  id: string;
  type: 'inquiry' | 'booking' | 'gallery';
  title: string;
  time: string;
  status: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalGalleries: 0,
    totalPhotos: 0,
    totalClients: 0,
    totalBookings: 0,
    pendingInquiries: 0,
    activeServices: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentActivity();
  }, []);

  const fetchStats = async () => {
    const [galleries, photos, clients, bookings, inquiries, services] = await Promise.all([
      supabase.from('galleries').select('id', { count: 'exact' }),
      supabase.from('photos').select('id', { count: 'exact' }),
      supabase.from('clients').select('id', { count: 'exact' }),
      supabase.from('bookings').select('id', { count: 'exact' }),
      supabase.from('inquiries').select('id', { count: 'exact' }).eq('status', 'new'),
      supabase.from('services').select('id', { count: 'exact' }).eq('is_active', true),
    ]);

    setStats({
      totalGalleries: galleries.count || 0,
      totalPhotos: photos.count || 0,
      totalClients: clients.count || 0,
      totalBookings: bookings.count || 0,
      pendingInquiries: inquiries.count || 0,
      activeServices: services.count || 0,
    });
    setLoading(false);
  };

  const fetchRecentActivity = async () => {
    const { data: inquiries } = await supabase
      .from('inquiries')
      .select('id, name, created_at, status')
      .order('created_at', { ascending: false })
      .limit(5);

    const { data: bookingsData } = await supabase
      .from('bookings')
      .select('id, booking_date, created_at, status')
      .order('created_at', { ascending: false })
      .limit(5);

    const activities: RecentActivity[] = [
      ...(inquiries || []).map(i => ({
        id: i.id,
        type: 'inquiry' as const,
        title: `New inquiry from ${i.name}`,
        time: new Date(i.created_at).toLocaleDateString(),
        status: i.status || 'new',
      })),
      ...(bookingsData || []).map(b => ({
        id: b.id,
        type: 'booking' as const,
        title: `Booking for ${new Date(b.booking_date).toLocaleDateString()}`,
        time: new Date(b.created_at).toLocaleDateString(),
        status: b.status || 'pending',
      })),
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8);

    setRecentActivity(activities);
  };

  const statCards = [
    { title: 'Total Galleries', value: stats.totalGalleries, icon: Images, color: 'text-blue-500' },
    { title: 'Total Photos', value: stats.totalPhotos, icon: TrendingUp, color: 'text-green-500' },
    { title: 'Total Clients', value: stats.totalClients, icon: Users, color: 'text-purple-500' },
    { title: 'Bookings', value: stats.totalBookings, icon: Calendar, color: 'text-orange-500' },
    { title: 'Pending Inquiries', value: stats.pendingInquiries, icon: MessageSquare, color: 'text-primary' },
    { title: 'Active Services', value: stats.activeServices, icon: CheckCircle, color: 'text-emerald-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-display mt-1">
                      {loading ? '—' : stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No recent activity</p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={`${activity.type}-${activity.id}`}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      {activity.type === 'inquiry' ? (
                        <MessageSquare className="h-5 w-5 text-primary" />
                      ) : activity.type === 'booking' ? (
                        <Calendar className="h-5 w-5 text-orange-500" />
                      ) : (
                        <Images className="h-5 w-5 text-blue-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        activity.status === 'new' || activity.status === 'pending'
                          ? 'bg-primary/20 text-primary'
                          : activity.status === 'confirmed' || activity.status === 'responded'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
