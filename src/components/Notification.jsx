// src/components/Notification.jsx
import { useStore } from '../store/useStore';

export default function Notification() {
  const { notification } = useStore();

  if (!notification) return null;

  return (
    <div
      className={`fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-medium shadow-lg z-50 ${
        notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } animate-fadeIn`}
      role="alert"
    >
      {notification.message}
    </div>
  );
}