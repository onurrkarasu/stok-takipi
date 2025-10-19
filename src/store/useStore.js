// src/store/useStore.js
import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // 🔐 Auth State
  isLoggedIn: false,

  // 📦 Data State
  products: [
    { id: 1, name: "Süt", categoryId: 1, stock: 3, purchasePrice: 12.5 },
    { id: 2, name: "Ekmek", categoryId: 2, stock: 15, purchasePrice: 3.0 },
  ],
  categories: [
    { id: 1, name: "Süt Ürünleri" },
    { id: 2, name: "Fırın Ürünleri" },
  ],

  // 📢 Notification State
  notification: null, // { type: 'success' | 'error', message: string }

  // 📢 Bildirim Göster
  setNotification: (notification) => {
    set({ notification });
    // 3 saniye sonra temizle
    setTimeout(() => set({ notification: null }), 3000);
  },

  // 🔐 Login/Logout
  setLoggedIn: (status) => set({ isLoggedIn: status }),

  // ➕ Ürün Ekle
  addProduct: (product) => {
    const { products, setNotification } = get();
    const exists = products.some(p => p.name.toLowerCase() === product.name.toLowerCase());
    if (exists) {
      setNotification({ type: 'error', message: 'Bu ürün zaten mevcut!' });
      return;
    }
    setNotification({ type: 'success', message: 'Ürün başarıyla eklendi!' });
    set({ products: [...products, { ...product, id: Date.now() }] });
  },

  // ➕ Kategori Ekle
  addCategory: (category) => {
    const { categories, setNotification } = get();
    const exists = categories.some(c => c.name.toLowerCase() === category.name.toLowerCase());
    if (exists) {
      setNotification({ type: 'error', message: 'Bu kategori zaten mevcut!' });
      return;
    }
    setNotification({ type: 'success', message: 'Kategori başarıyla eklendi!' });
    set({ categories: [...categories, { ...category, id: Date.now() }] });
  },

  // 📦 Stok Güncelle
  updateStock: (id, newStock) => {
    const { products } = get();
    set({
      products: products.map((p) =>
        p.id === id ? { ...p, stock: newStock } : p
      ),
    });
  },

  // 🗑️ Ürün Sil (isteğe bağlı)
  removeProduct: (id) => {
    const { products, setNotification } = get();
    set({ products: products.filter(p => p.id !== id) });
    setNotification({ type: 'success', message: 'Ürün silindi!' });
  },
}));