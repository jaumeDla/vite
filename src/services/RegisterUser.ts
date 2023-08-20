import axios from "axios";

export default async function RegisterUser(username: string, email: string, password: string) {
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.post(`${BASE_URL}/auth/register`, { username, email, password });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data;
        } else {
            return null
        }
    }
}
