import { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles, TrendingUp, BarChart3, AlertCircle } from "lucide-react";
import { useUser } from "../contexts/UserContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  onClose: () => void;
  onQueryResult?: (query: string, result: any) => void;
}

export function AIAssistant({ onClose, onQueryResult }: AIAssistantProps) {
  const { addQuery } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "안녕하세요! AI 투자 어시스턴트입니다. 무엇을 도와드릴까요?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { icon: BarChart3, text: "내 포트폴리오 분석해줘", query: "portfolio" },
    { icon: TrendingUp, text: "오늘 추천 종목", query: "recommend" },
    { icon: AlertCircle, text: "시장 요약", query: "market" },
    { icon: Sparkles, text: "수익률 보여줘", query: "profit" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // 사용자 질문을 UserContext에 추가
    addQuery(messageText);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const response = generateAIResponse(messageText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      // 홈 화면에 결과 반영
      if (onQueryResult && response.type) {
        onQueryResult(response.type, response.data);
      }
    }, 1500);
  };

  const generateAIResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("포트폴리오") || lowerQuery.includes("portfolio")) {
      return {
        type: "portfolio",
        content:
          "현재 포트폴리오 분석 결과를 홈 화면 상단에 표시했습니다.\n\n총 자산: 5,420만원\n수익률: +12.3%\n위험도: 중간 (AI 점수 65)\n\n가장 수익률이 높은 종목은 삼성전자(+18.5%)이며, NAVER는 -5.2%로 손실 중입니다. 분산 투자 비율이 양호합니다.",
        data: { type: "portfolio" },
      };
    } else if (lowerQuery.includes("추천") || lowerQuery.includes("recommend")) {
      return {
        type: "recommend",
        content:
          "오늘의 AI 추천 종목을 홈 화면에 표시했습니다.\n\n1. 카카오 (035720)\n   - AI 신뢰도: 87%\n   - 예상 수익: +8.5%\n   - 근거: 실적 개선, 긍정 뉴스 증가\n\n2. 현대차 (005380)\n   - AI 신뢰도: 82%\n   - 예상 수익: +6.2%\n   - 근거: 수출 증가, 전기차 판매 호조",
        data: { type: "recommend" },
      };
    } else if (lowerQuery.includes("시장") || lowerQuery.includes("market")) {
      return {
        type: "market",
        content:
          "오늘 시장 분석 결과를 홈 화면에 표시했습니다.\n\n📊 KOSPI: 2,680.5 (+0.8%)\n📈 KOSDAQ: 850.2 (+1.2%)\n\n전체 시장 분위기: 긍정적\n거래량: 평균 대비 120%\n외국인: 순매수 지속\n\n주요 상승 업종: IT, 반도체\n하락 업종: 건설, 화학",
        data: { type: "market" },
      };
    } else if (lowerQuery.includes("수익") || lowerQuery.includes("profit")) {
      return {
        type: "profit",
        content:
          "수익률 분석 결과를 홈 화면에 표시했습니다.\n\n오늘 수익: +125,000원 (+2.3%)\n이번 주: +450,000원 (+8.7%)\n이번 달: +1,250,000원 (+30.5%)\n\n최고 수익 종목: 삼성전자 (+850,000원)\n최저 수익 종목: NAVER (-280,000원)\n\n전체적으로 수익률이 시장 평균을 상회하고 있습니다.",
        data: { type: "profit" },
      };
    } else if (lowerQuery.includes("위험") || lowerQuery.includes("risk")) {
      return {
        type: "risk",
        content:
          "포트폴리오 위험도 분석을 홈 화면에 표시했습니다.\n\n전체 위험도: 65 (중간)\n\n주요 리스크:\n⚠️ 변동성 증가 (30일 대비 +15%)\n⚠️ 집중도 높음 (상위 2개 종목 60%)\n✅ 시장 대비 안정적\n\n권장사항: 분산 투자 확대",
        data: { type: "risk" },
      };
    } else {
      return {
        type: null,
        content:
          "질문을 이해했습니다. 아래 주제로 질문해주시면 더 정확한 답변을 드릴 수 있습니다:\n\n- 포트폴리오 분석\n- 종목 추천\n- 시장 동향\n- 수익률 확인\n- 위험도 분석",
        data: null,
      };
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">AI 어시스턴트</h3>
            <p className="text-xs text-gray-500">실시간 분석 중</p>
          </div>
        </div>

        {/* 빠른 질문 버튼 */}
        <div className="grid grid-cols-2 gap-2">
          {quickQuestions.map((q, idx) => {
            const Icon = q.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSend(q.text)}
                className="flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
              >
                <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs text-gray-700 line-clamp-2">{q.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.role === "user" ? "text-blue-100" : "text-gray-400"
                }`}
              >
                {message.timestamp.toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 입력창 */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="질문을 입력하세요..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}