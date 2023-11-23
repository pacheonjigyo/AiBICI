import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminLayout } from "../layout/AdminLayout.js";
import { BrandingLayout } from "../layout/BrandingLayout.js";
import { DesignLayout } from "../layout/DesignLayout.js";
import { RootError } from "../layout/error/RootError.js";
import { NormalLayout } from "../layout/NormalLayout.js";
import { SimpleLayout } from "../layout/SimpleLayout.js";

import BrandDetail from "../layout/modal/identityModal/Detail.js";
import { UserLayout } from "../layout/UserLayout.js";
import AdminBoard from "./admin/Board.js";
import AdminBoardCreate from "./admin/BoardCreate.js";
import AdminChallenge from "./admin/Challenge.js";
import AdminEngine from "./admin/Engine.js";
import AdminManagers from "./admin/Managers.js";
import AdminService from "./admin/Service.js";
import AdminUsers from "./admin/Users.js";
import ChatMain from "./ai-branding/create/chat/Main.js";
import ChangeMain from "./ai-branding/create/image/Main.js";
import QuestMain from "./ai-branding/create/quest/Main.js";
import SketchMain from "./ai-branding/create/sketch/Main.js";
import Details from "./branding/information/components/Details.js";
import Information from "./branding/information/Information.js";
import Branding from "./branding/main/Branding.js";
import Identity from "./creator/Brand.js";
import Dashboard from "./creator/Dashboard.js";
import Design from "./creator/Design.js";
import Exchange from "./creator/Exchange.js";
import Inquiry from "./creator/Inquiry.js";
import Settings from "./creator/Settings.js";
import Startup from "./creator/Startup.js";
import Engine from "./engine/Engine.js";
import Home from "./home/Home.js";
import BrandChallenge from "./identity/Challenge.js";
import Intro from "./identity/Intro.js";
import Mockup from "./identity/Mockup.js";
import Preview from "./identity/Preview.js";
import BrandProfile from "./identity/Profile.js";
import Report from "./identity/Report.js";
import BrandSell from "./identity/Sell.js";
import Template from "./identity/Template.js";
import Visual from "./identity/Visual.js";
import Website from "./identity/Website.js";
import VisualDesign from "./library/VisualDesign.js";
import Logo from "./logo/Logo.js";
import Main from "./main/Main.js";
import MarketPlace from "./marketplace/MarketPlace.js";
import Product from "./product/Product.js";
import Samples from "./samples/Samples.js";
import ApplyCopyrighter from "./startup-challenge/apply/copyrighter/Main.js";
import ApplyMarketer from "./startup-challenge/apply/marketer/Main.js";
import ApplyStarter from "./startup-challenge/apply/starter/Main.js";
import ApplyVenture from "./startup-challenge/apply/venture/Main.js";
import Challenge from "./startup-challenge/Challenge.js";
import Funding from "./startup-challenge/components/Funding.js";
import Test from "./test/Test.js";

const Login = lazy(() => import("./auth/Login.js"));
const Privacy = lazy(() => import("./legal/Privacy.js"));
const Terms = lazy(() => import("./legal/Terms.js"));
const AITerms = lazy(() => import("./legal/AITerms.js"));
const License = lazy(() => import("./legal/License.js"));

export const router = createBrowserRouter([
  {
    path: "",
    element: <SimpleLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Main /> },

      { path: "startup-challenge/apply/starter", element: <ApplyStarter /> },
      { path: "startup-challenge/apply/marketer", element: <ApplyMarketer /> },
      {
        path: "startup-challenge/apply/copyrighter",
        element: <ApplyCopyrighter />,
      },
      { path: "startup-challenge/apply/venture", element: <ApplyVenture /> },

      { path: "ai-logo/create", element: <Logo /> },

      { path: "ai-branding/intro", element: <Intro /> },

      { path: "ai-branding/create/chat", element: <ChatMain /> },
      { path: "ai-branding/create/sketch", element: <SketchMain /> },
      { path: "ai-branding/create/quest", element: <QuestMain /> },
      { path: "ai-branding/create/image", element: <ChangeMain /> },

      { path: "login/:type", element: <Login mode="login" /> },
      { path: "signUp", element: <Login mode="signup" /> },
      { path: "resetPassword", element: <Login mode="password" /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "ai-image-terms", element: <AITerms /> },
      { path: "license", element: <License /> },
      { path: "test", element: <Test /> },
      { path: "samples", element: <Samples /> },
      { path: "website/:id", element: <Website /> },
      { path: "preview/:id", element: <Preview /> },

      { path: "ai-branding/create", element: <BrandProfile /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Navigate to="/admin/users" /> },
      // { path: "dashboard", element: <AdminDashboard /> },
      { path: "managers", element: <AdminManagers /> },
      { path: "users", element: <AdminUsers /> },
      { path: "engine", element: <AdminEngine /> },
      { path: "service", element: <AdminService /> },
      { path: "board", element: <AdminBoard /> },
      { path: "board/create", element: <AdminBoardCreate /> },
      { path: "challenge", element: <AdminChallenge /> },
    ],
  },

  {
    path: "creator",
    element: <UserLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Navigate to="/creator/brand" /> },

      // { path: "identity", element: <Identity /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "design", element: <Design /> },
      { path: "brand", element: <Identity /> },
      { path: "exchange", element: <Exchange /> },
      { path: "startup", element: <Startup /> },
      { path: "inquiry", element: <Inquiry /> },
    ],
  },

  {
    path: "design/:id",
    element: <DesignLayout />,
    errorElement: <RootError />,
    children: [
      {
        index: true,
        element: <Navigate to="editor" />,
      },

      { path: "editor", element: <VisualDesign /> },
    ],
  },

  {
    path: "product/:id",
    element: <BrandingLayout />,
    errorElement: <RootError />,
    children: [
      {
        index: true,
        element: <Product />,
      },
    ],
  },

  {
    path: "engine/:id",
    element: <BrandingLayout />,
    errorElement: <RootError />,
    children: [
      {
        index: true,
        element: <Engine />,
      },
    ],
  },

  {
    path: "identity/:id",
    element: <SimpleLayout />,
    errorElement: <RootError />,
    children: [
      {
        index: true,
        element: <Navigate to="/" />,
      },

      // { path: "intro", element: <Introduce /> },

      { path: "detail", element: <BrandDetail /> },
      { path: "editor", element: <Visual /> },
      { path: "mockup", element: <Mockup /> },
      { path: "template", element: <Template /> },
      { path: "report", element: <Report /> },
      { path: "challenge", element: <BrandChallenge /> },
      { path: "sell", element: <BrandSell /> },
    ],
  },

  {
    path: "",
    element: <NormalLayout />,
    errorElement: <RootError />,
    children: [],
  },

  {
    path: "",
    element: <BrandingLayout />,
    errorElement: <RootError />,
    children: [
      { path: "startup-challenge", element: <Challenge /> },

      { path: "ai-branding", element: <Branding /> },
      // { path: "ai-branding/create", element: <CreateIdentity /> },

      { path: "branding/info", element: <Information /> },
      { path: "branding/info/:id", element: <Details /> },

      { path: "marketplace", element: <MarketPlace /> },

      { path: "funding", element: <Funding /> },

      { path: "home", element: <Home /> },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
