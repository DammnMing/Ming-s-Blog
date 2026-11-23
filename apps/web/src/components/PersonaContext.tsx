import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Persona = "aigc" | "dev";

interface PersonaContextValue {
  persona: Persona;
  setPersona: (next: Persona) => void;
  togglePersona: () => void;
}

const STORAGE_KEY = "subming_persona";

const PersonaContext = createContext<PersonaContextValue | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "dev" ? "dev" : "aigc";
    } catch {
      return "aigc";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, persona);
    } catch {
      /* ignore */
    }
    document.documentElement.dataset.persona = persona;
  }, [persona]);

  const setPersona = (next: Persona) => setPersonaState(next);
  const togglePersona = () => setPersonaState((prev) => (prev === "aigc" ? "dev" : "aigc"));

  return (
    <PersonaContext.Provider value={{ persona, setPersona, togglePersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona(): PersonaContextValue {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error("usePersona 必须在 PersonaProvider 内部使用");
  return ctx;
}
