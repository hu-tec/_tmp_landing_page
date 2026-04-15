"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Plan = "1안" | "2안";
const DEFAULT_PLAN: Plan = "2안";
const STORAGE_KEY = "landing-plan-preference";

interface PlanContextValue {
  plan: Plan;
  setPlan: (plan: Plan) => void;
  mounted: boolean;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<Plan>(DEFAULT_PLAN);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "1안" || stored === "2안") {
        setPlanState(stored);
      }
    } catch {
      /* ignore storage errors */
    }
    setMounted(true);
  }, []);

  const setPlan = useCallback((next: Plan) => {
    setPlanState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  return (
    <PlanContext.Provider value={{ plan, setPlan, mounted }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used inside <PlanProvider>");
  }
  return ctx;
}
