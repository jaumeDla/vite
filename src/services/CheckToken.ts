import axios from "axios";
import Cookies from "js-cookie";

export default async function CheckToken() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}/auth/check-token`, { token });
  return response.data;
}
