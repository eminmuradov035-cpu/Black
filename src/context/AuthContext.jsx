import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api, authApi, getTokens, refreshTokens, setTokens } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    const { data } = await api.get("/auth/me");
    setUser(data ?? null);
    return data;
  }, []);

  const login = useCallback(
    async ({ username, password }) => {
      const { data } = await authApi.post("/auth/login", {
        username,
        password,
        expiresInMins: 30,
      });
      setTokens({
        accessToken: data?.accessToken,
        refreshToken: data?.refreshToken,
      });
      return fetchMe();
    },
    [fetchMe]
  );

  const register = useCallback(
    async ({ firstName, lastName, username, password }) => {
      const payload = { firstName, lastName, username, password };
      return authApi.post("/users/add", payload);
    },
    []
  );

  const logout = useCallback(() => {
    setTokens(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const bootstrap = async () => {
      setIsLoading(true);
      try {
        if (!getTokens()?.accessToken) {
          if (!cancelled) setUser(null);
          return;
        }
        await fetchMe();
      } catch {
        try {
          await refreshTokens();
          await fetchMe();
        } catch {
          if (!cancelled) logout();
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [fetchMe, logout]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user?.id),
      login,
      register,
      logout,
      refreshSession: refreshTokens,
    }),
    [user, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components -- colocated with provider
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
