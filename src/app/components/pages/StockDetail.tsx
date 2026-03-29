import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, TrendingUp, TrendingDown, Newspaper, ChevronDown, ChevronUp, DollarSign, Activity, BarChart3, Shield } from "lucide-react";
import { RiskBadge } from "../RiskBadge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { OrderPanel } from "../OrderPanel";
import { useUser } from "../../contexts/UserContext";

const mockStocks = {
  "005930": {
    symbol: "005930",
    name: "삼성전자",
    price: 85400,
    change: 1200,
    changeRate: 1.43,
    volume: 15234567,
    marketCap: 5123000000000,
    riskScore: 35,
    holdings: { quantity: 50, avgPrice: 72000 },
    // 추가 투자 지표
    dividend: {
      yield: 2.8,
      frequency: "분기",
      stability: 92,
      history: "10년 연속 배당",
    },
    value: {
      per: 12.5,
      pbr: 1.2,
      roe: 9.8,
      analysis: "업종 평균 대비 저평가",
    },
    growth: {
      revenueGrowth: 8.5,
      profitGrowth: 12.3,
      marketShare: 18.2,
      analysis: "AI 반도체 시장 성장 주도",
    },
    risk: {
      volatility: "중",
      beta: 0.95,
      maxDrawdown: -15.2,
      analysis: "안정적인 대형주",
    },
    technical: {
      ma20: 83200,
      ma60: 81500,
      rsi: 58,
      analysis: "상승 추세 지속 중",
    },
    news: [
      { title: "삼성전자, 신규 반도체 공장 투자 발표", sentiment: "긍정", summary: "삼성전자가 20조원 규모의 신규 반도체 공장 투자를 발표했습니다. AI 반도체 시장 확대에 대응하기 위한 전략으로 평가됩니다.", confidence: 92 },
      { title: "글로벌 반도체 수요 증가 전망", sentiment: "긍정", summary: "반도체 시장 분석 기관들이 내년 반도체 수요가 전년 대비 15% 증가할 것으로 전망했습니다.", confidence: 85 },
    ],
  },
  "035420": {
    symbol: "035420",
    name: "NAVER",
    price: 198500,
    change: -3500,
    changeRate: -1.73,
    volume: 982345,
    marketCap: 3250000000000,
    riskScore: 62,
    holdings: { quantity: 20, avgPrice: 210000 },
    dividend: {
      yield: 0.5,
      frequency: "없음",
      stability: 30,
      history: "배당 정책 미정",
    },
    value: {
      per: 28.5,
      pbr: 2.8,
      roe: 12.5,
      analysis: "성장성 반영한 밸류에이션",
    },
    growth: {
      revenueGrowth: 18.5,
      profitGrowth: 22.8,
      marketShare: 24.5,
      analysis: "AI 및 글로벌 서비스 확장",
    },
    risk: {
      volatility: "높음",
      beta: 1.35,
      maxDrawdown: -28.5,
      analysis: "성장주 특성상 변동성 높음",
    },
    technical: {
      ma20: 202300,
      ma60: 205800,
      rsi: 42,
      analysis: "단기 조정 구간",
    },
    news: [
      { title: "NAVER, AI 기술 개발 확대", sentiment: "긍정", summary: "NAVER가 AI 기술 개발에 대규모 투자를 진행하며 글로벌 시장 진출을 강화하고 있습니다.", confidence: 88 },
      { title: "광고 시장 경쟁 심화 우려", sentiment: "부정", summary: "국내 온라인 광고 시장에서 경쟁이 심화되며 수익성 악화 우려가 제기되고 있습니다.", confidence: 75 },
    ],
  },
  "035720": {
    symbol: "035720",
    name: "카카오",
    price: 48500,
    change: 1100,
    changeRate: 2.32,
    volume: 2134567,
    marketCap: 2100000000000,
    riskScore: 45,
    holdings: null,
    dividend: {
      yield: 0.3,
      frequency: "없음",
      stability: 25,
      history: "배당 정책 없음",
    },
    value: {
      per: 32.8,
      pbr: 3.2,
      roe: 11.2,
      analysis: "플랫폼 가치 반영",
    },
    growth: {
      revenueGrowth: 15.2,
      profitGrowth: 19.5,
      marketShare: 21.8,
      analysis: "커머스·금융 사업 성장",
    },
    risk: {
      volatility: "높음",
      beta: 1.42,
      maxDrawdown: -32.8,
      analysis: "규제 리스크 존재",
    },
    technical: {
      ma20: 47200,
      ma60: 46800,
      rsi: 62,
      analysis: "반등 시도 중",
    },
    news: [
      { title: "카카오, 실적 개선 전망", sentiment: "긍정", summary: "카카오의 다양한 사업 부문에서 실적 개선이 예상되며, 특히 게임과 커머스 분야의 성장이 두드러집니다.", confidence: 90 },
    ],
  },
  "005380": {
    symbol: "005380",
    name: "현대차",
    price: 265000,
    change: 4500,
    changeRate: 1.73,
    volume: 1234567,
    marketCap: 5600000000000,
    riskScore: 52,
    holdings: null,
    dividend: {
      yield: 3.5,
      frequency: "반기",
      stability: 88,
      history: "7년 연속 배당",
    },
    value: {
      per: 8.5,
      pbr: 0.9,
      roe: 11.5,
      analysis: "저평가 구간",
    },
    growth: {
      revenueGrowth: 11.2,
      profitGrowth: 16.8,
      marketShare: 15.2,
      analysis: "전기차 시장 선도",
    },
    risk: {
      volatility: "중",
      beta: 1.05,
      maxDrawdown: -18.5,
      analysis: "업황 사이클 영향",
    },
    technical: {
      ma20: 258000,
      ma60: 252000,
      rsi: 65,
      analysis: "강세 지속",
    },
    news: [
      { title: "현대차, 전기차 판매 호조", sentiment: "긍정", summary: "현대차의 전기차 판매가 전년 대비 40% 증가하며 글로벌 시장에서 입지를 강화하고 있습니다.", confidence: 87 },
    ],
  },
  "051910": {
    symbol: "051910",
    name: "LG화학",
    price: 385000,
    change: -2000,
    changeRate: -0.52,
    volume: 567890,
    marketCap: 2700000000000,
    riskScore: 58,
    holdings: null,
    dividend: {
      yield: 1.8,
      frequency: "반기",
      stability: 75,
      history: "5년 연속 배당",
    },
    value: {
      per: 15.2,
      pbr: 1.5,
      roe: 10.2,
      analysis: "적정 밸류에이션",
    },
    growth: {
      revenueGrowth: 14.5,
      profitGrowth: 18.2,
      marketShare: 22.5,
      analysis: "배터리 시장 확대",
    },
    risk: {
      volatility: "중상",
      beta: 1.15,
      maxDrawdown: -22.5,
      analysis: "원자재 가격 변동 영향",
    },
    technical: {
      ma20: 388000,
      ma60: 392000,
      rsi: 48,
      analysis: "보합 구간",
    },
    news: [
      { title: "LG화학, 배터리 사업 확대", sentiment: "긍정", summary: "LG화학이 북미 지역 배터리 공장 증설을 결정하며 전기차 배터리 시장 선점을 목표로 하고 있습니다.", confidence: 83 },
    ],
  },
};

