// src/pages/Products.jsx
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { Search } from 'lucide-react';

export default function Products() {
  const { products, categories } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState(1);

  const itemsPerPage = 10;
  const isMobile = window.innerWidth < 640;

  const getCategoryName = (catId) =>
    categories.find(c => c.id === catId)?.name || 'Bilinmiyor';

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [products, searchTerm]);

  const paginatedProducts = useMemo(() => {
    if (isMobile) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, isMobile]);

  const mobileProducts = useMemo(() => {
    if (!isMobile) return [];
    const totalToShow = loadedPages * itemsPerPage;
    return filteredProducts.slice(0, totalToShow);
  }, [filteredProducts, loadedPages, isMobile]);

  const handleScroll = useCallback(() => {
    if (!isMobile) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      if (loadedPages * itemsPerPage < filteredProducts.length) {
        setLoadedPages(prev => prev + 1);
      }
    }
  }, [isMobile, loadedPages, filteredProducts.length]);

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isMobile]);

  useEffect(() => {
    setCurrentPage(1);
    setLoadedPages(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tüm Ürünler</h1>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Ürün adı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-6 text-gray-500 text-sm">
          🔍 Ürün bulunamadı.
        </div>
      ) : (
        <>
          {!isMobile && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ürün</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alış Fiyatı</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedProducts.map(product => {
                    const isLowStock = product.stock < 10;
                    return (
                      <tr key={product.id} className={isLowStock ? 'bg-red-50' : 'hover:bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className={`font-medium ${isLowStock ? 'text-red-700' : 'text-gray-800'}`}>
                            {product.name}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {getCategoryName(product.categoryId)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                          ₺{product.purchasePrice.toFixed(2)}
                        </td>
                        <td className={`px-4 py-3 whitespace-nowrap font-bold ${
                          isLowStock ? 'text-red-700' : 'text-gray-800'
                        }`}>
                          {product.stock}
                          {isLowStock && ' ⚠️'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded text-sm ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {isMobile && (
            <div className="space-y-1">
              {mobileProducts.map(product => {
                const isLowStock = product.stock < 10;
                return (
                  <div
                    key={product.id}
                    className={`flex justify-between items-center py-2 px-2 rounded text-sm ${
                      isLowStock ? 'bg-red-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex-1">
                      <div className={`font-medium ${isLowStock ? 'text-red-700' : 'text-gray-800'}`}>
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-600 flex gap-2">
                        <span>{getCategoryName(product.categoryId)}</span>
                        <span className={isLowStock ? 'text-red-600' : 'text-blue-600'}>
                          ₺{product.purchasePrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className={`font-bold ${isLowStock ? 'text-red-700' : 'text-gray-800'}`}>
                      {product.stock}
                      {isLowStock && ' ⚠️'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}