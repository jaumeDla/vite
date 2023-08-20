import axios from "axios";

export default async function LoginUser(email: string, password: string) {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        } else {
            return null
        }
    }
}