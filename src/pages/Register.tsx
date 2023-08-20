import { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterUser from '../services/RegisterUser';

import styles from "../styles/Auth.module.css";
import back from "../assets/back-arrow.svg"

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState("");

    const [usernameError, setUsernameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("");
    const [password2Error, setPassword2Error] = useState('');

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("")
    const [state, setState] = useState<boolean>(true);

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value;
        const validation = /^[a-zA-Z0-9]{8,20}$/.test(username);

        setUsername(username);
        setUsernameError(validation ? '' : '8-20 letters or numbers');
        setState(validation && !emailError && !passwordError && email && password ? false : true);
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        const validation = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

        setEmail(email);
        setEmailError(validation ? '' : 'This email is not valid');
        setState(validation && !usernameError && !passwordError && username && password ? false : true);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        const validation = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

        setPassword(password);
        setPasswordError(validation ? '' : 'Use lowercase, uppercase and numbers');
        if (password2) setPassword2Error(password === password2 ? '' : "Both password doesn't match")
        setState(validation && !usernameError && !emailError && username && email && password2 ? false : true);
    };

    const handlePassword2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password2 = event.target.value;

        setPassword2(password2);
        setPassword2Error(password === password2 ? '' : "Both password doesn't match");
        setState(password === password2 && !usernameError && !emailError && username && email ? false : true);
    }

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        RegisterUser(username, email, password)
            .then(message => {
                setUsername("");
                setEmail("");
                setPassword("");
                setPassword2("");
                setState(true);
                setErrorMsg("");
                setSuccessMsg(message);
            })
            .catch(message => {
                setSuccessMsg("");
                setErrorMsg(message);
            })
    };

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <div className={styles.arrow}>
                    <Link to="/"><img src={back} alt="back" /></Link>
                </div>
                <div className={styles.title}>
                    <h2 >Create an account</h2>
                </div>
                <form className={styles.form} onSubmit={handleRegister}>
                    <input type="text" placeholder='Choose your username' value={username} onChange={handleUsername} />
                    {usernameError && <p className={styles.errorMsg}>{usernameError}</p>}
                    <input type="email" placeholder='Put your email' value={email} onChange={handleEmail} />
                    {emailError && <p className={styles.errorMsg}>{emailError}</p>}
                    <input type="password" placeholder='Create a strong password' value={password} onChange={handlePassword} />
                    {passwordError && <p className={styles.errorMsg}>{passwordError}</p>}
                    <input type="password" placeholder='Reapeat the password' value={password2} onChange={handlePassword2} />
                    {password2Error && <p className={styles.errorMsg}>{password2Error}</p>}
                    <button disabled={state} type='submit'>Register</button>
                    {successMsg && <p className={styles.successMsg}>{successMsg}</p>}
                    {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                </form>
                <div className={styles.changer}>
                    <p>Already have an account? <Link to="/auth/login">Login</Link></p>
                </div>
            </div>
        </main>
    );
}

export default Register;