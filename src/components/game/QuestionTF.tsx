import { useEffect } from 'react';
import type { TFQuestion } from '../../data/cases';
import styles from './QuestionTF.module.css';

interface QuestionTFProps {
  question: TFQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: boolean | null;
  answered: boolean;
  onSelect: (answer: boolean) => void;
}

export default function QuestionTF({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  answered,
  onSelect,
}: QuestionTFProps) {
  useEffect(() => {
    if (answered) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 't' || e.key === 'T') onSelect(true);
      if (e.key === 'f' || e.key === 'F') onSelect(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [answered, onSelect]);

  const getClass = (value: boolean) => {
    let cls = styles.option;
    if (answered) {
      if (value === question.correctAnswer) {
        cls += ` ${styles.correctOption} ${styles.disabledCorrect}`;
      } else if (value === selectedAnswer) {
        cls += ` ${styles.incorrectOption} ${styles.disabled}`;
      } else {
        cls += ` ${styles.disabled}`;
      }
    } else if (value === selectedAnswer) {
      cls += ` ${styles.selected}`;
    }
    return cls;
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionNum}>
        Question {questionNumber} of {totalQuestions} — True / False
      </div>
      <div className={styles.questionText}>{question.text}</div>
      <div className={styles.options}>
        <button className={getClass(true)} onClick={() => !answered && onSelect(true)} disabled={answered}>
          <span className={styles.key}>T</span>
          TRUE
        </button>
        <button className={getClass(false)} onClick={() => !answered && onSelect(false)} disabled={answered}>
          <span className={styles.key}>F</span>
          FALSE
        </button>
      </div>
    </div>
  );
}
