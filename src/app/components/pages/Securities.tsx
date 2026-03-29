import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, TrendingUp, TrendingDown, Star, Globe, ChevronDown } from "lucide-react";
import { RiskBadge } from "../RiskBadge";
import * as Tabs from "@radix-ui/react-tabs";

const popularStocks = [
  { symbol: "005930", name: "삼성전자", price: 85400, change: 1.43, volume: 15234567, risk: 35 },
  { symbol: "000660", name: "SK하이닉스", price: 142000, change: 2.15, volume: 8234567, risk: 18 },
  { symbol: "035420", name: "NAVER", price: 198500, change: -1.73, volume: 982345, risk: 62 },
  { symbol: "035720", name: "카카오", price: 48500, change: 2.32, volume: 2134567, risk: 45 },
  { symbol: "051910", name: "LG화학", price: 385000, change: -0.52, volume: 567890, risk: 73 },
  { symbol: "005380", name: "현대차", price: 265000, change: 1.73, volume: 1234567, risk: 52 },
];

const themeStocks = {
  "AI/반도체": [
    { symbol: "005930", name: "삼성전자", price: 85400, change: 1.43, risk: 35 },
    { symbol: "000660", name: "SK하이닉스", price: 142000, change: 2.15, risk: 18 },
  ],
  "전기차/배터리": [
    { symbol: "051910", name: "LG화학", price: 385000, change: -0.52, risk: 73 },
    { symbol: "005380", name: "현대차", price: 265000, change: 1.73, risk: 52 },
  ],
  "플랫폼/IT": [
    { symbol: "035420", name: "NAVER", price: 198500, change: -1.73, risk: 62 },
    { symbol: "035720", name: "카카오", price: 48500, change: 2.32, risk: 45 },
  ],
};

const favoriteStocks = [
  { symbol: "005930", name: "삼성전자", price: 85400, change: 1.43, risk: 35 },
  { symbol: "035720", name: "카카오", price: 48500, change: 2.32, risk: 45 },
];

const rankingStocks = {
  rising: [
    { rank: 1, symbol: "035720", name: "카카오", price: 48500, change: 2.32, risk: 45 },
    { rank: 2, symbol: "000660", name: "SK하이닉스", price: 142000, change: 2.15, risk: 18 },
    { rank: 3, symbol: "005380", name: "현대차", price: 265000, change: 1.73, risk: 52 },
  ],
  falling: [
    { rank: 1, symbol: "035420", name: "NAVER", price: 198500, change: -1.73, risk: 62 },
    { rank: 2, symbol: "051910", name: "LG화학", price: 385000, change: -0.52, risk: 73 },
  ],
};

export function Securities() {
  const navigate = useNavigate();
  const [market, setMarket] = useState<"domestic" | "global">("domestic");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string>("AI/반도체");
  const [sortBy, setSortBy] = useState<"popular" | "volume" | "change">("popular");

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 국내/해외 전환 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setMarket("domestic")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${market === "domestic"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              국내 증권
            </button>
            <button
              onClick={() => setMarket("global")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${market === "global"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              <Globe className="w-4 h-4" />
              해외 증권
            </button>
          </div>

          {/* 정렬 */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="popular">인기순</option>
              <option value="volume">거래량순</option>
              <option value="change">등락률순</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* 검색 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="종목명, 코드 검색..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 탭 섹션 */}
        <Tabs.Root defaultValue="popular" className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <Tabs.List className="flex border-b border-gray-200">
            <Tabs.Trigger
              value="popular"
              className="flex-1 px-4 py-3 font-semibold text-gray-600 hover:text-gray-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors"
            >
              인기 종목
            </Tabs.Trigger>
            <Tabs.Trigger
              value="theme"
              className="flex-1 px-4 py-3 font-semibold text-gray-600 hover:text-gray-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors"
            >
              테마별
            </Tabs.Trigger>
            <Tabs.Trigger
              value="favorite"
              className="flex-1 px-4 py-3 font-semibold text-gray-600 hover:text-gray-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors"
            >
              관심 종목
            </Tabs.Trigger>
            <Tabs.Trigger
              value="ranking"
              className="flex-1 px-4 py-3 font-semibold text-gray-600 hover:text-gray-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors"
            >
              등락 순위
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="popular" className="p-4">
            <div className="space-y-2">
              {popularStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  onClick={() => navigate(`/stock/${stock.symbol}`)}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{stock.name}</div>
                    <div className="text-sm text-gray-500">{stock.symbol}</div>
                    <div className="mt-2">
                      <RiskBadge score={stock.risk} size="sm" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{stock.price.toLocaleString()}원</div>
                    <div
                      className={`flex items-center justify-end gap-1 text-sm font-semibold ${stock.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {stock.change > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {stock.change > 0 ? "+" : ""}
                      {stock.change}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      거래량 {(stock.volume / 1000000).toFixed(2)}M
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="theme" className="p-4">
            <div className="mb-4 flex gap-2 flex-wrap">
              {Object.keys(themeStocks).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedTheme === theme
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {theme}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {themeStocks[selectedTheme as keyof typeof themeStocks].map((stock) => (
                <div
                  key={stock.symbol}
                  onClick={() => navigate(`/stock/${stock.symbol}`)}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{stock.name}</div>
                    <div className="text-sm text-gray-500">{stock.symbol}</div>
                    <div className="mt-2">
                      <RiskBadge score={stock.risk} size="sm" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{stock.price.toLocaleString()}원</div>
                    <div
                      className={`flex items-center justify-end gap-1 text-sm font-semibold ${stock.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {stock.change > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {stock.change > 0 ? "+" : ""}
                      {stock.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="favorite" className="p-4">
            <div className="space-y-2">
              {favoriteStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  onClick={() => navigate(`/stock/${stock.symbol}`)}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <div>
                      <div className="font-semibold mb-1">{stock.name}</div>
                      <div className="text-sm text-gray-500">{stock.symbol}</div>
                      <div className="mt-2">
                        <RiskBadge score={stock.risk} size="sm" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{stock.price.toLocaleString()}원</div>
                    <div
                      className={`flex items-center justify-end gap-1 text-sm font-semibold ${stock.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {stock.change > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {stock.change > 0 ? "+" : ""}
                      {stock.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="ranking" className="p-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                  상승률 상위
                </h3>
                <div className="space-y-2">
                  {rankingStocks.rising.map((stock) => (
                    <div
                      key={stock.symbol}
                      onClick={() => navigate(`/stock/${stock.symbol}`)}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                          {stock.rank}
                        </div>
                        <div>
                          <div className="font-semibold mb-1">{stock.name}</div>
                          <div className="text-sm text-gray-500">{stock.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{stock.price.toLocaleString()}원</div>
                        <div className="flex items-center justify-end gap-1 text-sm font-semibold text-green-600">
                          <TrendingUp className="w-4 h-4" />+{stock.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-red-600">
                  <TrendingDown className="w-5 h-5" />
                  하락률 상위
                </h3>
                <div className="space-y-2">
                  {rankingStocks.falling.map((stock) => (
                    <div
                      key={stock.symbol}
                      onClick={() => navigate(`/stock/${stock.symbol}`)}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                          {stock.rank}
                        </div>
                        <div>
                          <div className="font-semibold mb-1">{stock.name}</div>
                          <div className="text-sm text-gray-500">{stock.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{stock.price.toLocaleString()}원</div>
                        <div className="flex items-center justify-end gap-1 text-sm font-semibold text-red-600">
                          <TrendingDown className="w-4 h-4" />
                          {stock.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}