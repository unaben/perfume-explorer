import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => (
  <header className={styles.appHeader}>
    <h1 className={styles.appTitle}>Perfume Olfactory Explorer</h1>
    <p className={styles.appSubtitle}>
      Filter the catalog by Olfactory Family, Category, and Size. Filters are saved to the URL.
    </p>
  </header>
);

export default Header;
