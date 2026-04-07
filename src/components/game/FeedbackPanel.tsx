import styles from './FeedbackPanel.module.css';

interface FeedbackPanelProps {
  isCorrect: boolean;
  reference: string;
  explanation: string;
  onNext: () => void;
  isLast: boolean;
}

export default function FeedbackPanel({
  isCorrect,
  reference,
  explanation,
  onNext,
  isLast,
}: FeedbackPanelProps) {
  return (
    <div className={`${styles.panel} ${isCorrect ? styles.correct : styles.incorrect}`}>
      <div
        className={`${styles.verdict} ${isCorrect ? styles.verdictCorrect : styles.verdictIncorrect}`}
      >
        {isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
      </div>
      <div className={styles.explanation}>{explanation}</div>
      <div className={styles.reference}>{reference}</div>
      <button className={styles.nextBtn} onClick={onNext}>
        {isLast ? 'VIEW RESULTS →' : 'NEXT QUESTION → [Enter]'}
      </button>
    </div>
  );
}
