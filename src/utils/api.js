import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/customer` 
  : "http://127.0.0.1:8000/api/customer";

// Create Axios Instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor: Add Auth Token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("session_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("session_token");
        window.location.href = "/login";
      }
      return Promise.reject(new Error("Unauthorized: Please login again."));
    }

    // Handle Network Errors
    if (!error.response) {
      return Promise.reject(new Error("Network error: Please check your connection."));
    }

    // Default Error Message from Backend
    const message = error.response.data?.message || error.response.data?.error || "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

/**
 * Robust API Request Helper (Legacy wrapper for compatibility)
 */
export const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    const config = {
      method: method.toUpperCase(),
      url: endpoint,
      ...(body && { data: body }),
    };
    
    return await apiClient(config);
  } catch (error) {
    // For legacy compatibility, we might need to return specific format or just rethrow
    // React Query prefers rethrowing
    throw error;
  }
};

export default apiClient;
