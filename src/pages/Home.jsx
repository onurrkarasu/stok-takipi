// src/pages/Home.jsx
import { Link } from 'react-router-dom'; // 👈 BU EKLENDİ
import { useStore } from '../store/useStore'; // 👈 named import
import { useMemo } from 'react';
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';

export default function Home() {
  const { products, categories } = useStore();

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const lowStockCount = products.filter(p => p.stock < 10).length;

    const categoryStats = categories.map(cat => {
      const catProducts = products.filter(p => p.categoryId === cat.id);
      const catStock = catProducts.reduce((sum, p) => sum + p.stock, 0);
      const lowInCat = catProducts.filter(p => p.stock < 10).length;

      return {
        id: cat.id,
        name: cat.name,
        productCount: catProducts.length,
        totalStock: catStock,
        lowStock: lowInCat
      };
    });

    return { totalProducts, totalStock, lowStockCount, categoryStats };
  }, [products, categories]);

  return (
    <div className="container mx-auto p-4">
      {/* Başlık */}
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp size={32} className="text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Stok Takip Paneli</h1>
      </div>

      {/* Ana Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/products" className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition">
          <Package size={40} className="mx-auto text-blue-600 mb-2" />
          <h3 className="text-xl font-semibold">Toplam Ürün</h3>
          <p className="text-3xl font-bold text-blue-700">{stats.totalProducts}</p>
        </Link>

        <Link to="/products" className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition">
          <ShoppingCart size={40} className="mx-auto text-green-600 mb-2" />
          <h3 className="text-xl font-semibold">Toplam Stok</h3>
          <p className="text-3xl font-bold text-green-700">{stats.totalStock}</p>
        </Link>

        <Link to="/low-stock" className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition">
          <AlertTriangle size={40} className="mx-auto text-yellow-600 mb-2" />
          <h3 className="text-xl font-semibold">Düşük Stok</h3>
          <p className="text-3xl font-bold text-red-700">{stats.lowStockCount}</p>
        </Link>
      </div>

      {/* Kategorilere Göre Durum */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-xl font-bold mb-4 text-gray-800">📈 Kategorilere Göre Durum</h2>
        <div className="space-y-3">
          {stats.categoryStats.map(cat => (
            <div key={cat.id} className="flex justify-between items-center p-3 border-b border-gray-100">
              <span className="font-medium">{cat.name}</span>
              <div className="flex gap-4 text-sm">
                <span className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                  <Package size={16} /> {cat.productCount}
                </span>
                <span className="bg-green-100 px-2 py-1 rounded flex items-center gap-1">
                  <ShoppingCart size={16} /> {cat.totalStock}
                </span>
                {cat.lowStock > 0 && (
                  <span className="bg-red-100 px-2 py-1 rounded text-red-700 font-bold flex items-center gap-1">
                    <AlertTriangle size={16} /> {cat.lowStock}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}