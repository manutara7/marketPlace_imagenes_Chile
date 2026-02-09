//frontend/src/api/apiFetch.js

import { ApiUrl } from "./config";

export const apiFetch = async (url, options = {}, logout) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${ApiUrl}${url}`, {
    ...options,
    headers: {
        "Content-Type": "application/json",
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",      
    },
  });

  if (res.status === 401) {
    console.warn("⚠️ Token vencido → logout automático");
    logout();    
    return null;
  }
  return res;
};
