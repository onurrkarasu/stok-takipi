// src/pages/Login.jsx
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Login() {
  const navigate = useNavigate();
  const { setLoggedIn } = useStore();

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <LogIn size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Stok Takip Sistemi</h1>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 text-lg"
        >
          <LogIn size={20} />
          Giriş Yap ve Başla
        </button>

        <p className="mt-6 text-sm text-gray-500">
          © 2025 Market Stok Takip
        </p>
      </div>
    </div>
  );
}