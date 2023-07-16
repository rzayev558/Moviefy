import React, { useState } from "react";
import { Inter } from "next/font/google";
import styles from "./NavBar.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <nav className={[styles.navbar, inter.className].join(" ")}>
      <Link href="/" className={styles.logo}>
        <h2>OMDB</h2>
      </Link>
      <ul className={styles.navLinks}>
        <div className={styles.menu}>
          <li>
            <Link href="/">
              <h3>Search</h3>
            </Link>
          </li>
          <li>
            <Link href="/recommend">
              <h3>Recommendations</h3>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
