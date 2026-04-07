import { useParams, useNavigate } from 'react-router-dom';
import { getCaseById } from '../data/cases';
import { useGameStore } from '../store/useGameStore';
import styles from './CaseIntro.module.css';

export default function CaseIntro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { progress, startCase, resetCase } = useGameStore();
  const caseData = getCaseById(id ?? '');

  if (!caseData) {
    return <div className={styles.page}>Case not found.</div>;
  }

  const cp = progress[caseData.id];
  const hasQuestions = caseData.questions.length > 0;

  const handlePlay = () => {
    if (!hasQuestions) return;
    if (cp?.completed) {
      resetCase(caseData.id, caseData.questions.length);
    } else {
      startCase(caseData.id, caseData.questions.length);
    }
    navigate(`/case/${caseData.id}/play`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.caseNum}>
          Case {String(caseData.number).padStart(2, '0')}
        </div>
        <div className={styles.title} style={{ color: caseData.color }}>
          {caseData.icon} {caseData.title}
        </div>
        <div className={styles.regulation}>{caseData.regulation}</div>
      </div>

      <div className={styles.briefingLabel}>Incident Briefing</div>
      <div className={styles.briefing}>{caseData.briefing}</div>

      <div className={styles.meta}>
        <div>
          <span className={styles.metaLabel}>Questions: </span>
          <span className={styles.metaValue}>{caseData.questions.length}</span>
        </div>
        <div>
          <span className={styles.metaLabel}>Max Score: </span>
          <span className={styles.metaValue}>{caseData.questions.length * 10}</span>
        </div>
        <div>
          <span className={styles.metaLabel}>Format: </span>
          <span className={styles.metaValue}>MCQ + T/F</span>
        </div>
      </div>

      {cp?.bestScore !== undefined && cp.bestScore > 0 && (
        <div className={styles.bestScore}>
          <span className={styles.bestLabel}>Personal Best: </span>
          <span className={styles.bestValue}>{cp.bestScore} / {caseData.questions.length * 10}</span>
        </div>
      )}

      <div className={styles.actions}>
        <button className={styles.playBtn} onClick={handlePlay} disabled={!hasQuestions}>
          {!hasQuestions
            ? 'COMING SOON'
            : cp?.completed
              ? 'RETRY CASE ▶'
              : 'BEGIN CASE ▶'}
        </button>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← BACK
        </button>
      </div>
    </div>
  );
}
