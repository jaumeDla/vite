import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import icon from "../assets/icon.png";

export default function Main() {
    return (
        <>
            <header className={styles.header}>
                <img src={icon} alt="Shamb Icon" className={styles.logo} />
                <div className={styles.linkList}>
                    <Link to="/products" className={styles.navLink}>Products</Link>
                    <Link to="mailto:info@example.com" className={styles.navLink}>Contact</Link>
                    <Link to="/faq" className={styles.navLink}>FAQ</Link>
                </div>
                <div className={styles.authList}>
                    <Link to="/auth/login" className={styles.authLink}>Login</Link>
                    <Link to="/auth/register" className={styles.authLink}>Register</Link>
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.topDescription}>
                        <h1 className={styles.title}>Discover a World of Treasures</h1>
                        <p className={styles.description}>
                            Welcome to Shamb, your online shopping destination to discover the latest in fashion, technology, and more. Immerse yourself in a unique shopping experience where quality meets convenience. From cutting-edge fashion to innovative products, we have what you need to elevate your lifestyle.
                        </p>
                    </div>
                    <div className={styles.bottomDescription}>
                        <div className={styles.reasons}>
                            <h2 className={styles.subtitle}>Why Choose Shamb?</h2>
                            <ul className={styles.reasonList}>
                                <li>Carefully Curated Selection: Our team of experts searches for the most exclusive and exciting products for you.</li>
                                <li>Guaranteed Quality: Every item in our catalog meets the highest quality standards.</li>
                                <li>Shop with Confidence: We offer a secure purchasing process and exceptional customer service.</li>
                                <li>Fast and Convenient Delivery: Your purchases will reach your doorstep in record time.</li>
                                <li>Trends at Your Fingertips: Stay up-to-date with the latest trends without leaving your home.</li>
                            </ul>
                        </div>
                        <div className={styles.additionalSection}>
                            <h2 className={styles.subtitle}>Discover Our Categories</h2>
                            <p className={styles.description}>
                                Explore a wide range of categories to find exactly what you're looking for. Whether it's fashion, electronics, home decor, or beauty products, we have it all. Our user-friendly navigation makes it easy to browse through our extensive collection and discover new favorites. Start exploring now and treat yourself to the best shopping experience at Shamb!
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
