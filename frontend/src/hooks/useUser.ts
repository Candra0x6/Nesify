"use client";

import Cookies from "js-cookie";

interface User {
  id: string | null;
  role: string | null;
}

interface UseUserReturn {
  user: User;
  isAuthenticated: boolean;
  login: (id: string, role: string) => void;
  logout: () => void;
}

// Cookie options
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

export const useUser = (): UseUserReturn => {
  // Get user data synchronously from cookies
  const getUserFromCookies = (): User => {
    // Only access cookies on the client side
    if (typeof window === "undefined") {
      return { id: null, role: null };
    }

    // Use client_ prefixed cookies which are not HTTP-only
    const id = Cookies.get("client_user_id") || null;
    console.log(id);
    const role = Cookies.get("client_user_role") || null;
    return { id, role };
  };

  // Get initial data immediately (no useState or useEffect needed)
  const user = getUserFromCookies();
  const isAuthenticated = !!user.id;

  // Set user data in cookies
  const login = (id: string, role: string) => {
    Cookies.set("client_user_id", id, COOKIE_OPTIONS);
    Cookies.set("client_user_role", role, COOKIE_OPTIONS);

    // If you need to refresh the page or trigger a re-render:
    // window.location.reload();
  };

  // Remove user data from cookies
  const logout = () => {
    Cookies.remove("client_user_id", { path: "/" });
    Cookies.remove("client_user_role", { path: "/" });

    // If you need to refresh the page or trigger a re-render:
    // window.location.reload();
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};
