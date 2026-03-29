import { useNavigate } from "react-router";
import { User, Mail, Phone, Briefcase, Shield, Star, TrendingUp, Settings, LogOut } from "lucide-react";
import { useUser } from "../../contexts/UserContext";

export function Profile() {
  const navigate = useNavigate();
  const { investorType, updateInvestorType } = useUser();

  const userInfo = {
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    memberSince: "2024년 1월",
  };

  const investmentProfile = {
    experience: "중급",
    riskTolerance: investorType === "conservative" ? "안정형" : investorType === "moderate" ? "중도형" : "적극형",
    investmentGoal: "장기 성장",
    preferredSectors: ["IT/기술", "반도체", "자동차"],
  };

  const investorTypeLabels = {
    conservative: { label: "안정형", desc: "안정적인 수익을 추구하며 배당주 중심 투자" },
    moderate: { label: "중도형", desc: "균형잡힌 리스크와 수익을 추구하는 투자" },
    aggressive: { label: "적극형", desc: "높은 수익을 위해 변동성을 감수하는 투자" },
  };

  const favoriteStocks = [
    { symbol: "005930", name: "삼성전자", price: 85400, change: 1.43 },
    { symbol: "035720", name: "카카오", price: 48500, change: 2.32 },
  ];

  const handleEditProfile = () => {
    navigate("/onboarding");
  };

  const handleLogout = () => {
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 유저 정보 카드 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {userInfo.name[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{userInfo.name}</h2>
                <p className="text-gray-600">가입일: {userInfo.memberSince}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">로그아웃</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">이메일</p>
                <p className="text-sm font-medium">{userInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">전화번호</p>
                <p className="text-sm font-medium">{userInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 투자 성향 카드 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold">투자 성향</h3>
            </div>
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">성향 수정하기</span>
            </button>
          </div>

          {/* 투자 성향 전환 버튼 */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">종목 상세 페이지에서 표시될 지표를 선택하세요</p>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(investorTypeLabels) as Array<keyof typeof investorTypeLabels>).map((type) => (
                <button
                  key={type}
                  onClick={() => updateInvestorType(type)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    investorType === type
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <p className={`font-semibold mb-1 ${investorType === type ? "text-blue-600" : "text-gray-900"}`}>
                    {investorTypeLabels[type].label}
                  </p>
                  <p className="text-xs text-gray-600">{investorTypeLabels[type].desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">AI 분석 결과</p>
                <p className="font-semibold text-gray-900">안정적인 성장형 투자자</p>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              적절한 위험을 감수하면서 장기적인 성장을 추구하는 투자 스타일입니다. 
              분산 투자를 통해 안정성을 유지하며, IT 및 기술 분야에 높은 관심을 보이고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">투자 경험</p>
              <p className="text-lg font-semibold">{investmentProfile.experience}</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">위험 감수 성향</p>
              <p className="text-lg font-semibold">{investmentProfile.riskTolerance}</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">투자 목표</p>
              <p className="text-lg font-semibold">{investmentProfile.investmentGoal}</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">관심 섹터</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {investmentProfile.preferredSectors.map((sector) => (
                  <span
                    key={sector}
                    className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 관심 종목 카드 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <h3 className="text-xl font-bold">관심 종목</h3>
          </div>

          <div className="space-y-3">
            {favoriteStocks.map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => navigate(`/stock/${stock.symbol}`)}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <div>
                    <div className="font-semibold">{stock.name}</div>
                    <div className="text-sm text-gray-500">{stock.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{stock.price.toLocaleString()}원</div>
                  <div
                    className={`flex items-center justify-end gap-1 text-sm font-semibold ${
                      stock.change > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    {stock.change > 0 ? "+" : ""}
                    {stock.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/securities")}
            className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium"
          >
            + 관심 종목 추가하기
          </button>
        </div>

        {/* 설정 카드 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-gray-600" />
            <h3 className="text-xl font-bold">설정</h3>
          </div>

          <div className="space-y-2">
            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <p className="font-medium">알림 설정</p>
              <p className="text-sm text-gray-600">가격 알림, 뉴스 알림 등을 설정합니다</p>
            </button>
            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <p className="font-medium">계좌 연동</p>
              <p className="text-sm text-gray-600">증권 계좌를 연동하여 실시간 거래를 진행합니다</p>
            </button>
            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <p className="font-medium">보안 설정</p>
              <p className="text-sm text-gray-600">비밀번호 변경, 2단계 인증 등을 설정합니다</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}