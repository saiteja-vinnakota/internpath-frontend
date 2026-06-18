import api from "./index";

// GET NOTIFICATIONS
export const getNotifications =
  async () => {

    const response =
      await api.get(
        "/notifications"
      );

    return response.data;
  };

// MARK AS READ
export const markNotificationRead =
  async (id) => {

    const response =
      await api.put(
        `/notifications/${id}/read`
      );

    return response.data;
  };