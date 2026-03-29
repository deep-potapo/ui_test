import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, CheckCircle, TrendingUp } from "lucide-react";

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    experience: "",
    riskTolerance: "",
    investmentGoal: "",
    preferredSector: [] as string[],
  });

  const handleComplete = () => {
    // 투자 성향 분석 완료 후 메인으로 이동
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* 진행 표시 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              {step} / 4 단계
            </span>
            <span className="text-sm font-medium text-blue-600">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">투자 경험</h2>
                  <p className="text-gray-600">귀하의 투자 경험은 어느 정도인가요?</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { value: "beginner", label: "초보", desc: "투자 경험이 거의 없습니다" },
                  { value: "intermediate", label: "중급", desc: "1-3년 정도 투자 경험이 있습니다" },
                  { value: "advanced", label: "고급", desc: "3년 이상의 투자 경험이 있습니다" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, experience: option.value })}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      answers.experience === option.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                      {answers.experience === option.value && (
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">위험 감수 성향</h2>
                  <p className="text-gray-600">투자 손실을 어느 정도 감수할 수 있나요?</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { value: "conservative", label: "보수적", desc: "손실을 최소화하고 싶습니다" },
                  { value: "moderate", label: "중도적", desc: "적당한 수준의 위험은 감수할 수 있습니다" },
                  { value: "aggressive", label: "공격적", desc: "높은 수익을 위해 위험을 감수할 수 있습니다" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, riskTolerance: option.value })}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      answers.riskTolerance === option.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                      {answers.riskTolerance === option.value && (
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">투자 목표</h2>
                  <p className="text-gray-600">주된 투자 목표는 무엇인가요?</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { value: "short-term", label: "단기 수익", desc: "빠른 시일 내 수익 실현" },
                  { value: "long-term", label: "장기 성장", desc: "장기적인 자산 증식" },
                  { value: "dividend", label: "배당 수익", desc: "안정적인 배당 수익" },
                  { value: "balanced", label: "균형", desc: "성장과 안정성의 균형" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, investmentGoal: option.value })}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      answers.investmentGoal === option.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                      {answers.investmentGoal === option.value && (
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">관심 섹터</h2>
                  <p className="text-gray-600">관심 있는 산업 분야를 선택해주세요 (복수 선택 가능)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "IT/기술",
                  "반도체",
                  "바이오/제약",
                  "금융",
                  "자동차",
                  "화학",
                  "엔터테인먼트",
                  "유통",
                ].map((sector) => (
                  <button
                    key={sector}
                    onClick={() => {
                      const newSectors = answers.preferredSector.includes(sector)
                        ? answers.preferredSector.filter((s) => s !== sector)
                        : [...answers.preferredSector, sector];
                      setAnswers({ ...answers, preferredSector: newSectors });
                    }}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      answers.preferredSector.includes(sector)
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{sector}</span>
                      {answers.preferredSector.includes(sector) && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 네비게이션 버튼 */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                이전
              </button>
            )}
            <button
              onClick={() => {
                if (step === 4) {
                  handleComplete();
                } else {
                  setStep(step + 1);
                }
              }}
              disabled={
                (step === 1 && !answers.experience) ||
                (step === 2 && !answers.riskTolerance) ||
                (step === 3 && !answers.investmentGoal) ||
                (step === 4 && answers.preferredSector.length === 0)
              }
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {step === 4 ? "완료" : "다음"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
