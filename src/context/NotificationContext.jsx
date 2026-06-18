import {

  createContext,

  useContext,

  useEffect,

} from "react";

import useNotifications
from "../hooks/useNotifications";

const NotificationContext =
  createContext();

export function NotificationProvider({

  children,

}) {

  const notificationState =
    useNotifications();

  useEffect(() => {

    notificationState
      .fetchNotifications();

  }, []);

  return (

    <NotificationContext.Provider
      value={
        notificationState
      }
    >

      {children}

    </NotificationContext.Provider>
  );
}

export const useNotificationContext =
  () =>
    useContext(
      NotificationContext
    );