// src/components/Header.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, PlusCircle, AlertTriangle, LogOut, Menu, X, ArrowLeft } from 'lucide-react';

export default function Header({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname !== '/') {
      navigate(-1); // Önceki sayfaya git
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Mobile: Geri Tuşu + Logo */}
        <div className="sm:hidden flex items-center gap-2">
          {location.pathname !== '/' && (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-blue-500 rounded-full transition"
              aria-label="Geri Dön"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <Link to="/" className="flex items-center gap-1 font-bold text-lg">
            <Home size={24} /> Stok Takip
          </Link>
        </div>

        {/* Desktop: Logo + Navigasyon */}
        <div className="hidden sm:flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1 font-bold">
            <Home size={24} /> Stok Takip
          </Link>
        </div>

        {/* Desktop: Navigasyon */}
        <div className="hidden sm:flex items-center gap-4">
          <Link to="/products" className="flex items-center gap-1 hover:opacity-80">Ürünler</Link>
          <Link to="/add-product" className="flex items-center gap-1 hover:opacity-80">Ürün Ekle</Link>
          <Link to="/add-category" className="flex items-center gap-1 hover:opacity-80">Kategori</Link>
          <Link to="/low-stock" className="flex items-center gap-1 hover:opacity-80">Düşük Stok</Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-1 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            <LogOut size={16} /> Çıkış
          </button>
        </div>

        {/* Mobile: Hamburger Menü Butonu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden p-2 hover:bg-blue-500 rounded-full transition"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-blue-800 py-4 px-4 space-y-3 border-t border-blue-700 animate-fadeIn">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block p-2 hover:bg-blue-700 rounded">Ana Sayfa</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block p-2 hover:bg-blue-700 rounded">Ürünler</Link>
          <Link to="/add-product" onClick={() => setIsMenuOpen(false)} className="block p-2 hover:bg-blue-700 rounded">Ürün Ekle</Link>
          <Link to="/add-category" onClick={() => setIsMenuOpen(false)} className="block p-2 hover:bg-blue-700 rounded">Kategori Ekle</Link>
          <Link to="/low-stock" onClick={() => setIsMenuOpen(false)} className="block p-2 hover:bg-blue-700 rounded">Düşük Stok</Link>
          <button
            onClick={() => { onLogout(); setIsMenuOpen(false); }}
            className="w-full p-2 bg-red-600 rounded hover:bg-red-700"
          >
            Çıkış Yap
          </button>
        </div>
      )}
    </header>
  );
}