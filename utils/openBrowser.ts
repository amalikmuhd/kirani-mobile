import { openBrowserAsync } from "expo-web-browser";

export const openUrl = async (url: string) => {
  return openBrowserAsync(url);
};
