import { useParams, useNavigate } from 'react-router-dom';
import { getCaseById, getRating } from '../data/cases';
import { useGameStore } from '../store/useGameStore';
import styles from './CaseResult.module.css';

export default function CaseResult() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const caseData = getCaseById(id ?? '');
  const { progress } = useGameStore();

  if (!caseData) return <div className={styles.page}>Case not found.</div>;

  const cp = progress[caseData.id];
  if (!cp?.completed) {
    navigate(`/case/${caseData.id}/intro`);
    return null;
  }

  const rating = getRating(cp.score);
  const correctCount = cp.correct.filter(Boolean).length;
  const date = cp.completedAt
    ? new Date(cp.completedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span>CASE CLOSED</span>
        <span>{date}</span>
      </div>

      <div className={styles.caseTitle}>
        {caseData.icon} {caseData.title}
      </div>
      <div className={styles.regulation}>{caseData.regulation}</div>

      <div className={styles.scoreGrid}>
        <div className={styles.scoreItem}>
          <div className={styles.scoreLabel}>Score</div>
          <div className={styles.scoreValue}>
            {cp.score} / {caseData.questions.length * 10}
          </div>
        </div>
        <div className={styles.scoreItem}>
          <div className={styles.scoreLabel}>Correct</div>
          <div className={styles.scoreValue}>
            {correctCount} / {caseData.questions.length}
          </div>
        </div>
        <div className={styles.scoreItem}>
          <div className={styles.scoreLabel}>Best</div>
          <div className={styles.scoreValue}>
            {cp.bestScore}
          </div>
        </div>
      </div>

      <div className={styles.ratingRow}>
        <span className={styles.ratingLabel}>Rating</span>
        <span className={styles.stars}>
          {'★'.repeat(rating.stars)}
          {'☆'.repeat(5 - rating.stars)}
        </span>{' '}
        <span className={styles.ratingValue}>
          {rating.icon} {rating.label.toUpperCase()}
        </span>
      </div>

      <div className={styles.breakdown}>
        <div className={styles.breakdownHeader}>Question Breakdown</div>
        {caseData.questions.map((q, i) => (
          <div key={q.id} className={styles.qRow}>
            <span className={styles.qNum}>Q{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.qType}>{q.type.toUpperCase()}</span>
            <span className={cp.correct[i] ? styles.qCorrect : styles.qIncorrect}>
              {cp.correct[i] ? '✓' : '✗'}
            </span>
            <span className={styles.qRef}>{q.reference}</span>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.retryBtn} onClick={() => navigate(`/case/${caseData.id}/intro`)}>
          RETRY CASE
        </button>
        <button onClick={() => navigate('/')}>← FIXTURES</button>
        <button onClick={() => navigate('/certificate')}>CERTIFICATE →</button>
      </div>
    </div>
  );
}
