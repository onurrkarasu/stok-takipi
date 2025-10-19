// src/pages/LowStock.jsx
import { useStore } from '../store/useStore';
import { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function LowStock() {
  const { products, categories } = useStore();

  const lowStockProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => p.stock < 10);
  }, [products]);

  const getCategoryName = (catId) =>
    categories.find(c => c.id === catId)?.name || 'Bilinmiyor';

  return (
    <div className="container mx-auto p-4">
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle size={24} className="text-yellow-600" />
          <h1 className="text-2xl font-bold text-yellow-800">⚠️ Düşük Stoğa Sahip Ürünler</h1>
        </div>
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-xl">🎉 Tüm ürünler yeterli stokta!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lowStockProducts.map(p => (
            <div key={p.id} className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-bold text-red-800">{p.name}</h3>
              <p className="text-sm text-gray-600">Kategori: {getCategoryName(p.categoryId)}</p>
              <p className="text-sm text-blue-600">Alış: ₺{p.purchasePrice.toFixed(2)}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-bold">
                  Stok: {p.stock} ⚠️
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}