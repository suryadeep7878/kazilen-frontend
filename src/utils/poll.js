import { apiRequest } from "./api";
export const startPolling = (apiRequest, interval = 10000) => {
  apiRequest();

  const intervalId = setInterval(async () => {
    try {
      await apiRequest();
    } catch (error) {
      console.error("Polling Error:", error);
    }
  }, interval);

  return () => clearInterval(intervalId);
};
