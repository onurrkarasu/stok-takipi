// src/components/ProductCard.jsx
import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function ProductCard({ product, categoryName, onUpdateStock }) {
  const [stock, setStock] = useState(product.stock);

  const handleUpdate = () => {
    onUpdateStock(product.id, Number(stock));
  };

  const isLowStock = product.stock < 10;

  return (
    <div className={`p-4 rounded-lg border transition-all duration-200 ${
      isLowStock ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={`font-bold text-lg ${isLowStock ? 'text-red-700' : 'text-gray-800'}`}>
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Kategori: {categoryName}</p>
          <p className="text-sm text-blue-600 mt-1">Alış Fiyatı: ₺{product.purchasePrice.toFixed(2)}</p>
        </div>
        <div className="flex gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            <Edit size={18} />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          className={`border p-2 rounded w-20 ${isLowStock ? 'border-red-400' : 'border-gray-300'}`}
        />
        <button
          onClick={handleUpdate}
          className={`px-3 py-1 rounded text-white text-sm ${
            isLowStock ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Güncelle
        </button>
      </div>

      <div className={`mt-2 text-sm font-medium ${isLowStock ? 'text-red-600' : 'text-gray-700'}`}>
        Stok: {product.stock} {isLowStock && '⚠️'}
      </div>
    </div>
  );
}