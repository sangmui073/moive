
import { lazy } from "react";
const clientRouter = [
  {
    path: "/",
    exact: true,
    home: true,
    Component: lazy(() => import("../pages/Home"))
  },

  {
    path: "/Sig-Up",
    exact: false,
    Component: lazy(() => import("../pages/SignUp"))
  },
  {
    path: "/Sig-In",
    exact: false,
    Component: lazy(() => import("../pages/SigIn"))
  },
  {
    path: "/Booking/:suatChieu",
    exact: false,
    checkLogin: true,
    booking: true,
    Component: lazy(() => import("../pages/Booking"))
  },
  {
    path: "/DetailsMoive/:phim",
    exact: false,
    Component: lazy(() => import("../pages/MoiveDetails"))
  },
  {
    path: "/TheaterDetails/:maRap",
    exact: false,
    Component: lazy(() => import("../pages/TheaterDetails"))
  },
  {
    path: "/User-Profie",
    exact: false,
    checkLogin: true,
    Component: lazy(() => import("../pages/UserProfile"))
  }
];

export default clientRouter;
