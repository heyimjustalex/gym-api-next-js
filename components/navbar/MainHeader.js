import Link from "next/link";
import styles from "./MainHeader.module.css";
import { cookies } from "next/headers";

export default function MainHeader() {
  const token = cookies().get("token");
  const role = cookies().get("role");

  if (typeof window !== "undefined") {
    console.log("Client side Navbar");
  } else {
    console.log("Server side navbar");
    console.log("ROLE", role);
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/">
            Home
          </Link>
        </li>

        {token?.value && (
          <li className={styles.navItem}>
            <Link className={styles.navLink} href="/dashboard">
              Dashboard
            </Link>
          </li>
        )}
        {role?.value !== "Manager" && token?.value && (
          <li className={styles.navItem}>
            <Link className={styles.navLink} href="/workouts">
              Workouts
            </Link>
          </li>
        )}
        {role?.value === "PersonalTrainer" && token?.value && (
          <li className={styles.navItem}>
            <Link className={styles.navLink} href={"/clients"}>
              Clients
            </Link>
          </li>
        )}
        <li className={styles.navItem}>
          <Link className={styles.navLink} href={"/login"}>
            {!token?.value ? "Login" : "Logout"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
