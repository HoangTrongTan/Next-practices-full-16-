import axios from "axios";
import {
  getAccessTokenWithCoord,
  listenTokenUpdate,
} from "./refreshCoordinator";

let accessToken: string | null = null;

const api = axios.create({ baseURL: "http://localhost:4000/api" });

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(undefined, async (error) => {
  const original = error.config;
  if (error.response?.status !== 401 || original.__retry) throw error; //original.__retry tự định để logic
  original.__retry = true;

  try {
    // gọi refresh qua coordinator
    const newToken = await getAccessTokenWithCoord(refreshToken);
    accessToken = newToken;

    original.headers.Authorization = `Bearer ${newToken}`;

    return api(original);
  } finally {
    localStorage.setItem("isRefreshing", "false");
  }
});

async function refreshToken(): Promise<string> {
  const res = await axios.post("/auth/refresh");
  return res.data.accessToken;
}

export default api;
