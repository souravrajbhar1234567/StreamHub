
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getMe,
  logoutUser,
} from "../services/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const response = await getMe();

      setUser(
        response.data.user ||
        response.data.data ||
        response.data
      );
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("streamhub_token");

    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (formData) => {
    const response = await loginUser(formData);

    const data = response.data;

    if (data.requiresOtp) {
      return data;
    }

    const token =
      data.token ||
      data.accessToken ||
      data.data?.token;

    if (token) {
      localStorage.setItem("streamhub_token", token);
    }

    if (data.user?.theme) {
      localStorage.setItem("streamhub_theme", data.user.theme);
      document.documentElement.setAttribute("data-theme", data.user.theme);
      if (data.user.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    setUser(
      data.user ||
      data.data?.user ||
      null
    );

    return data;
  };

  const register = async (formData) => {
    const response = await registerUser(formData);

    const data = response.data;

    const token =
      data.token ||
      data.accessToken ||
      data.data?.token;

    if (token) {
      localStorage.setItem("streamhub_token", token);
    }

    setUser(
      data.user ||
      data.data?.user ||
      null
    );

    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Logout locally even if API fails.
    }

    localStorage.removeItem("streamhub_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

