import { AxiosError } from "axios";

export default (e: Error | AxiosError): string => {
  if (e.message) return e.message;
  const error = e as AxiosError;
  if (error.isAxiosError) return error.response?.data.message;
  return "Invalid login credentials";
};
