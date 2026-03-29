import {
  ShieldCheck,
  Shield,
  AlertCircle,
  ShieldAlert,
  ShieldX
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

interface RiskBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

export function RiskBadge({ score, size = "md", showTooltip = true }: RiskBadgeProps) {
  const getRiskLevel = (score: number) => {
    if (score < 20) return {
      label: "매우 낮음",
      color: "emerald",
      icon: ShieldCheck,
      bgGradient: "from-emerald-50 to-green-50",
      textColor: "text-emerald-800",
      borderColor: "border-emerald-300",
      iconColor: "text-emerald-600"
    };
    if (score < 40) return {
      label: "낮음",
      color: "green",
      icon: Shield,
      bgGradient: "from-green-50 to-lime-50",
      textColor: "text-green-800",
      borderColor: "border-green-300",
      iconColor: "text-green-600"
    };
    if (score < 60) return {
      label: "보통",
      color: "yellow",
      icon: AlertCircle,
      bgGradient: "from-yellow-50 to-amber-50",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-300",
      iconColor: "text-yellow-600"
    };
    if (score < 80) return {
      label: "높음",
      color: "orange",
      icon: ShieldAlert,
      bgGradient: "from-orange-50 to-red-50",
      textColor: "text-orange-800",
      borderColor: "border-orange-300",
      iconColor: "text-orange-600"
    };
    return {
      label: "매우 높음",
      color: "red",
      icon: ShieldX,
      bgGradient: "from-red-50 to-rose-50",
      textColor: "text-red-800",
      borderColor: "border-red-400",
      iconColor: "text-red-600"
    };
  };

  const risk = getRiskLevel(score);
  const RiskIcon = risk.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const tooltipContent = (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <RiskIcon className={`w-5 h-5 ${risk.iconColor}`} />
        <div className="font-semibold text-sm">AI 위험도 분석</div>
      </div>

      {/* 위험도 레벨 시각화 */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">위험도 등급</span>
          <span className={`font-bold ${risk.iconColor}`}>{risk.label}</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${score < 20 ? 'from-emerald-500 to-green-500' : score < 40 ? 'from-green-500 to-lime-500' : score < 60 ? 'from-yellow-500 to-amber-500' : score < 80 ? 'from-orange-500 to-red-500' : 'from-red-500 to-rose-500'} transition-all duration-500`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* 세부 지표 */}
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">변동성:</span>
          <span className={score > 70 ? "text-red-400 font-semibold" : score > 40 ? "text-yellow-400" : "text-green-400"}>
            {score > 70 ? "매우 높음 ⚠️" : score > 60 ? "높음" : score > 40 ? "보통" : score > 20 ? "낮음" : "매우 낮음"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">거래량 변화:</span>
          <span className={score > 70 ? "text-red-400" : score > 40 ? "text-yellow-400" : "text-green-400"}>
            {score > 70 ? "+45%" : score > 60 ? "+35%" : score > 40 ? "+20%" : score > 20 ? "+12%" : "+5%"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">뉴스 감성:</span>
          <span className={score > 70 ? "text-red-400" : score > 50 ? "text-yellow-400" : "text-green-400"}>
            {score > 70 ? "매우 부정" : score > 50 ? "부정" : score > 30 ? "중립" : "긍정"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">시장 대비 리스크:</span>
          <span className={score > 75 ? "text-red-400" : score > 50 ? "text-yellow-400" : "text-green-400"}>
            {score > 75 ? "매우 높음" : score > 65 ? "높음" : score > 40 ? "보통" : "낮음"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">가격 변동폭:</span>
          <span className={score > 70 ? "text-red-400" : score > 40 ? "text-yellow-400" : "text-green-400"}>
            ±{score > 70 ? "8%" : score > 60 ? "6%" : score > 40 ? "4%" : score > 20 ? "2%" : "1%"}
          </span>
        </div>
      </div>

      {/* AI 조언 */}
      <div className={`text-xs p-2 rounded ${score > 70 ? 'bg-red-900/30 border-l-2 border-red-500' : score > 50 ? 'bg-yellow-900/30 border-l-2 border-yellow-500' : 'bg-green-900/30 border-l-2 border-green-500'}`}>
        <span className="text-gray-300">
          {score > 80 ? "⚠️ 매우 높은 위험도입니다. 신중한 투자가 필요합니다." :
            score > 60 ? "⚡ 변동성이 큽니다. 분산 투자를 고려하세요." :
              score > 40 ? "📊 보통 수준의 위험도입니다." :
                score > 20 ? "✅ 안정적인 종목입니다." :
                  "🛡️ 매우 안정적인 투자처입니다."}
        </span>
      </div>

      <div className="text-xs text-gray-400 pt-2 border-t border-gray-700">
        AI가 다양한 지표를 실시간으로 분석하여 산출한 위험도입니다.
      </div>
    </div>
  );

  const badge = (
    <div
      className={`inline-flex items-center gap-2 rounded-full border-2 font-semibold transition-all hover:scale-105 hover:shadow-md bg-gradient-to-r ${risk.bgGradient} ${risk.borderColor} ${risk.textColor} ${sizeClasses[size]}`}
    >
      <RiskIcon className={`${size === "sm" ? "w-3.5 h-3.5" : size === "md" ? "w-4 h-4" : "w-5 h-5"} ${risk.iconColor} shrink-0`} />
      <div className="flex items-center gap-1.5">
        <span className="font-bold">{score}</span>
        <span className="opacity-80 font-medium">({risk.label})</span>
      </div>
      {showTooltip && <AlertCircle className={`${size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} opacity-50`} />}
    </div>
  );

  if (!showTooltip) return badge;

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="inline-block cursor-help">{badge}</div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-900 text-white rounded-lg p-3 shadow-xl max-w-xs z-50"
            sideOffset={5}
          >
            {tooltipContent}
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}