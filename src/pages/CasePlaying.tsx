import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCaseById } from '../data/cases';
import { useGameStore } from '../store/useGameStore';
import StatusBar from '../components/layout/StatusBar';
import ProgressBar from '../components/game/ProgressBar';
import QuestionMCQ from '../components/game/QuestionMCQ';
import QuestionTF from '../components/game/QuestionTF';
import FeedbackPanel from '../components/game/FeedbackPanel';
import styles from './CasePlaying.module.css';

export default function CasePlaying() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const caseData = getCaseById(id ?? '');
  const { progress, answerQuestion, completeCase } = useGameStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMCQ, setSelectedMCQ] = useState<number | null>(null);
  const [selectedTF, setSelectedTF] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const cp = progress[caseData?.id ?? ''];

  useEffect(() => {
    if (caseData && cp && !cp.completed && cp.answers.some((a) => a !== null)) {
      let lastAnswered = -1;
      cp.answers.forEach((a, i) => {
        if (a !== null) lastAnswered = i;
      });
      if (lastAnswered >= 0 && lastAnswered < caseData.questions.length - 1) {
        setCurrentIndex(lastAnswered + 1);
      }
    }
  }, []);

  if (!caseData || caseData.questions.length === 0) {
    return <div className={styles.page}>Case not found or has no questions.</div>;
  }

  const question = caseData.questions[currentIndex];
  const isLast = currentIndex === caseData.questions.length - 1;

  const handleConfirm = useCallback(() => {
    if (!answered) {
      // Submit answer
      if (question.type === 'mcq' && selectedMCQ !== null) {
        const correct = selectedMCQ === question.correctIndex;
        setIsCorrect(correct);
        setAnswered(true);
        answerQuestion(caseData.id, currentIndex, selectedMCQ, correct);
      } else if (question.type === 'tf' && selectedTF !== null) {
        const correct = selectedTF === question.correctAnswer;
        setIsCorrect(correct);
        setAnswered(true);
        answerQuestion(caseData.id, currentIndex, selectedTF, correct);
      }
    } else {
      // Advance
      if (isLast) {
        completeCase(caseData.id);
        navigate(`/case/${caseData.id}/result`);
      } else {
        setCurrentIndex((i) => i + 1);
        setSelectedMCQ(null);
        setSelectedTF(null);
        setAnswered(false);
        setIsCorrect(false);
      }
    }
  }, [
    answered, question, selectedMCQ, selectedTF, currentIndex,
    isLast, caseData, answerQuestion, completeCase, navigate,
  ]);

  // Enter key handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleConfirm();
      } else if (e.key === 'Escape') {
        navigate(`/case/${caseData.id}/intro`);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleConfirm, navigate, caseData.id]);

  return (
    <div className={styles.page}>
      <StatusBar
        title={`${caseData.icon} ${caseData.title}`}
        score={cp?.score ?? 0}
        questionNumber={currentIndex + 1}
        totalQuestions={caseData.questions.length}
      />
      <ProgressBar
        total={caseData.questions.length}
        current={currentIndex}
        correct={cp?.correct ?? []}
        answers={cp?.answers ?? []}
      />

      {question.type === 'mcq' ? (
        <QuestionMCQ
          question={question}
          questionNumber={currentIndex + 1}
          totalQuestions={caseData.questions.length}
          selectedIndex={selectedMCQ}
          answered={answered}
          onSelect={(i) => {
            if (!answered) {
              setSelectedMCQ(i);
            }
          }}
        />
      ) : (
        <QuestionTF
          question={question}
          questionNumber={currentIndex + 1}
          totalQuestions={caseData.questions.length}
          selectedAnswer={selectedTF}
          answered={answered}
          onSelect={(v) => {
            if (!answered) {
              setSelectedTF(v);
            }
          }}
        />
      )}

      {!answered && (selectedMCQ !== null || selectedTF !== null) && (
        <div className={styles.feedbackWrap}>
          <button
            onClick={handleConfirm}
            style={{
              padding: '12px 32px',
              background: 'var(--color-accent)',
              color: 'var(--color-bg)',
              border: 'none',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            CONFIRM [Enter]
          </button>
        </div>
      )}

      {answered && (
        <div className={styles.feedbackWrap}>
          <FeedbackPanel
            isCorrect={isCorrect}
            reference={question.reference}
            explanation={question.explanation}
            onNext={handleConfirm}
            isLast={isLast}
          />
        </div>
      )}
    </div>
  );
}
