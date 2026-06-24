import { useState } from "react";

import { getNotifications, markNotificationRead } from "../api/notificationApi";

function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // FETCH
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getNotifications();

      setNotifications(data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  // MARK READ
  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  // CLEAR
  const clearNotifications = () => {
    setNotifications([]);

    setError("");
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return {
    notifications,

    loading,

    error,

    unreadCount,

    fetchNotifications,

    handleMarkRead,

    clearNotifications,

    setNotifications,
  };
}

export default useNotifications;
