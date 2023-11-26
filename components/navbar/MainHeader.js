import Link from "next/link";
import styles from "./MainHeader.module.css";

export default function MainHeader() {
  // Check if the component is rendered on the server or the client
  if (typeof window !== "undefined") {
    // Client-side rendering logic
    console.log("Client side");
  } else {
    // Server-side rendering logic
    console.log("Server side");
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/">
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/workouts">
            Workouts
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href={"/login"}>
            Login/Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}
