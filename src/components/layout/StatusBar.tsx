import styles from './StatusBar.module.css';

interface StatusBarProps {
  title: string;
  score?: number;
  questionNumber?: number;
  totalQuestions?: number;
}

export default function StatusBar({ title, score, questionNumber, totalQuestions }: StatusBarProps) {
  return (
    <div className={styles.bar}>
      <span className={styles.title}>{title}</span>
      <div className={styles.stats}>
        {questionNumber !== undefined && totalQuestions !== undefined && (
          <div className={styles.stat}>
            <span className={styles.statLabel}>Q:</span>
            <span className={styles.statValue}>
              {questionNumber}/{totalQuestions}
            </span>
          </div>
        )}
        {score !== undefined && (
          <div className={styles.stat}>
            <span className={styles.statLabel}>PTS:</span>
            <span className={`${styles.statValue} ${score > 0 ? styles.pass : ''}`}>{score}</span>
          </div>
        )}
      </div>
    </div>
  );
}
