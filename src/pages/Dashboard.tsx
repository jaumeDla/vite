import { useUserContext } from '../context/UserContext';
import Cookies from 'js-cookie';

function Home() {
    const { user, setUser } = useUserContext();

    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        Cookies.remove("token");
        setUser(null)
    }

    return (
        <div>
            <h2>Bienvenido a tu página de inicio, {user?.email}!</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;