import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Cinematic3DWorld from './components/3d/Cinematic3DWorld';
import CinematicCursor from './components/3d/CinematicCursor';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import DocumentLibraryPage from './pages/DocumentLibraryPage';
import DocumentDetailPage from './pages/DocumentDetailPage';
import ContractComparisonPage from './pages/ContractComparisonPage';
import DocumentChatPage from './pages/DocumentChatPage';
import TimelinePage from './pages/TimelinePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-amberAccent-500/20 border-t-amberAccent-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#030508] text-slate-100 font-sans selection:bg-amberAccent-500/30 selection:text-amberAccent-300 relative overflow-x-hidden">
              {/* 2035 Immersive Cinematic 3D WebGL World */}
              <Cinematic3DWorld />

              {/* 2035 Cyber Reticle Cursor */}
              <CinematicCursor />

              {/* Global Cosmic Ambient Glows */}
              <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full z-0" />
              <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[160px] pointer-events-none rounded-full z-0" />
              <div className="fixed top-1/3 left-0 w-96 h-96 bg-amberAccent-500/5 blur-[140px] pointer-events-none rounded-full z-0" />

              <div className="relative z-10 flex flex-col flex-1">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    {/* Public Pages */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Protected SaaS App Pages */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <DashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/documents"
                      element={
                        <ProtectedRoute>
                          <DocumentLibraryPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/documents/:id"
                      element={
                        <ProtectedRoute>
                          <DocumentDetailPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/compare"
                      element={
                        <ProtectedRoute>
                          <ContractComparisonPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/chat"
                      element={
                        <ProtectedRoute>
                          <DocumentChatPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/timeline"
                      element={
                        <ProtectedRoute>
                          <TimelinePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AdminDashboardPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
