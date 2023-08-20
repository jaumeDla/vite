import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";

import { useUserContext } from '../context/UserContext';
import LoginUser from '../services/LoginUser';

import styles from "../styles/Auth.module.css";
import back from "../assets/back-arrow.svg"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [state, setState] = useState<boolean>(true);

    const { setUser } = useUserContext();

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        const isEmailValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

        setEmail(email);
        setEmailError(isEmailValid ? '' : 'This email is not valid');
        setState(!isEmailValid || !password);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;

        setPassword(password);
        setPasswordError(password ? '' : 'Password is obligatory');
        setState(!email || !password);
    };


    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        LoginUser(email, password)
            .then(token => { Cookies.set("token", token); setUser(token) })
            .catch(message => setErrorMsg(message))
    };

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <div className={styles.arrow}>
                    <Link to="/"><img src={back} alt="back" /></Link>
                </div>
                <div className={styles.title}>
                    <h2 >Welcome back!</h2>
                </div>
                <form className={styles.form} onSubmit={handleLogin}>
                    <input type="email" placeholder='Email' value={email} onChange={handleEmail} />
                    {emailError && <p className={styles.errorMsg}>{emailError}</p>}
                    <input type="password" placeholder='Password' value={password} onChange={handlePassword} />
                    {passwordError && <p className={styles.errorMsg}>{passwordError}</p>}
                    <button disabled={state} type='submit'>Log in</button>
                    {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                </form>
                <div className={styles.changer}>
                    <p >Don't have an account yet? <Link to="/auth/register">Register</Link></p>
                </div>
            </div>
        </main>
    );
}

export default Login;