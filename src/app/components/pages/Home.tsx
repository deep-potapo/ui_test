import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart3, Newspaper, AlertTriangle, Target, PieChart, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RiskBadge } from "../RiskBadge";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DynamicCard {
  id: string;
  type: "ai-insight" | "portfolio" | "profit" | "recommend" | "market" | "risk" | "holdings" | "news";
  priority: number;
  title: string;
  content: any;
}

export function Home() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<DynamicCard[]>([]);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);

  // 기본 카드 설정
  useEffect(() => {
    setCards([
      {
        id: "ai-insight",
        type: "ai-insight",
        priority: 1,
        title: "AI 인사이트",
        content: {
          message: "AI 어시스턴트에게 질문하면 여기에 결과가 표시됩니다.",
          icon: Activity,
        },
      },
      {
        id: "portfolio",
        type: "portfolio",
        priority: 2,
        title: "보유 자산",
        content: {
          total: 54200000,
          profit: 5920000,
          profitRate: 12.3,
        },
      },
      {
        id: "profit",
        type: "profit",
        priority: 3,
        title: "오늘 수익",
        content: {
          today: 125000,
          todayRate: 2.3,
          chart: generateMockChartData(7),
        },
      },
      {
        id: "recommend",
        type: "recommend",
        priority: 4,
        title: "AI 추천 종목",
        content: {
          stocks: [
            { symbol: "035720", name: "카카오", price: 48500, change: 2.3, aiScore: 87, risk: 45 },
            { symbol: "005380", name: "현대차", price: 265000, change: 1.8, aiScore: 82, risk: 52 },
            { symbol: "051910", name: "LG화학", price: 385000, change: -0.5, aiScore: 78, risk: 73 },
          ],
        },
      },
      {
        id: "holdings",
        type: "holdings",
        priority: 5,
        title: "보유 종목",
        content: {
          stocks: [
            { symbol: "005930", name: "삼성전자", quantity: 50, avgPrice: 72000, currentPrice: 85400, profit: 670000, profitRate: 18.5, risk: 35 },
            { symbol: "035420", name: "NAVER", quantity: 20, avgPrice: 210000, currentPrice: 198500, profit: -230000, profitRate: -5.2, risk: 62 },
          ],
        },
      },
      {
        id: "market",
        type: "market",
        priority: 6,
        title: "시장 동향",
        content: {
          kospi: { value: 2680.5, change: 0.8 },
          kosdaq: { value: 850.2, change: 1.2 },
          sentiment: "긍정적",
        },
      },
      {
        id: "news",
        type: "news",
        priority: 7,
        title: "주요 뉴스",
        content: {
          items: [
            { title: "삼성전자, 신규 반도체 공장 투자 발표", sentiment: "긍정", relatedStock: "삼성전자" },
            { title: "NAVER, AI 기술 개발 확대", sentiment: "긍정", relatedStock: "NAVER" },
          ],
        },
      },
    ]);
  }, []);

  // AI 어시스턴트로부터 쿼리 결과 받기
  useEffect(() => {
    const handleAIQuery = (event: CustomEvent) => {
      const { query, data } = event.detail;
      setActiveQuery(query);
      reorderCards(query);
    };

    window.addEventListener("aiQuery" as any, handleAIQuery);
    return () => window.removeEventListener("aiQuery" as any, handleAIQuery);
  }, []);

  const reorderCards = (query: string) => {
    setCards((prev) => {
      const newCards = [...prev];

      switch (query) {
        case "portfolio":
          // 포트폴리오 관련 카드를 상단으로
          newCards.sort((a, b) => {
            if (a.type === "portfolio" || a.type === "holdings") return -1;
            if (b.type === "portfolio" || b.type === "holdings") return 1;
            return a.priority - b.priority;
          });
          // AI 인사이트 업데이트
          const portfolioCard = newCards.find(c => c.id === "ai-insight");
          if (portfolioCard) {
            portfolioCard.content = {
              message: "현재 포트폴리오는 전반적으로 양호합니다. 총 자산 5,420만원에 수익률 +12.3%를 기록 중입니다.",
              highlight: "삼성전자가 가장 높은 수익률(+18.5%)을 보이고 있으며, NAVER는 -5.2%로 조정이 필요할 수 있습니다.",
              icon: PieChart,
            };
          }
          break;

        case "recommend":
          newCards.sort((a, b) => {
            if (a.type === "recommend") return -1;
            if (b.type === "recommend") return 1;
            return a.priority - b.priority;
          });
          const recommendCard = newCards.find(c => c.id === "ai-insight");
          if (recommendCard) {
            recommendCard.content = {
              message: "오늘의 AI 추천 종목 3개를 선정했습니다.",
              highlight: "카카오의 AI 신뢰도가 87%로 가장 높으며, 실적 개선과 긍정적인 뉴스가 많습니다.",
              icon: Target,
            };
          }
          break;

        case "market":
          newCards.sort((a, b) => {
            if (a.type === "market" || a.type === "news") return -1;
            if (b.type === "market" || b.type === "news") return 1;
            return a.priority - b.priority;
          });
          const marketCard = newCards.find(c => c.id === "ai-insight");
          if (marketCard) {
            marketCard.content = {
              message: "오늘 시장은 전반적으로 긍정적입니다.",
              highlight: "KOSPI +0.8%, KOSDAQ +1.2% 상승. 외국인 순매수가 지속되고 있으며 IT 및 반도체 업종이 강세입니다.",
              icon: BarChart3,
            };
          }
          break;

        case "profit":
          newCards.sort((a, b) => {
            if (a.type === "profit" || a.type === "portfolio") return -1;
            if (b.type === "profit" || b.type === "portfolio") return 1;
            return a.priority - b.priority;
          });
          const profitCard = newCards.find(c => c.id === "ai-insight");
          if (profitCard) {
            profitCard.content = {
              message: "수익률이 시장 평균을 크게 상회하고 있습니다.",
              highlight: "오늘 +125,000원(+2.3%), 이번 달 +1,250,000원(+30.5%) 수익을 기록했습니다.",
              icon: TrendingUp,
            };
          }
          break;

        case "risk":
          newCards.sort((a, b) => {
            if (a.type === "risk" || a.type === "holdings") return -1;
            if (b.type === "risk" || b.type === "holdings") return 1;
            return a.priority - b.priority;
          });
          const riskCard = newCards.find(c => c.id === "ai-insight");
          if (riskCard) {
            riskCard.content = {
              message: "포트폴리오 위험도는 중간(65) 수준입니다.",
              highlight: "변동성이 증가하고 있으며, 상위 2개 종목에 60%가 집중되어 있어 분산 투자를 권장합니다.",
              icon: AlertTriangle,
            };
          }
          break;
      }

      return newCards;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 동적 카드 영역 */}
        <AnimatePresence mode="popLayout">
          <div className="space-y-6">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {renderCard(card, navigate)}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function renderCard(card: DynamicCard, navigate: any) {
  switch (card.type) {
    case "ai-insight":
      const Icon = card.content.icon;
      return (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">{card.title}</h2>
              <p className="text-lg text-blue-100 mb-2">{card.content.message}</p>
              {card.content.highlight && (
                <p className="text-base text-white font-medium bg-white/10 rounded-lg p-3 mt-3">
                  {card.content.highlight}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    case "portfolio":
      return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold">
                {card.content.total.toLocaleString()}원
              </div>
              <div className="flex items-center gap-2 mt-2">
                {card.content.profitRate > 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
                <span
                  className={`text-lg font-semibold ${card.content.profitRate > 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {card.content.profit > 0 ? "+" : ""}
                  {card.content.profit.toLocaleString()}원 ({card.content.profitRate > 0 ? "+" : ""}
                  {card.content.profitRate}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case "profit":
      return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className={`text-2xl font-bold ${card.content.todayRate > 0 ? "text-green-600" : "text-red-600"
                  }`}
              >
                {card.content.today > 0 ? "+" : ""}
                {card.content.today.toLocaleString()}원
              </div>
              <span
                className={`text-lg ${card.content.todayRate > 0 ? "text-green-600" : "text-red-600"
                  }`}
              >
                ({card.content.todayRate > 0 ? "+" : ""}
                {card.content.todayRate}%)
              </span>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={card.content.chart}>
                  <defs>
                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#profitGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );

    case "recommend":
      return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
          <div className="space-y-3">
            {card.content.stocks.map((stock: any) => (
              <div
                key={stock.symbol}
                onClick={() => navigate(`/stock/${stock.symbol}`)}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold">{stock.name}</div>
                    <div className="text-sm text-gray-500">{stock.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{stock.price.toLocaleString()}원</div>
                    <div
                      className={`text-sm ${stock.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {stock.change > 0 ? "+" : ""}
                      {stock.change}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-600 font-medium">
                    AI 신뢰도: {stock.aiScore}%
                  </div>
                  <RiskBadge score={stock.risk} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "holdings":
      return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
          <div className="space-y-3">
            {card.content.stocks.map((stock: any) => (
              <div
                key={stock.symbol}
                onClick={() => navigate(`/stock/${stock.symbol}`)}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold">{stock.name}</div>
                    <div className="text-sm text-gray-500">
                      {stock.quantity}주 보유 · 평균 {stock.avgPrice.toLocaleString()}원
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{stock.currentPrice.toLocaleString()}원</div>
                    <div
                      className={`text-sm font-semibold ${stock.profitRate > 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {stock.profit > 0 ? "+" : ""}
                      {stock.profit.toLocaleString()}원 ({stock.profitRate > 0 ? "+" : ""}
                      {stock.profitRate}%)
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <RiskBadge score={stock.risk} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "market":
      return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">KOSPI</div>
              <div className="text-2xl font-bold">{card.content.kospi.value.toFixed(2)}</div>
              <div
                className={`text-sm font-semibold ${card.content.kospi.change > 0 ? "text-green-600" : "text-red-600"
                  }`}
              >
                {card.content.kospi.change > 0 ? "+" : ""}
                {card.content.kospi.change}%
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">KOSDAQ</div>
              <div className="text-2xl font-bold">{card.content.kosdaq.value.toFixed(2)}</div>
              <div
                className={`text-sm font-semibold ${card.content.kosdaq.change > 0 ? "text-green-600" : "text-red-600"
                  }`}
              >
                {card.content.kosdaq.change > 0 ? "+" : ""}
                {card.content.kosdaq.change}%
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-700">
              시장 분위기: <span className="font-semibold text-blue-600">{card.content.sentiment}</span>
            </div>
          </div>
        </div>
      );

    case "news":
      return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <button
              onClick={() => navigate("/news")}
              className="text-sm text-blue-600 hover:underline"
            >
              더보기
            </button>
          </div>
          <div className="space-y-3">
            {card.content.items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-medium mb-1">{item.title}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-blue-600">{item.relatedStock}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${item.sentiment === "긍정"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {item.sentiment}
                      </span>
                    </div>
                  </div>
                  <Newspaper className="w-5 h-5 text-gray-400 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

function generateMockChartData(days: number) {
  const data = [];
  const baseValue = 50000000;
  for (let i = 0; i < days; i++) {
    data.push({
      date: `3/${22 + i}`,
      value: baseValue + Math.random() * 3000000 + i * 180000,
    });
  }
  return data;
}