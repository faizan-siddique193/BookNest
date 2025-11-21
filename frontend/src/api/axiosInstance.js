import axios from "axios";
import { auth } from "../config/firebase";
import { getIdToken } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get current user token
const getToken = async () => {
  return new Promise((resolve, reject) => {
    // Check if user is already loaded
    if (auth.currentUser) {
      getIdToken(auth.currentUser)
        .then((token) => resolve(token))
        .catch((error) => reject(error));
      return;
    }

    // Wait for auth state to initialize
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe();

      if (user) {
        try {
          const token = await getIdToken(user, /* forceRefresh */ true);
          resolve(token);
        } catch (error) {
          console.error("Error getting ID token:", error);
          reject(error);
        }
      } else {
        // User not logged in - this is OK for public endpoints
        resolve(null);
      }
    });

    // Timeout after 5 seconds
    setTimeout(() => {
      unsubscribe();
      reject(new Error("Auth state timeout"));
    }, 5000);
  });
};

// Request interceptor - attach token to requests
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      console.log("Request interceptor triggered for:", config.url);

      // Skip token for public endpoints (optional)
      const publicEndpoints = ["/auth/login", "/auth/register", "/books"];
      const isPublicEndpoint = publicEndpoints.some((endpoint) =>
        config.url?.includes(endpoint)
      );

      if (isPublicEndpoint) {
        console.log("Public endpoint, skipping token");
        return config;
      }

      // Get token
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(
          "Token attached to request:",
          token.substring(0, 20) + "..."
        );
      } else {
        console.warn(" No token available - user might not be logged in");
      }

      return config;
    } catch (error) {
      console.error("Request interceptor error:", error);

      // Decide whether to proceed without token or reject
      // For protected routes, you might want to reject here
      if (config.url?.includes("/cart") || config.url?.includes("/order")) {
        return Promise.reject({
          message: "Authentication required",
          error,
        });
      }

      // For other routes, proceed without token
      return config;
    }
  },
  (error) => {
    console.error(" Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    // Successfully received response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.error("Response error:", error.response?.status, error.message);

    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("🔄 Token might be expired, refreshing...");

        // Force refresh the token
        const user = auth.currentUser;
        if (user) {
          const newToken = await getIdToken(user, /* forceRefresh */ true);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          console.log("Token refreshed, retrying request");
          return axiosInstance(originalRequest);
        } else {
          console.error(" No user found, redirecting to login");
          // Redirect to login page
          window.location.href = "/login";
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Access forbidden - insufficient permissions");
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
