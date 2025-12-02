import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";
import SignIn from "../../features/account/SignIn";
import Dashboard from "../../mainDash/Dashboard";
import AnalystsDashboard from "../../features/analysts/AnalystsDashboard";
import ExpertDashboard from "../../features/experts/ExpertDashboard";
import CampaingsDashboard from "../../features/campaings/CampaingsDashboard";
import HousesDashboard from "../../features/houses/HousesDashboard";
import NotFoundPage from "../../features/erros/NotFoundPage";
import LeadsDashboard from "../../features/leads/LeadsDashboard";
import MyProfile from "../../features/profile/MyProfile";
import ProductsDashboard from "../../features/products/ProductsDashboard";
import ListUsers from "../../features/users/ListUsers";
import ListSales from "../../features/sales/ListSales";
import ListMarketing from "../../features/marketing/ListMarketing";
import ListRanking from "../../features/ranking/ListRanking";
import RankingStandalone from "../../features/ranking/RankingStandalone";
import SellersDashboard from "../../features/sellers/ListSellers";
import DealsPage from "../../features/deals/DealsPage";
import ListCompanies from "../../features/companies/ListCompanies";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "analysts", element: <AnalystsDashboard /> },
          { path: "leads", element: <LeadsDashboard /> },
          { path: "experts", element: <ExpertDashboard /> },
          { path: "sellers", element: <SellersDashboard /> },
          { path: "campaings", element: <CampaingsDashboard /> },
          { path: "bookmakers", element: <HousesDashboard /> },
          { path: "products", element: <ProductsDashboard /> },
          { path: "myprofile", element: <MyProfile /> },
          { path: "users", element: <ListUsers /> },
          { path: "sales", element: <ListSales /> },
          { path: "marketing", element: <ListMarketing /> },
          { path: "ranking", element: <ListRanking /> },
          { path: "deals", element: <DealsPage /> },
          { path: "companies", element: <ListCompanies /> },
        ],
      },
    ],
  },
  { path: "/ranking-externo", element: <RankingStandalone /> },
  { path: "/signin", element: <SignIn /> },
  { path: "*",element: <NotFoundPage />, },
]);
