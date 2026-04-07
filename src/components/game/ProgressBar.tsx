import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  total: number;
  current: number;
  correct: boolean[];
  answers: (number | boolean | null)[];
}

export default function ProgressBar({ total, current, correct, answers }: ProgressBarProps) {
  return (
    <div className={styles.container}>
      {Array.from({ length: total }, (_, i) => {
        let cls = styles.segment;
        if (i === current) cls += ` ${styles.current}`;
        else if (answers[i] !== null) cls += ` ${correct[i] ? styles.correct : styles.incorrect}`;
        return <div key={i} className={cls} />;
      })}
    </div>
  );
}
