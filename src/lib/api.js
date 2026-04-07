import axios from "axios";

const TOKEN_STORAGE_KEY = "black-auth-tokens";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

const authApi = axios.create({
  baseURL: "https://dummyjson.com",
});

const readTokens = () => {
  try {
    const raw = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.accessToken || !parsed?.refreshToken) return null;
    return parsed;
  } catch {
    return null;
  }
};

let tokens = readTokens();
let refreshJob = null;

const setTokens = (nextTokens) => {
  tokens = nextTokens;
  if (!nextTokens) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    return;
  }
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(nextTokens));
};

const getTokens = () => tokens;

const refreshTokens = async () => {
  if (!tokens?.refreshToken) throw new Error("No refresh token");
  if (!refreshJob) {
    refreshJob = authApi
      .post("/auth/refresh", { refreshToken: tokens.refreshToken })
      .then(({ data }) => {
        const next = {
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken ?? tokens.refreshToken,
        };
        if (!next.accessToken || !next.refreshToken) {
          throw new Error("Refresh response missing token fields");
        }
        setTokens(next);
        return next;
      })
      .finally(() => {
        refreshJob = null;
      });
  }
  return refreshJob;
};

api.interceptors.request.use((config) => {
  if (tokens?.accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error?.config;
    const status = error?.response?.status;
    if (status !== 401 || !original || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;
    try {
      const next = await refreshTokens();
      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${next.accessToken}`;
      return api(original);
    } catch (refreshError) {
      setTokens(null);
      return Promise.reject(refreshError);
    }
  }
);

export { api, authApi, getTokens, setTokens, refreshTokens };
