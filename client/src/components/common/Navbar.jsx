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
  Moon,
  Sun,
  Bell,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import api from '../../services/api';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout, loginAsDemo } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close menus on click outside
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

  // Fetch notifications if logged in
  useEffect(() => {
    if (isAuthenticated) {
      api.get('/notifications')
        .then((res) => {
          if (res.data.success) {
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
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Compare', path: '/compare', icon: GitCompare },
    { name: 'AI Chat', path: '/chat', icon: MessageSquareText },
    { name: 'Timeline', path: '/timeline', icon: CalendarClock },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin', icon: ShieldCheck, badge: 'Staff' });
  }

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 bg-[#07090E]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white shadow-glow-brand group-hover:scale-105 transition-all">
                <Scale className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5 font-heading">
                  LegalEase <span className="gradient-text font-black">AI</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-400/80 -mt-1 font-mono">
                  Document Intelligence
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          {isAuthenticated ? (
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      active
                        ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon className="w-4 h-4 opacity-80" />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          ) : (
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/#sandbox" className="text-xs font-semibold text-slate-300 hover:text-indigo-400 transition-colors">
                Interactive Lab
              </a>
              <a href="/#features" className="text-xs font-semibold text-slate-300 hover:text-indigo-400 transition-colors">
                Features
              </a>
              <a href="/#faq" className="text-xs font-semibold text-slate-300 hover:text-indigo-400 transition-colors">
                FAQ
              </a>
            </nav>
          )}

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2.5">
            {isAuthenticated ? (
              <>
                {/* Notification Dropdown */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 relative transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-card bg-obsidian-900/95 rounded-2xl shadow-2xl border border-white/10 py-3 z-50">
                      <div className="px-4 pb-2 border-b border-white/10 flex items-center justify-between">
                        <span className="font-semibold text-xs text-white">Notifications</span>
                        <span className="text-[10px] text-indigo-400 font-mono">{unreadCount} unread</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-xs text-slate-400 font-mono">No new notifications</div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n._id}
                              onClick={() => markNotifRead(n._id)}
                              className={`p-3 text-xs cursor-pointer hover:bg-white/5 transition-colors ${
                                !n.read ? 'bg-indigo-500/10' : ''
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-slate-200">{n.title}</span>
                                {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                              </div>
                              <p className="text-slate-400 text-[11px] mt-0.5">{n.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={user?.name || 'User'}
                      className="w-7 h-7 rounded-lg object-cover ring-1 ring-indigo-500/50"
                    />
                    <div className="hidden lg:flex flex-col text-left">
                      <span className="text-xs font-semibold text-white leading-none">
                        {user?.name || 'User'}
                      </span>
                      <span className="text-[10px] text-indigo-300 font-mono capitalize mt-0.5">
                        {user?.role} Tier
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-64 glass-card bg-obsidian-900/95 rounded-2xl shadow-2xl border border-white/10 p-2 z-50">
                      <div className="p-3 border-b border-white/10">
                        <p className="font-semibold text-sm text-white">{user?.name}</p>
                        <p className="text-xs text-slate-400 truncate font-mono">{user?.email}</p>
                        <div className="mt-2 flex items-center gap-1.5 font-mono">
                          <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-indigo-500/20 text-indigo-300 uppercase border border-indigo-500/30">
                            {user?.role}
                          </span>
                          <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-300 uppercase border border-emerald-500/30">
                            100% Free Plan
                          </span>
                        </div>
                      </div>

                      {/* Demo Role Switchers */}
                      <div className="py-2 border-b border-white/10 font-mono text-xs">
                        <span className="px-3 text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Switch Role View:
                        </span>
                        <button
                          onClick={() => { loginAsDemo('user'); setProfileOpen(false); }}
                          className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-white/5 rounded-lg flex items-center gap-2"
                        >
                          <User className="w-3.5 h-3.5 text-slate-400" /> Standard User
                        </button>
                        <button
                          onClick={() => { loginAsDemo('premium'); setProfileOpen(false); }}
                          className="w-full text-left px-3 py-1.5 text-amber-400 hover:bg-white/5 rounded-lg flex items-center gap-2"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Legal Counsel View
                        </button>
                        <button
                          onClick={() => { loginAsDemo('admin'); setProfileOpen(false); }}
                          className="w-full text-left px-3 py-1.5 text-purple-400 hover:bg-white/5 rounded-lg flex items-center gap-2"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" /> Admin Console
                        </button>
                      </div>

                      <button
                        onClick={() => { logout(); setProfileOpen(false); navigate('/login'); }}
                        className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-2 transition-colors mt-1 font-mono"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-bold rounded-xl gradient-bg text-white shadow-glow-brand transition-all hover:scale-[1.02] flex items-center gap-1.5"
                >
                  <span>Start Free</span>
                  <Sparkles className="w-3 h-3" />
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:bg-white/5 border border-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-3">
            {isAuthenticated ? (
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        active
                          ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl gradient-bg text-white text-xs font-bold shadow-glow-brand"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
