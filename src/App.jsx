// src/App.jsx
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { useStore } from './store/useStore';
import ErrorBoundary from './components/ErrorBoundary';
import Notification from './components/Notification'; // 👈 BU SATIRI EKLE

// Lazy Load
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const AddProduct = lazy(() => import('./pages/AddProduct'));
const AddCategory = lazy(() => import('./pages/AddCategory'));
const LowStock = lazy(() => import('./pages/LowStock'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  const { isLoggedIn, setLoggedIn } = useStore();

  useEffect(() => {
    const saved = localStorage.getItem('isLoggedIn');
    if (saved === 'true') {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setLoggedIn(false);
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <ErrorBoundary>
      <Notification /> {/* 👈 BURAYA EKLE — EN ÜSTTE OLMALI */}
      <div className="min-h-screen bg-gray-50">
        {isLoggedIn ? (
          <>
            <Header onLogout={handleLogout} />
            <Suspense fallback={<LoadingSpinner />}>
              <div className="container mx-auto p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/add-category" element={<AddCategory />} />
                  <Route path="/low-stock" element={<LowStock />} />
                  <Route path="/login" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </Suspense>
          </>
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;