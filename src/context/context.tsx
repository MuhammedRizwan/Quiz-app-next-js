'use client';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

type Answer = {
  correct: number;
  wrong: number;
  addCorrect: () => void;
  addWrong: () => void;
  resetResults: () => void;
};

const defaultData: Omit<Answer, "addCorrect" | "addWrong" | "resetResults"> = {
  correct: 0,
  wrong: 0,
};

const ResultContext = createContext<Answer | undefined>(undefined);

const STORAGE_KEY = "quizResults";

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [results, setResults] = useState(defaultData);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      try {
        const storedResults = localStorage.getItem(STORAGE_KEY);
        if (storedResults) {
          const parsed = JSON.parse(storedResults);
          if (parsed.correct !== undefined && parsed.wrong !== undefined) {
            setResults(parsed);
          }
        }
      } catch (error) {
        console.error('Error loading results from localStorage:', error);
      } finally {
        setIsInitialized(true);
      }
    }
  }, [isInitialized]);

  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
      } catch (error) {
        console.error('Error saving results to localStorage:', error);
      }
    }
  }, [results, isInitialized]);

  const addCorrect = useCallback(() => {
    setResults((prev) => ({ ...prev, correct: prev.correct + 1 }));
  }, []);

  const addWrong = useCallback(() => {
    setResults((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
  }, []);

  const resetResults = useCallback(() => {
    setResults(defaultData);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value = useMemo(() => ({
    ...results,
    addCorrect,
    addWrong,
    resetResults
  }), [results, addCorrect, addWrong, resetResults]);

  return (
    <ResultContext.Provider value={value}>
      {children}
    </ResultContext.Provider>
  );
};

const useResult = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useResult must be used within a ResultProvider");
  }
  return context;
};

export default useResult;