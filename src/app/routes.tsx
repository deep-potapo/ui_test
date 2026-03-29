import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayout";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import { Onboarding } from "./components/pages/Onboarding";
import { Home } from "./components/pages/Home";
import { Securities } from "./components/pages/Securities";
import { News } from "./components/pages/News";
import { Profile } from "./components/pages/Profile";
import { StockDetail } from "./components/pages/StockDetail";
import { NotFound } from "./components/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "securities", Component: Securities },
      { path: "news", Component: News },
      { path: "profile", Component: Profile },
      { path: "stock/:symbol", Component: StockDetail },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
