import { getDataFromCookie } from "@token-service";
export const isAuthenticated = (): boolean => {
  return !!getDataFromCookie("access_token");
};
