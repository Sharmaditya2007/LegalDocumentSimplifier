import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Scale,
  LayoutDashboard,
  FileText,
  GitCompare,
  MessageSquareText,
  CalendarClock,
  ShieldCheck,
  Bell,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Zap,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout, loginAsDemo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (isAuthenticated) {
      api.get('/notifications')
        .then((res) => {
          if (res.data?.success) {
            setNotifications(res.data.notifications || []);
            setUnreadCount(res.data.unreadCount || 0);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated, location.pathname]);

  const markNotifRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (e) {}
  };

  const navLinks = [
    { name: 'Universe', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Contracts', path: '/documents', icon: FileText },
    { name: 'Diff Engine', path: '/compare', icon: GitCompare },
    { name: 'Copilot', path: '/chat', icon: MessageSquareText },
    { name: 'Timeline', path: '/timeline', icon: CalendarClock },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Control', path: '/admin', icon: ShieldCheck, badge: 'Staff' });
  }

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo with 3D Laser Flare */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-obsidian-900 border border-amberAccent-500/40 flex items-center justify-center text-amberAccent-500 shadow-[0_0_20px_rgba(235,184,126,0.3)] group-hover:scale-105 group-hover:border-amberAccent-500 transition-all duration-300">
            <Scale className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-wider uppercase text-white font-heading flex items-center gap-1.5">
              LEGALEASE <span className="text-amberAccent-500 font-black">AI</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-mono -mt-0.5">
              Neural Legal Studio
            </span>
          </div>
        </Link>

        {/* Floating Center Pill Navigation (Linear / Behfar SceneNav style) */}
        {isAuthenticated ? (
          <nav className="hidden md:flex items-center p-1.5 rounded-full behfar-nav-pill border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                    active
                      ? 'text-amberAccent-400 font-bold behfar-nav-item-active'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-amberAccent-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[8px] font-mono uppercase rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        ) : null}

        {/* Right Section / Controls */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Notification Bell */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="w-9 h-9 rounded-full bg-obsidian-900 border border-white/10 hover:border-amberAccent-500/40 text-slate-400 hover:text-white flex items-center justify-center transition-all relative shadow-sm hover:shadow-[0_0_15px_rgba(235,184,126,0.2)]"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amberAccent-500 shadow-[0_0_8px_rgba(235,184,126,0.9)] animate-pulse" />
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 glass-panel bg-obsidian-950/95 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/15 py-3 z-50 page-fade-in">
                    <div className="px-4 pb-2.5 border-b border-white/10 flex items-center justify-between">
                      <span className="font-bold text-xs text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amberAccent-400" />
                        Telemetry Alerts
                      </span>
                      <span className="text-[10px] text-amberAccent-400 font-mono font-bold px-2 py-0.5 rounded-full bg-amberAccent-500/10 border border-amberAccent-500/20">
                        {unreadCount} unread
                      </span>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                      {notifications.length === 0 ? (
                        <div className="p-5 text-center text-xs text-slate-400 font-mono">No new alerts</div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n._id}
                            onClick={() => markNotifRead(n._id)}
                            className={`p-3 text-xs cursor-pointer hover:bg-white/5 transition-colors ${
                              !n.read ? 'bg-amberAccent-500/10' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-200">{n.title}</span>
                              {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-amberAccent-500" />}
                            </div>
                            <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full border border-white/10 bg-obsidian-900 hover:border-amberAccent-500/40 transition-all shadow-sm hover:shadow-[0_0_15px_rgba(235,184,126,0.15)]"
                >
                  <div className="w-7 h-7 rounded-full bg-amberAccent-500/20 text-amberAccent-400 border border-amberAccent-500/40 flex items-center justify-center text-xs font-bold font-mono shadow-inner">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-200">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-60 glass-panel bg-obsidian-950/95 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/15 py-2.5 z-50 page-fade-in">
                    <div className="px-4 py-2.5 border-b border-white/10">
                      <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                      <p className="text-[10px] text-slate-400 truncate font-mono mt-0.5">{user?.email}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          100% Free Plan
                        </span>
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-white/5 text-slate-300 border border-white/10">
                          {user?.role || 'user'}
                        </span>
                      </div>
                    </div>

                    <div className="py-1.5">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-amberAccent-500" />
                        <span>My Universe</span>
                      </Link>
                      <Link
                        to="/documents"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Contract Library</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-purple-300 hover:bg-purple-500/10 transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                          <span>Staff Console</span>
                        </Link>
                      )}
                    </div>

                    <div className="pt-1.5 border-t border-white/10">
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          logout();
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 text-left transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-full btn-glow-gold text-obsidian-950 font-bold text-xs shadow-glow-amber transition-all hover:scale-105"
              >
                Launch Free
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white border border-white/10 bg-obsidian-900"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 rounded-2xl glass-panel bg-obsidian-950 border border-white/10 page-fade-in">
          <div className="flex flex-col space-y-1">
            {isAuthenticated ? (
              navLinks.map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all ${
                      active ? 'bg-amberAccent-500/15 text-amberAccent-400 border border-amberAccent-500/30' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 text-[8px] font-mono uppercase rounded bg-purple-500/20 text-purple-300">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })
            ) : (
              <div className="flex flex-col gap-2.5 p-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 text-center rounded-xl text-xs font-semibold text-slate-300 bg-obsidian-900 border border-white/10"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 text-center rounded-xl text-xs font-bold btn-glow-gold text-obsidian-950"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
