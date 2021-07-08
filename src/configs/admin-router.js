
import { lazy } from "react"
const adminRouter = [
  {
    path: "/admin",
    exact: true,
    Component: lazy(() => import("../pages/AdminLogin")),
  },
  {
    path: "/admin/usermanager",
    login: true,
    Component: lazy(() => import("../pages/User-Managent")),
  },
  {
    path: "/admin/dashboard",
    exact: true,
    login: true,
    Component: lazy(() => import("../pages/Dashboard")),
  },

];

export default adminRouter;
