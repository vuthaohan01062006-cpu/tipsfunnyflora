"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, DICTIONARY } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("treat_sweet_lang");
      if (savedLang === "vi" || savedLang === "en") {
        setLanguageState(savedLang);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("treat_sweet_lang", lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "vi" ? "en" : "vi";
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    const item = DICTIONARY[key];
    if (!item) return key;
    return item[language] || item.vi || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
