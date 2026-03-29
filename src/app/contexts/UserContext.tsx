import { createContext, useContext, useState, ReactNode } from "react";

export type InvestorType = "conservative" | "moderate" | "aggressive";

export type DisplayPreferences = {
  showDividend: boolean;
  showValue: boolean;
  showGrowth: boolean;
  showRisk: boolean;
  showTechnical: boolean;
};

interface UserContextType {
  investorType: InvestorType;
  displayPreferences: DisplayPreferences;
  recentQueries: string[];
  updateInvestorType: (type: InvestorType) => void;
  addQuery: (query: string) => void;
  updateDisplayPreferences: (prefs: Partial<DisplayPreferences>) => void;
  getRelevantMetrics: () => string[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// 투자 성향별 기본 선호 지표
const defaultPreferencesByType: Record<InvestorType, DisplayPreferences> = {
  conservative: {
    showDividend: true,
    showValue: true,
    showGrowth: false,
    showRisk: true,
    showTechnical: false,
  },
  moderate: {
    showDividend: false,
    showValue: true,
    showGrowth: true,
    showRisk: true,
    showTechnical: false,
  },
  aggressive: {
    showDividend: false,
    showValue: false,
    showGrowth: true,
    showRisk: false,
    showTechnical: true,
  },
};

// 키워드 기반 지표 활성화 맵
const queryKeywordMap: Record<string, Partial<DisplayPreferences>> = {
  배당: { showDividend: true },
  배당금: { showDividend: true },
  배당수익률: { showDividend: true },
  안정: { showDividend: true, showRisk: true },
  안정적: { showDividend: true, showRisk: true },
  PER: { showValue: true },
  PBR: { showValue: true },
  가치: { showValue: true },
  저평가: { showValue: true },
  성장: { showGrowth: true },
  성장률: { showGrowth: true },
  매출: { showGrowth: true },
  영업이익: { showGrowth: true },
  위험: { showRisk: true },
  변동성: { showRisk: true },
  베타: { showRisk: true },
  차트: { showTechnical: true },
  기술적: { showTechnical: true },
  이동평균: { showTechnical: true },
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [investorType, setInvestorType] = useState<InvestorType>("moderate");
  const [displayPreferences, setDisplayPreferences] = useState<DisplayPreferences>(
    defaultPreferencesByType.moderate
  );
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  const updateInvestorType = (type: InvestorType) => {
    setInvestorType(type);
    setDisplayPreferences(defaultPreferencesByType[type]);
  };

  const addQuery = (query: string) => {
    setRecentQueries((prev) => [query, ...prev.slice(0, 9)]); // 최근 10개만 유지

    // 쿼리 키워드 분석하여 표시 선호도 업데이트
    const newPrefs: Partial<DisplayPreferences> = {};
    Object.entries(queryKeywordMap).forEach(([keyword, prefs]) => {
      if (query.includes(keyword)) {
        Object.assign(newPrefs, prefs);
      }
    });

    if (Object.keys(newPrefs).length > 0) {
      setDisplayPreferences((prev) => ({ ...prev, ...newPrefs }));
    }
  };

  const updateDisplayPreferences = (prefs: Partial<DisplayPreferences>) => {
    setDisplayPreferences((prev) => ({ ...prev, ...prefs }));
  };

  const getRelevantMetrics = (): string[] => {
    const metrics: string[] = [];
    if (displayPreferences.showDividend) metrics.push("dividend");
    if (displayPreferences.showValue) metrics.push("value");
    if (displayPreferences.showGrowth) metrics.push("growth");
    if (displayPreferences.showRisk) metrics.push("risk");
    if (displayPreferences.showTechnical) metrics.push("technical");
    return metrics;
  };

  return (
    <UserContext.Provider
      value={{
        investorType,
        displayPreferences,
        recentQueries,
        updateInvestorType,
        addQuery,
        updateDisplayPreferences,
        getRelevantMetrics,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
