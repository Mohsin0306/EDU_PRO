import React, { createContext, useContext, useState } from 'react';
import Toast, { ToastType } from '../components/Toast';

interface NotificationContextType {
  showNotification: (message: string, type: ToastType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as ToastType,
    isVisible: false,
  });

  const showNotification = (message: string, type: ToastType) => {
    setToast({
      message,
      type,
      isVisible: true,
    });
  };

  const hideNotification = () => {
    setToast(prev => ({
      ...prev,
      isVisible: false,
    }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
