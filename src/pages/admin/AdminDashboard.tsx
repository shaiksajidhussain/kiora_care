import React, { useEffect, useState, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth, getAdminToken } from '@/contexts/AdminAuthContext';
import { getBackendUrl } from '@/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  LogOut,
  Mail,
  FlaskConical,
  Loader2,
  Search,
  RefreshCw,
  User,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Submission = {
  id: number;
  form_type: string;
  user_type: string | null;
  full_name: string;
  email_address: string;
  phone_number: string;
  gender: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  message: string | null;
  selected_plan: string | null;
  agree_to_contact: boolean;
  created_at: string;
};

type TabId = 'get-in-touch' | 'tests';

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [getInTouch, setGetInTouch] = useState<Submission[]>([]);
  const [tests, setTests] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('get-in-touch');
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchData = async () => {
    const token = getAdminToken();
    const backendUrl = getBackendUrl();
    if (!token) return;
    setLoading(true);
    try {
      const [contactRes, testRes] = await Promise.all([
        fetch(`${backendUrl}/api/admin/submissions?form_type=contact`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${backendUrl}/api/admin/submissions?form_type=schedule-test`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      if (contactRes.status === 401 || testRes.status === 401) {
        logout();
        navigate('/admin/login', { replace: true });
        return;
      }
      const contactData = await contactRes.json().catch(() => ({ data: [] }));
      const testData = await testRes.json().catch(() => ({ data: [] }));
      setGetInTouch(contactData.data || []);
      setTests(testData.data || []);
      setError('');
    } catch (e) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchData();
  }, [isAuthenticated]);

  const filteredContact = useMemo(() => {
    if (!search.trim()) return getInTouch;
    const q = search.trim().toLowerCase();
    return getInTouch.filter(
      (r) =>
        r.full_name?.toLowerCase().includes(q) ||
        r.email_address?.toLowerCase().includes(q) ||
        r.phone_number?.includes(q) ||
        r.message?.toLowerCase().includes(q)
    );
  }, [getInTouch, search]);

  const filteredTests = useMemo(() => {
    if (!search.trim()) return tests;
    const q = search.trim().toLowerCase();
    return tests.filter(
      (r) =>
        r.full_name?.toLowerCase().includes(q) ||
        r.email_address?.toLowerCase().includes(q) ||
        r.phone_number?.includes(q) ||
        r.city?.toLowerCase().includes(q) ||
        r.state?.toLowerCase().includes(q) ||
        r.pincode?.includes(q) ||
        r.address?.toLowerCase().includes(q) ||
        r.gender?.toLowerCase().includes(q) ||
        r.selected_plan?.toLowerCase().includes(q) ||
        r.message?.toLowerCase().includes(q)
    );
  }, [tests, search]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  if (loading && getInTouch.length === 0 && tests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const contactCount = filteredContact.length;
  const testCount = filteredTests.length;

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Drawer Menu */}
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden p-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-2">
                  <Button
                    variant={activeTab === 'get-in-touch' ? 'default' : 'ghost'}
                    className="w-full justify-start gap-3 h-12"
                    onClick={() => {
                      setActiveTab('get-in-touch');
                      setDrawerOpen(false);
                    }}
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">Get in touch</span>
                    {getInTouch.length > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {getInTouch.length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={activeTab === 'tests' ? 'default' : 'ghost'}
                    className="w-full justify-start gap-3 h-12"
                    onClick={() => {
                      setActiveTab('tests');
                      setDrawerOpen(false);
                    }}
                  >
                    <FlaskConical className="h-5 w-5" />
                    <span className="font-medium">Tests</span>
                    {tests.length > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {tests.length}
                      </Badge>
                    )}
                  </Button>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        handleLogout();
                        setDrawerOpen(false);
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Logout</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                K
              </div>
              <div>
                <p className="text-sm font-semibold leading-none text-gray-900">Kiora Care</p>
                <p className="text-xs text-gray-500">Admin Portal</p>
              </div>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Button
                variant={activeTab === 'get-in-touch' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('get-in-touch')}
                className="gap-2 font-medium"
              >
                <Mail className="h-4 w-4" />
                Get in touch
                {getInTouch.length > 0 && (
                  <Badge variant={activeTab === 'get-in-touch' ? 'secondary' : 'outline'} className="ml-1 bg-white/20 border-0 text-current">
                    {getInTouch.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant={activeTab === 'tests' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('tests')}
                className="gap-2 font-medium"
              >
                <FlaskConical className="h-4 w-4" />
                Tests
                {tests.length > 0 && (
                  <Badge variant={activeTab === 'tests' ? 'secondary' : 'outline'} className="ml-1 bg-white/20 border-0 text-current">
                    {tests.length}
                  </Badge>
                )}
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading} className="font-medium border-gray-200">
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
              <span className="hidden sm:inline ml-2">Refresh</span>
            </Button>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium leading-none text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 lg:p-6 max-w-6xl mx-auto bg-white overflow-x-hidden">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2 font-medium">
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">
            {activeTab === 'get-in-touch' ? 'Get in touch' : 'Tests'}
          </span>
        </div>

        {/* Title + summary card */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {activeTab === 'get-in-touch' ? 'Get in touch' : 'Tests'}
            </h1>
            <p className="text-gray-500 text-sm mt-0.5 font-medium">
              {activeTab === 'get-in-touch'
                ? 'Contact form submissions from the website.'
                : 'Schedule-a-test form submissions.'}
            </p>
          </div>
          <Card className="w-full sm:w-auto sm:min-w-[180px] border-gray-200 bg-white shadow-sm">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {activeTab === 'get-in-touch' ? (
                    <Mail className="h-5 w-5" />
                  ) : (
                    <FlaskConical className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold leading-none text-gray-900">
                    {activeTab === 'get-in-touch' ? contactCount : testCount}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {activeTab === 'get-in-touch' ? 'Contact submissions' : 'Test requests'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <p className="text-destructive text-sm mb-4 font-medium">{error}</p>
        )}

        {/* Search */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={
                activeTab === 'get-in-touch'
                  ? 'Search by name, email, or phone...'
                  : 'Search by name, email, phone, address, city, or plan...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-gray-200 font-medium placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Showing X to Y of Z */}
        <p className="text-sm text-gray-500 mb-3 font-medium">
          {activeTab === 'get-in-touch' ? (
            contactCount === 0 ? (
              'Showing 0 of 0 submissions'
            ) : (
              `Showing 1 to ${contactCount} of ${contactCount} submissions`
            )
          ) : testCount === 0 ? (
            'Showing 0 of 0 requests'
          ) : (
            `Showing 1 to ${testCount} of ${testCount} requests`
          )}
        </p>

        {/* Table */}
        <Card className="border-gray-200 bg-white shadow-sm">
          <CardContent className="p-0">
            {activeTab === 'get-in-touch' ? (
              getInTouch.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm font-medium">
                  No contact submissions yet.
                </div>
              ) : filteredContact.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm font-medium">
                  No results match your search.
                </div>
              ) : (
                <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                  <div className="inline-block min-w-full align-middle">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow className="bg-primary/5 hover:bg-primary/5 border-gray-200">
                          <TableHead className="font-semibold text-gray-700 min-w-[120px]">NAME</TableHead>
                          <TableHead className="font-semibold text-gray-700 min-w-[180px]">EMAIL</TableHead>
                          <TableHead className="font-semibold text-gray-700 min-w-[120px]">PHONE</TableHead>
                          <TableHead className="font-semibold text-gray-700 min-w-[150px] hidden md:table-cell">MESSAGE</TableHead>
                          <TableHead className="font-semibold text-gray-700 text-right min-w-[140px] whitespace-nowrap">DATE</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredContact.map((row) => (
                          <TableRow key={row.id} className="border-gray-100 hover:bg-primary/5">
                            <TableCell className="font-medium text-gray-900 min-w-[120px] break-words">{row.full_name}</TableCell>
                            <TableCell className="text-gray-600 font-medium min-w-[180px] break-all">{row.email_address}</TableCell>
                            <TableCell className="text-gray-900 font-medium min-w-[120px] whitespace-nowrap">{row.phone_number}</TableCell>
                            <TableCell className="max-w-[200px] truncate text-gray-600 font-medium hidden md:table-cell" title={row.message || ''}>
                              {row.message || '—'}
                            </TableCell>
                            <TableCell className="text-right text-gray-500 text-xs whitespace-nowrap font-medium min-w-[140px]">
                              {format(new Date(row.created_at), 'MMM d, yyyy, h:mm a')}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )
            ) : tests.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm font-medium">
                No test schedule submissions yet.
              </div>
            ) : filteredTests.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm font-medium">
                No results match your search.
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="inline-block min-w-full align-middle">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-primary/5 hover:bg-primary/5 border-gray-200">
                        <TableHead className="font-semibold text-gray-700 min-w-[120px]">NAME</TableHead>
                        <TableHead className="font-semibold text-gray-700 min-w-[180px]">EMAIL</TableHead>
                        <TableHead className="font-semibold text-gray-700 min-w-[120px]">PHONE</TableHead>
                        <TableHead className="font-semibold text-gray-700 min-w-[100px]">GENDER</TableHead>
                        <TableHead className="font-semibold text-gray-700 min-w-[100px]">PLAN</TableHead>
                        <TableHead className="font-semibold text-gray-700 min-w-[120px]">ADDRESS</TableHead>
                        <TableHead className="font-semibold text-gray-700 min-w-[100px]">CITY</TableHead>
                        <TableHead className="font-semibold text-gray-700 min-w-[100px]">STATE</TableHead>
                        <TableHead className="font-semibold text-gray-700 min-w-[80px]">PINCODE</TableHead>
                        <TableHead className="font-semibold text-gray-700 min-w-[200px]">MESSAGE</TableHead>
                        <TableHead className="font-semibold text-gray-700 text-right min-w-[140px] whitespace-nowrap">DATE</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTests.map((row) => (
                        <TableRow key={row.id} className="border-gray-100 hover:bg-primary/5">
                          <TableCell className="font-medium text-gray-900 min-w-[120px] break-words">{row.full_name}</TableCell>
                          <TableCell className="text-gray-600 font-medium min-w-[180px] break-all">{row.email_address}</TableCell>
                          <TableCell className="text-gray-900 font-medium min-w-[120px] whitespace-nowrap">{row.phone_number}</TableCell>
                          <TableCell className="text-gray-600 font-medium min-w-[100px]">
                            {row.gender ? (
                              <span className="capitalize">{row.gender.replace(/-/g, ' ')}</span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </TableCell>
                          <TableCell className="min-w-[100px]">
                            {row.selected_plan ? (
                              <Badge className="font-medium bg-primary/10 text-primary border-0">
                                {row.selected_plan === 'one-time' ? 'Essential (₹999)' : row.selected_plan === '90-days' ? 'Signature (₹3,999)' : row.selected_plan}
                              </Badge>
                            ) : (
                              <span className="text-gray-500 font-medium">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-gray-600 font-medium min-w-[120px] break-words" title={row.address || ''}>
                            {row.address ? (
                              <span className="line-clamp-2">{row.address}</span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-gray-600 font-medium min-w-[100px]">{row.city || '—'}</TableCell>
                          <TableCell className="text-gray-600 font-medium min-w-[100px]">{row.state || '—'}</TableCell>
                          <TableCell className="text-gray-600 font-medium min-w-[80px]">{row.pincode || '—'}</TableCell>
                          <TableCell className="max-w-[200px] truncate text-gray-600 font-medium" title={row.message || ''}>
                            {row.message ? (
                              <span className="text-xs">{row.message}</span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right text-gray-500 text-xs whitespace-nowrap font-medium min-w-[140px]">
                            {format(new Date(row.created_at), 'MMM d, yyyy, h:mm a')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
