import { useEffect, useState } from "react"
import { Navigate } from 'react-router-dom';
import CheckToken from "../services/CheckToken";
import { useUserContext } from '../context/UserContext';

export default function PrivateRoute({ element }: { element: React.ReactNode }) {
    const { user, setUser } = useUserContext();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        CheckToken()
            .then(data => setUser(data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [setUser])

    if (loading) return <div></div>

    return user === null ? <Navigate to="/" replace /> : element
}