export function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { displayPreferences } = useUser();
  const [showSimpleChart, setShowSimpleChart] = useState(true);
  const [orderPanelOpen, setOrderPanelOpen] = useState(false);
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");

  const stock = symbol ? mockStocks[symbol as keyof typeof mockStocks] : null;

  if (!stock) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">종목을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-blue-600 hover:underline"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const chartData = generateChartData();

  const handleOrder = (type: "buy" | "sell") => {
    setOrderType(type);
    setOrderPanelOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>돌아가기</span>
        </button>

        {/* 종목 정보 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">{stock.name}</h1>
              <p className="text-gray-500">{stock.symbol}</p>
            </div>
            {stock.holdings && (
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <p className="text-sm text-gray-600">보유 수량</p>
                <p className="text-lg font-semibold text-blue-600">{stock.holdings.quantity}주</p>
              </div>
            )}
          </div>

          <div className="flex items-end gap-4 mb-4">
            <div className="text-4xl font-bold">{stock.price.toLocaleString()}원</div>
            <div
              className={`flex items-center gap-1 text-xl font-semibold ${stock.changeRate > 0 ? "text-green-600" : "text-red-600"
                }`}
            >
              {stock.changeRate > 0 ? (
                <TrendingUp className="w-6 h-6" />
              ) : (
                <TrendingDown className="w-6 h-6" />
              )}
              <span>
                {stock.change > 0 ? "+" : ""}
                {stock.change.toLocaleString()}원 ({stock.changeRate > 0 ? "+" : ""}
                {stock.changeRate}%)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-4">
            <div>
              <p className="text-sm text-gray-600">거래량</p>
              <p className="text-lg font-semibold">{(stock.volume / 1000000).toFixed(2)}M</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">시가총액</p>
              <p className="text-lg font-semibold">
                {(stock.marketCap / 1000000000000).toFixed(2)}조
              </p>
            </div>
          </div>

          <RiskBadge score={stock.riskScore} size="lg" />

          {stock.holdings && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">내 보유 정보</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600">평균 매입가</p>
                  <p className="text-lg font-semibold">
                    {stock.holdings.avgPrice.toLocaleString()}원
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">평가 손익</p>
                  <p
                    className={`text-lg font-semibold ${stock.price > stock.holdings.avgPrice ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {stock.price > stock.holdings.avgPrice ? "+" : ""}
                    {((stock.price - stock.holdings.avgPrice) * stock.holdings.quantity).toLocaleString()}
                    원 (
                    {(
                      ((stock.price - stock.holdings.avgPrice) / stock.holdings.avgPrice) *
                      100
                    ).toFixed(2)}
                    %)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 차트 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">가격 차트</h2>
            <button
              onClick={() => setShowSimpleChart(!showSimpleChart)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              {showSimpleChart ? "상세 차트" : "간단 차트"}
              {showSimpleChart ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className={showSimpleChart ? "h-64" : "h-96"}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis domain={["dataMin - 1000", "dataMax + 1000"]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={stock.changeRate > 0 ? "#10b981" : "#ef4444"}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 동적 투자 지표 - 배당 정보 */}
        {displayPreferences.showDividend && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm border border-green-200 mb-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-green-900">배당 정보</h2>
              <span className="ml-auto px-3 py-1 bg-green-600 text-white text-xs rounded-full">
                AI 추천 지표
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">배당 수익률</p>
                <p className="text-2xl font-bold text-green-600">{stock.dividend.yield}%</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">배당 주기</p>
                <p className="text-lg font-semibold">{stock.dividend.frequency}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">배당 안정성</p>
                <p className="text-lg font-semibold">{stock.dividend.stability}점</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">배당 이력</p>
                <p className="text-sm font-semibold">{stock.dividend.history}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-green-700">
                💡 <strong>AI 분석:</strong> 이 종목은 안정적인 배당 정책을 유지하고 있어 배당 투자자에게 적합합니다.
              </p>
            </div>
          </div>
        )}

        {/* 동적 투자 지표 - 가치 지표 */}
        {displayPreferences.showValue && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm border border-blue-200 mb-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-blue-900">가치 평가 지표</h2>
              <span className="ml-auto px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                AI 추천 지표
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">PER (배)</p>
                <p className="text-2xl font-bold text-blue-600">{stock.value.per}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">PBR (배)</p>
                <p className="text-2xl font-bold text-blue-600">{stock.value.pbr}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">ROE (%)</p>
                <p className="text-2xl font-bold text-blue-600">{stock.value.roe}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 <strong>AI 분석:</strong> {stock.value.analysis}
              </p>
            </div>
          </div>
        )}

        {/* 동적 투자 지표 - 성장성 지표 */}
        {displayPreferences.showGrowth && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm border border-purple-200 mb-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-purple-900">성장성 지표</h2>
              <span className="ml-auto px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
                AI 추천 지표
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">매출 성장률</p>
                <p className="text-2xl font-bold text-purple-600">+{stock.growth.revenueGrowth}%</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">영업이익 성장률</p>
                <p className="text-2xl font-bold text-purple-600">+{stock.growth.profitGrowth}%</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">시장 점유율</p>
                <p className="text-2xl font-bold text-purple-600">{stock.growth.marketShare}%</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-purple-700">
                💡 <strong>AI 분석:</strong> {stock.growth.analysis}
              </p>
            </div>
          </div>
        )}

        {/* 동적 투자 지표 - 위험도 지표 */}
        {displayPreferences.showRisk && (
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-sm border border-orange-200 mb-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold text-orange-900">위험도 분석</h2>
              <span className="ml-auto px-3 py-1 bg-orange-600 text-white text-xs rounded-full">
                AI 추천 지표
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">변동성</p>
                <p className="text-xl font-bold text-orange-600">{stock.risk.volatility}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">베타</p>
                <p className="text-xl font-bold text-orange-600">{stock.risk.beta}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">최대 낙폭</p>
                <p className="text-xl font-bold text-orange-600">{stock.risk.maxDrawdown}%</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-orange-700">
                💡 <strong>AI 분석:</strong> {stock.risk.analysis}
              </p>
            </div>
          </div>
        )}

        {/* 동적 투자 지표 - 기술적 지표 */}
        {displayPreferences.showTechnical && (
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 shadow-sm border border-cyan-200 mb-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-cyan-600" />
              <h2 className="text-xl font-bold text-cyan-900">기술적 분석</h2>
              <span className="ml-auto px-3 py-1 bg-cyan-600 text-white text-xs rounded-full">
                AI 추천 지표
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">20일 이평선</p>
                <p className="text-xl font-bold text-cyan-600">{stock.technical.ma20.toLocaleString()}원</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">60일 이평선</p>
                <p className="text-xl font-bold text-cyan-600">{stock.technical.ma60.toLocaleString()}원</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">RSI</p>
                <p className="text-xl font-bold text-cyan-600">{stock.technical.rsi}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-cyan-700">
                💡 <strong>AI 분석:</strong> {stock.technical.analysis}
              </p>
            </div>
          </div>
        )}

        {/* 뉴스 요약 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Newspaper className="w-5 h-5" />
            관련 뉴스
          </h2>
          <div className="space-y-4">
            {stock.news.map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold flex-1">{item.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${item.sentiment === "긍정"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.sentiment}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.summary}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>AI 신뢰도:</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full max-w-[100px]">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.confidence}%` }}
                    />
                  </div>
                  <span className="font-medium">{item.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 고정 액션 버튼 (하단) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:left-64 lg:right-96 z-20">
        <div className="max-w-7xl mx-auto flex gap-3">
          <button
            onClick={() => handleOrder("buy")}
            className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            매수
          </button>
          <button
            onClick={() => handleOrder("sell")}
            className="flex-1 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!stock.holdings}
          >
            매도
          </button>
        </div>
      </div>

      {/* 주문 패널 */}
      {orderPanelOpen && (
        <OrderPanel
          stock={stock}
          type={orderType}
          onClose={() => setOrderPanelOpen(false)}
        />
      )}
    </div>
  );
}

function generateChartData() {
  const data = [];
  const basePrice = 84000;
  for (let i = 0; i < 30; i++) {
    data.push({
      time: `${9 + Math.floor(i / 6)}:${(i % 6) * 10}`,
      price: basePrice + Math.random() * 3000 - 1500 + i * 40,
    });
  }
  return data;
}