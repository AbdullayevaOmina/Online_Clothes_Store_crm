import React from "react";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PeopleIcon from "@mui/icons-material/People";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CategoryIcon from "@mui/icons-material/Category";

interface Route {
  path: string;
  content: string;
  icon: React.ReactElement;
}

const routes: Route[] = [
  {
    path: "/main",
    content: "Dashboard",
    icon: <DashboardCustomizeRoundedIcon />,
  },
  {
    path: "/main/products",
    content: "Products",
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    path: "/main/workers",
    content: "Workers",
    icon: <EngineeringIcon />,
  },
  {
    path: "/main/users",
    content: "Users",
    icon: <PeopleIcon />,
  },
  {
    path: "/main/categories",
    content: "Categories",
    icon: <CategoryIcon />,
  },
];

export default routes;
