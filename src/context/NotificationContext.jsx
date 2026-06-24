import { createContext, useContext, useEffect } from "react";

import useNotifications from "../hooks/useNotifications";

import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const notificationState = useNotifications();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      notificationState.fetchNotifications();
    } else {
      notificationState.clearNotifications();
    }
  }, [user]);

  return (
    <NotificationContext.Provider value={notificationState}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => useContext(NotificationContext);
