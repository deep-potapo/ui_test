import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Newspaper, ThumbsUp, ThumbsDown, TrendingUp, Filter, Plus, X } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";

interface NewsItem {
  id: string;
  title: string;
  relatedStock?: string;
  stockSymbol?: string;
  sector?: string;
  sentiment: "긍정" | "부정" | "중립";
  summary: string[];
  confidence: number;
  importance: "높음" | "중간" | "낮음";
  publishedAt: string;
}

const sectors = [
  { id: "semiconductor", name: "반도체", icon: "💾" },
  { id: "it", name: "IT/기술", icon: "💻" },
  { id: "auto", name: "자동차", icon: "🚗" },
  { id: "finance", name: "금융", icon: "💰" },
  { id: "bio", name: "바이오/제약", icon: "💊" },
  { id: "energy", name: "에너지", icon: "⚡" },
  { id: "consumer", name: "소비재", icon: "🛒" },
  { id: "construction", name: "건설", icon: "🏗️" },
];

const newsData: NewsItem[] = [
  {
    id: "1",
    title: "삼성전자, 신규 반도체 공장 투자 발표",
    relatedStock: "삼성전자",
    stockSymbol: "005930",
    sector: "semiconductor",
    sentiment: "긍정",
    summary: [
      "20조원 규모의 신규 반도체 공장 투자 발표",
      "AI 반도체 시장 확대에 대응하기 위한 전략",
      "2026년 하반기 가동 목표로 추진",
    ],
    confidence: 92,
    importance: "높음",
    publishedAt: "2시간 전",
  },
  {
    id: "2",
    title: "NAVER, AI 기술 개발 확대",
    relatedStock: "NAVER",
    stockSymbol: "035420",
    sector: "it",
    sentiment: "긍정",
    summary: [
      "생성형 AI 기술에 대규모 투자 진행",
      "글로벌 AI 시장 진출 강화",
      "자체 LLM 모델 개발 완료 예정",
    ],
    confidence: 88,
    importance: "높음",
    publishedAt: "3시간 전",
  },
  {
    id: "3",
    title: "카카오, 실적 개선 전망",
    relatedStock: "카카오",
    stockSymbol: "035720",
    sector: "it",
    sentiment: "긍정",
    summary: [
      "다양한 사업 부문에서 실적 개선 예상",
      "게임과 커머스 분야 성장 두드러져",
      "애널리스트 목표가 상향 조정",
    ],
    confidence: 90,
    importance: "중간",
    publishedAt: "5시간 전",
  },
  {
    id: "4",
    title: "광고 시장 경쟁 심화 우려",
    relatedStock: "NAVER",
    stockSymbol: "035420",
    sector: "it",
    sentiment: "부정",
    summary: [
      "국내 온라인 광고 시장 경쟁 심화",
      "수익성 악화 우려 제기",
      "광고 단가 하락 추세 지속",
    ],
    confidence: 75,
    importance: "중간",
    publishedAt: "6시간 전",
  },
  {
    id: "5",
    title: "현대차, 전기차 판매 호조",
    relatedStock: "현대차",
    stockSymbol: "005380",
    sector: "auto",
    sentiment: "긍정",
    summary: [
      "전기차 판매 전년 대비 40% 증가",
      "글로벌 시장에서 입지 강화",
      "유럽 시장 점유율 확대",
    ],
    confidence: 87,
    importance: "높음",
    publishedAt: "8시간 전",
  },
  {
    id: "6",
    title: "글로벌 반도체 수요 증가 전망",
    relatedStock: "삼성전자",
    stockSymbol: "005930",
    sector: "semiconductor",
    sentiment: "긍정",
    summary: [
      "반도체 시장 분석 기관 수요 전망 상향",
      "내년 반도체 수요 전년 대비 15% 증가 예상",
      "AI 및 데이터센터 수요 증가가 주요 원인",
    ],
    confidence: 85,
    importance: "중간",
    publishedAt: "10시간 전",
  },
  {
    id: "7",
    title: "반도체 업계, HBM 메모리 공급 부족 지속",
    sector: "semiconductor",
    sentiment: "중립",
    summary: [
      "고대역폭 메모리(HBM) 수요가 공급을 크게 초과",
      "주요 반도체 기업들 생산 증설 계획 발표",
      "2027년까지 공급 부족 현상 지속 전망",
    ],
    confidence: 88,
    importance: "높음",
    publishedAt: "12시간 전",
  },
  {
    id: "8",
    title: "국내 완성차 업계, 수출 실적 호조",
    sector: "auto",
    sentiment: "긍정",
    summary: [
      "3월 자동차 수출 전년 대비 25% 증가",
      "전기차와 하이브리드 모델 판매 급증",
      "북미 및 유럽 시장 점유율 확대",
    ],
    confidence: 91,
    importance: "높음",
    publishedAt: "1일 전",
  },
  {
    id: "9",
    title: "금융당국, 디지털 금융 규제 완화 검토",
    sector: "finance",
    sentiment: "긍정",
    summary: [
      "핀테크 기업 진입 장벽 낮추는 방안 논의",
      "디지털 자산 관련 법안 개정 추진",
      "금융 혁신 촉진을 위한 규제 샌드박스 확대",
    ],
    confidence: 82,
    importance: "중간",
    publishedAt: "1일 전",
  },
  {
    id: "10",
    title: "바이오 기업들, 글로벌 임상 성과 발표",
    sector: "bio",
    sentiment: "긍정",
    summary: [
      "국내 바이오텍 3사, 해외 임상 3상 성공",
      "항암제 및 희귀질환 치료제 개발 박차",
      "글로벌 제약사와 기술 이전 계약 체결",
    ],
    confidence: 89,
    importance: "높음",
    publishedAt: "2일 전",
  },
];

