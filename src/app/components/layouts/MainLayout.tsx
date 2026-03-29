import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Bell, Search, User, TrendingUp, Home, Newspaper, UserCircle, Menu, X } from "lucide-react";
import { AIAssistant } from "../AIAssistant";
import { useState } from "react";

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { id: "home", label: "홈", icon: Home, path: "/" },
    { id: "securities", label: "증권", icon: TrendingUp, path: "/securities" },
    { id: "news", label: "뉴스", icon: Newspaper, path: "/news" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleAIQueryResult = (query: string, result: any) => {
    // AI 쿼리 결과를 홈 화면으로 전달
    if (location.pathname !== "/") {
      navigate("/");
    }
    // CustomEvent로 전달
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("aiQuery", {
          detail: { query, data: result },
        })
      );
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 상단바 - 전체 너비 */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 h-16 z-40">
        <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setShowMobileNav(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* 좌측: 로고와 사이트명 (검색 비활성화 시) */}
          {!showSearch && (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold hidden sm:block">AI증권</span>
            </div>
          )}

          {/* 검색창 (활성화 시 좌측에서 확장) */}
          {showSearch && (
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="종목명, 뉴스 검색..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
              </div>
            </div>
          )}

          {/* 우측 액션 */}
          <div className="flex items-center gap-2">
            {/* 검색 아이콘 */}
            {!showSearch && (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            )}

            {/* 알림 */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* 왼쪽 네비게이션 패널 */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed left-0 top-16 h-[calc(100vh-4rem)] z-30">
        {/* 네비게이션 메뉴 */}
        <nav className="flex-1 p-4 pt-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setShowMobileNav(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* 하단 프로필 정보 */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate("/profile")}
            className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              🙂
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm text-gray-900">홍길동</div>
              <div className="text-xs text-gray-500">적극형 투자자</div>
            </div>
          </button>
        </div>
      </aside>

      {/* 모바일 네비게이션 */}
      {showMobileNav && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileNav(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl flex flex-col">
            {/* 로고 */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">AI증권</span>
              </div>
              <button
                onClick={() => setShowMobileNav(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.path);
                        setShowMobileNav(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* 하단 사용자 정보 */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  navigate("/profile");
                  setShowMobileNav(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  홍
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-sm">홍길동</div>
                  <div className="text-xs text-gray-500">프로필 보기</div>
                </div>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 메인 컨테이너 */}
      <div className="flex-1 lg:ml-64 lg:mr-96 flex flex-col mt-16">
        {/* 메인 콘텐츠 */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* 오른쪽 AI 어시스턴트 패널 */}
      <aside className="hidden lg:block fixed right-0 top-16 w-96 h-[calc(100vh-4rem)] border-l border-gray-200 bg-white z-30">
        <AIAssistant onClose={() => { }} onQueryResult={handleAIQueryResult} />
      </aside>

      {/* 모바일 AI 버튼 */}
      <button
        onClick={() => {
          // 모바일에서는 모달로 AI 어시스턴트 열기
          alert("모바일 AI 어시스턴트 (구현 예정)");
        }}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-40"
      >
        <TrendingUp className="w-6 h-6" />
      </button>
    </div>
  );
}