import { useNavigate, useLocation } from 'react-router-dom';
import styles from './TabNav.module.css';

const tabs = [
  { label: 'Fixtures', path: '/' },
  { label: 'Leagues', path: '/leagues' },
  { label: 'Unlock', path: '/unlock' },
  { label: 'Certificate', path: '/certificate' },
];

export default function TabNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      {tabs.map((tab) => (
        <button
          key={tab.path}
          className={`${styles.tab} ${location.pathname === tab.path ? styles.active : ''}`}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
