import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CaseProgress {
  caseId: string;
  currentQuestion: number;
  answers: (number | boolean | null)[];
  correct: boolean[];
  completed: boolean;
  score: number;
  bestScore: number;
  startedAt: string;
  completedAt: string | null;
}

interface GameState {
  // Unlocks
  unlockedCases: string[];
  bundleUnlocked: boolean;

  // Progress per case
  progress: Record<string, CaseProgress>;

  // Timer
  firstVisitAt: string | null;

  // Actions
  unlockCase: (caseId: string) => void;
  unlockBundle: () => void;
  startCase: (caseId: string, totalQuestions: number) => void;
  answerQuestion: (
    caseId: string,
    questionIndex: number,
    answer: number | boolean,
    isCorrect: boolean
  ) => void;
  completeCase: (caseId: string) => void;
  resetCase: (caseId: string, totalQuestions: number) => void;
  setFirstVisit: () => void;
  isCaseUnlocked: (caseId: string, isFree: boolean) => boolean;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      unlockedCases: [],
      bundleUnlocked: false,
      progress: {},
      firstVisitAt: null,

      unlockCase: (caseId) =>
        set((state) => ({
          unlockedCases: state.unlockedCases.includes(caseId)
            ? state.unlockedCases
            : [...state.unlockedCases, caseId],
        })),

      unlockBundle: () =>
        set({
          bundleUnlocked: true,
          unlockedCases: ['fire', 'water', 'asbestos', 'electrical', 'gas', 'cooling'],
        }),

      startCase: (caseId, totalQuestions) =>
        set((state) => {
          const existing = state.progress[caseId];
          if (existing && !existing.completed) return state;
          return {
            progress: {
              ...state.progress,
              [caseId]: {
                caseId,
                currentQuestion: 0,
                answers: new Array(totalQuestions).fill(null),
                correct: new Array(totalQuestions).fill(false),
                completed: false,
                score: 0,
                bestScore: existing?.bestScore ?? 0,
                startedAt: new Date().toISOString(),
                completedAt: null,
              },
            },
          };
        }),

      answerQuestion: (caseId, questionIndex, answer, isCorrect) =>
        set((state) => {
          const cp = state.progress[caseId];
          if (!cp) return state;
          const answers = [...cp.answers];
          const correct = [...cp.correct];
          answers[questionIndex] = answer;
          correct[questionIndex] = isCorrect;
          const score = correct.filter(Boolean).length * 10;
          return {
            progress: {
              ...state.progress,
              [caseId]: { ...cp, answers, correct, score, currentQuestion: questionIndex },
            },
          };
        }),

      completeCase: (caseId) =>
        set((state) => {
          const cp = state.progress[caseId];
          if (!cp) return state;
          const finalScore = cp.correct.filter(Boolean).length * 10;
          return {
            progress: {
              ...state.progress,
              [caseId]: {
                ...cp,
                completed: true,
                score: finalScore,
                bestScore: Math.max(cp.bestScore, finalScore),
                completedAt: new Date().toISOString(),
              },
            },
          };
        }),

      resetCase: (caseId, totalQuestions) =>
        set((state) => {
          const existing = state.progress[caseId];
          return {
            progress: {
              ...state.progress,
              [caseId]: {
                caseId,
                currentQuestion: 0,
                answers: new Array(totalQuestions).fill(null),
                correct: new Array(totalQuestions).fill(false),
                completed: false,
                score: 0,
                bestScore: existing?.bestScore ?? 0,
                startedAt: new Date().toISOString(),
                completedAt: null,
              },
            },
          };
        }),

      setFirstVisit: () =>
        set((state) => ({
          firstVisitAt: state.firstVisitAt ?? new Date().toISOString(),
        })),

      isCaseUnlocked: (caseId, isFree) => {
        if (isFree) return true;
        const state = get();
        return state.bundleUnlocked || state.unlockedCases.includes(caseId);
      },
    }),
    {
      name: 'bso-game-storage',
    }
  )
);
