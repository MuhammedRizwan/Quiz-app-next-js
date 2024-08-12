'use client'
import { createContext, useContext, useState ,useEffect} from "react";

type Answer = {
    correct: number,
    wrong: number,
    addCorrect: () => void
    addWrong: () => void
}
const defaultData: Omit<Answer, "addCorrect" | "addWrong"> = {
    correct: 0,
    wrong: 0
}
const ResultContext = createContext<Answer | undefined>(undefined)

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
    const [results, setResults] = useState(() => {
        const storedResults = localStorage.getItem(process.env.STORAGE_KEY!);
        return storedResults ? JSON.parse(storedResults) : defaultData;
    })
    useEffect(() => {
        localStorage.setItem(process.env.STORAGE_KEY!, JSON.stringify(results));
    }, [results]);
    const addCorrect = () => {
        setResults((prev:Answer) => ({ ...prev, correct: prev.correct + 1 }))
    }
    const addWrong = () => {
        setResults((prev:Answer) => ({ ...prev, wrong: prev.wrong + 1 }))
    }
    return (
        <ResultContext.Provider value={{ ...results, addCorrect, addWrong }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResult = () => {
    const context = useContext(ResultContext);
    if (!context) {
        throw new Error('useResult must be used within a ResultProvider');
    }
    return context;
};
