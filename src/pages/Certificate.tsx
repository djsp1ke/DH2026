import { useNavigate } from 'react-router-dom';
import { cases, getRating } from '../data/cases';
import { useGameStore } from '../store/useGameStore';
import styles from './Certificate.module.css';

export default function Certificate() {
  const navigate = useNavigate();
  const { progress } = useGameStore();

  const completedCases = cases.filter((c) => progress[c.id]?.completed);
  const totalBest = completedCases.reduce((sum, c) => sum + (progress[c.id]?.bestScore ?? 0), 0);
  const maxPossible = cases.length * 100;
  const overallRating = getRating(completedCases.length > 0 ? Math.round(totalBest / completedCases.length) : 0);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.title}>Season Certificate</div>
        <div className={styles.subtitle}>Building Safety Officer — 2026</div>
      </div>

      {completedCases.length === 0 ? (
        <div className={styles.empty}>
          No cases completed yet.
          <br />
          <button onClick={() => navigate('/')} style={{ marginTop: 16 }}>
            ← VIEW FIXTURES
          </button>
        </div>
      ) : (
        <>
          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Cases</div>
              <div className={styles.summaryValue}>
                {completedCases.length}/{cases.length}
              </div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Total Best</div>
              <div className={styles.summaryValue}>
                {totalBest}/{maxPossible}
              </div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Rating</div>
              <div className={styles.summaryValue}>
                {overallRating.icon}
              </div>
            </div>
          </div>

          <div className={`${styles.caseRow} ${styles.caseHeader}`}>
            <span>#</span>
            <span>Case</span>
            <span style={{ textAlign: 'right' }}>Best</span>
            <span style={{ textAlign: 'right' }}>Status</span>
          </div>
          {cases.map((c) => {
            const cp = progress[c.id];
            return (
              <div key={c.id} className={styles.caseRow}>
                <span className={styles.dim}>
                  {String(c.number).padStart(2, '0')}
                </span>
                <span>
                  {c.icon} {c.title}
                </span>
                {cp?.completed ? (
                  <>
                    <span className={styles.scoreCol}>{cp.bestScore}</span>
                    <span className={styles.pass}>✓ DONE</span>
                  </>
                ) : (
                  <>
                    <span className={styles.notPlayed}>—</span>
                    <span className={styles.notPlayed}>Not played</span>
                  </>
                )}
              </div>
            );
          })}

          <div className={styles.actions}>
            <button onClick={() => navigate('/')}>← BACK TO FIXTURES</button>
          </div>
        </>
      )}
    </div>
  );
}
