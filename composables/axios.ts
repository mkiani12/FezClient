import axios from "axios";
const token = useCookie("auth:token");

const nuxtApp = useNuxtApp();

export const useApi = () => {
  const baseURL = nuxtApp.$config.public.auth.baseURL;

  const instance = axios.create({
    baseURL,
    headers: {
      common: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.value,
      },
    },
  });

  return instance;
};
