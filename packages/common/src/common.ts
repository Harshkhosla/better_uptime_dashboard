export const getStoredToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Helper function to validate token (basic check)
export const isValidToken = (token: string | null): boolean => {
  if (!token) return false;
  try {
    // Basic JWT structure check (has 3 parts separated by dots)
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    // Check if token is expired (if it has exp claim)
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      // Token is expired, remove it
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      return false;
    }
    return true;
  } catch (error) {
    // Invalid token format, remove it
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    return false;
  }
};