export function News() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"all" | "holdings" | "favorites" | "sectors">("all");
  const [sentimentFilter, setSentimentFilter] = useState<"all" | "긍정" | "부정" | "중립">("all");
  const [selectedSectors, setSelectedSectors] = useState<string[]>(["semiconductor", "it"]);
  const [showSectorModal, setShowSectorModal] = useState(false);

  const toggleSector = (sectorId: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sectorId) ? prev.filter((s) => s !== sectorId) : [...prev, sectorId]
    );
  };

  const filteredNews = newsData
    .filter((news) => {
      if (selectedTab === "holdings") {
        // 보유 종목 관련 뉴스만
        return ["005930", "035420"].includes(news.stockSymbol || "");
      }
      if (selectedTab === "favorites") {
        // 관심 종목 관련 뉴스만
        return ["005930", "035720"].includes(news.stockSymbol || "");
      }
      if (selectedTab === "sectors") {
        // 관심 분야 뉴스만
        return news.sector && selectedSectors.includes(news.sector);
      }
      return true;
    })
    .filter((news) => {
      if (sentimentFilter === "all") return true;
      return news.sentiment === sentimentFilter;
    });

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 필터 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">감성 필터:</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSentimentFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${sentimentFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                전체
              </button>
              <button
                onClick={() => setSentimentFilter("긍정")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${sentimentFilter === "긍정"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                긍정
              </button>
              <button
                onClick={() => setSentimentFilter("부정")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${sentimentFilter === "부정"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                부정
              </button>
            </div>
          </div>
        </div>

        {/* 뉴스 탭 */}
        <Tabs.Root value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
          <Tabs.List className="flex gap-2 mb-6 flex-wrap">
            <Tabs.Trigger
              value="all"
              className="px-4 py-2 rounded-lg font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all"
            >
              전체 뉴스
            </Tabs.Trigger>
            <Tabs.Trigger
              value="holdings"
              className="px-4 py-2 rounded-lg font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all"
            >
              보유 종목
            </Tabs.Trigger>
            <Tabs.Trigger
              value="favorites"
              className="px-4 py-2 rounded-lg font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all"
            >
              관심 종목
            </Tabs.Trigger>
            <Tabs.Trigger
              value="sectors"
              className="px-4 py-2 rounded-lg font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all"
            >
              관심 분야 ({selectedSectors.length})
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        {/* 관심 분야 선택 카드 (관심 분야 탭일 때만 표시) */}
        {selectedTab === "sectors" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">관심 분야 선택</h3>
              </div>
              <span className="text-sm text-gray-600">
                {selectedSectors.length}개 선택됨
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sectors.map((sector) => {
                const isSelected = selectedSectors.includes(sector.id);
                return (
                  <button
                    key={sector.id}
                    onClick={() => toggleSector(sector.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${isSelected
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    <span className="text-lg">{sector.icon}</span>
                    <span>{sector.name}</span>
                    {isSelected && <X className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                💡 <strong>팁:</strong> 관심 분야를 선택하면 해당 산업의 뉴스만 필터링하여 볼 수 있습니다.
              </p>
            </div>
          </div>
        )}

        {/* 관심 분야 모달 삭제 (이제 필요 없음) */}
        {/* {showSectorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg w-96">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">관심 분야 선택</h3>
                <button
                  onClick={() => setShowSectorModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {sectors.map((sector) => (
                  <div key={sector.id} className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSector(sector.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedSectors.includes(sector.id)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {sector.name}
                    </button>
                    <span className="text-gray-500">{sector.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} */}

        {/* 뉴스 목록 */}
        <div className="space-y-4">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
            >
              {/* 헤더 */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Newspaper className="w-5 h-5 text-gray-400 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{news.title}</h3>
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                      {news.sector && (
                        <>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                            {sectors.find((s) => s.id === news.sector)?.icon}{" "}
                            {sectors.find((s) => s.id === news.sector)?.name}
                          </span>
                          {news.relatedStock && <span className="text-gray-400">·</span>}
                        </>
                      )}
                      {news.relatedStock && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/stock/${news.stockSymbol}`);
                          }}
                          className="text-blue-600 hover:underline font-medium flex items-center gap-1"
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                          {news.relatedStock}
                        </button>
                      )}
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500">{news.publishedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${news.sentiment === "긍정"
                        ? "bg-green-100 text-green-700"
                        : news.sentiment === "부정"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {news.sentiment}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${news.importance === "높음"
                        ? "bg-orange-100 text-orange-700"
                        : news.importance === "중간"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    중요도: {news.importance}
                  </span>
                </div>
              </div>

              {/* AI 3줄 요약 */}
              <div className="bg-blue-50 rounded-lg p-4 mb-3">
                <div className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs font-bold">
                    AI
                  </div>
                  3줄 요약
                </div>
                <ul className="space-y-1.5">
                  {news.summary.map((line, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold shrink-0">{idx + 1}.</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI 신뢰도 */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">AI 신뢰도:</span>
                <div className="flex-1 max-w-xs h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${news.confidence >= 85
                        ? "bg-green-600"
                        : news.confidence >= 70
                          ? "bg-yellow-600"
                          : "bg-orange-600"
                      }`}
                    style={{ width: `${news.confidence}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900">{news.confidence}%</span>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center">
            <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">해당 조건의 뉴스가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}