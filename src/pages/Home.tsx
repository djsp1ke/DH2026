import { useNavigate } from 'react-router-dom';
import { cases } from '../data/cases';
import { useGameStore } from '../store/useGameStore';
import DataRow, { DataRowHeader } from '../components/layout/DataRow';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();
  const { progress, isCaseUnlocked } = useGameStore();

  const getStatus = (c: (typeof cases)[0]) => {
    const unlocked = isCaseUnlocked(c.id, c.free);
    const cp = progress[c.id];

    if (!unlocked) return { text: 'LOCKED 🔒', cls: 'locked' as const };
    if (cp?.completed) return { text: `${cp.bestScore} PTS ✓`, cls: 'completed' as const };
    if (cp && !cp.completed) return { text: 'IN PROGRESS', cls: 'inProgress' as const };
    if (c.free) return { text: 'FREE ▶', cls: 'free' as const };
    return { text: 'PLAY ▶', cls: 'free' as const };
  };

  const handleClick = (c: (typeof cases)[0]) => {
    const unlocked = isCaseUnlocked(c.id, c.free);
    if (!unlocked) {
      navigate('/unlock');
      return;
    }
    navigate(`/case/${c.id}/intro`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.title}>Building Safety Officer</div>
        <div className={styles.subtitle}>
          Championship Season 2026 — Fixture List
        </div>
      </div>
      <div className={styles.table}>
        <DataRowHeader />
        {cases.map((c) => {
          const status = getStatus(c);
          return (
            <DataRow
              key={c.id}
              number={String(c.number).padStart(2, '0')}
              title={`${c.icon} ${c.title}`}
              regulation={c.regulation}
              status={status.text}
              statusClass={status.cls}
              onClick={() => handleClick(c)}
            />
          );
        })}
      </div>
      <div className={styles.footer}>
        6 CASES · 60 QUESTIONS · REAL UK LAW
      </div>
    </div>
  );
}
