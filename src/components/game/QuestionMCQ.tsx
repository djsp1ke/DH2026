import { useEffect } from 'react';
import type { MCQQuestion } from '../../data/cases';
import styles from './QuestionMCQ.module.css';

interface QuestionMCQProps {
  question: MCQQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedIndex: number | null;
  answered: boolean;
  onSelect: (index: number) => void;
}

const keys = ['A', 'B', 'C', 'D'];

export default function QuestionMCQ({
  question,
  questionNumber,
  totalQuestions,
  selectedIndex,
  answered,
  onSelect,
}: QuestionMCQProps) {
  useEffect(() => {
    if (answered) return;
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key >= '1' && key <= '4') {
        onSelect(parseInt(key) - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [answered, onSelect]);

  return (
    <div className={styles.container}>
      <div className={styles.questionNum}>
        Question {questionNumber} of {totalQuestions} — MCQ
      </div>
      <div className={styles.questionText}>{question.text}</div>
      <div className={styles.options}>
        {question.options.map((opt, i) => {
          let cls = styles.option;
          if (answered) {
            if (i === question.correctIndex) {
              cls += ` ${styles.correctOption} ${styles.disabledCorrect}`;
            } else if (i === selectedIndex) {
              cls += ` ${styles.incorrectOption} ${styles.disabled}`;
            } else {
              cls += ` ${styles.disabled}`;
            }
          } else if (i === selectedIndex) {
            cls += ` ${styles.selected}`;
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => !answered && onSelect(i)}
              disabled={answered}
            >
              <span className={styles.key}>{keys[i]}</span>
              <span className={styles.optionText}>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
