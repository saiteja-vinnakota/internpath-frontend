import { useEffect } from "react";

import { showToast } from "../utils/toastService";

import { socket } from "../config/socket";

import { useAuth } from "../context/AuthContext";

import { useNotificationContext } from "../context/NotificationContext";

function useSocket() {
  const { user } = useAuth();

  const { setNotifications } = useNotificationContext();

  useEffect(() => {
    if (!user?._id) {
      return;
    }

    socket.connect();

    socket.emit("join", user._id);

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED");
    });

    socket.on("disconnect", () => {
      console.log("SOCKET DISCONNECTED");
    });

    socket.on("connect_error", (err) => {
      console.log("SOCKET ERROR:", err);
    });
    socket.on(
      "new_notification",

      (notification) => {
        setNotifications((prev) => [notification, ...prev]);

        showToast.success(notification.message);
      },
    );

    return () => {
      socket.off("new_notification");

      socket.disconnect();
    };
  }, [user?._id, setNotifications]);
}

export default useSocket;
