import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// Routes
import { PATH_DASHBOARD } from "src/routes/paths";
// Layouts
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// Guards
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
// Components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // {
    //   path: "xac-thuc",
    //   children: [
    //     {
    //       path: "dang-nhap",
    //       element: (
    //         <GuestGuard>
    //           <Login />
    //         </GuestGuard>
    //       ),
    //     },
    //   ],
    // },

    // Dashboard Routes
    {
      path: "dashboard",
      element: (
        // <AuthGuard>
        <DashboardLayout />
        // </AuthGuard>
      ),
      children: [
        {
          element: (
            <Navigate to={PATH_DASHBOARD.thongKeVaXacSuat.root} replace />
          ),
          index: true,
        },
        {
          path: "thong-ke-va-xac-suat",
          children: [
            {
              element: (
                <Navigate
                  to={PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.root}
                  replace
                />
              ),
              index: true,
            },
            {
              path: "bieu-do",
              children: [
                {
                  element: (
                    <Navigate
                      to={PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.bieuDoTranh}
                      replace
                    />
                  ),
                  index: true,
                },
                {
                  path: "bieu-do-tranh",
                  element: <BieuDoTranh />,
                },
                {
                  path: "bieu-do-cot",
                  element: <BieuDoCot />,
                },
                {
                  path: "bieu-do-cotkep",
                  element: <BieuDoCotKep />,
                },
                {
                  path: "bieu-do-doan-thang",
                  element: <BieuDoDoanThang />,
                },
                {
                  path: "bieu-do-quat",
                  element: <BieuDoQuat />,
                },
              ],
            },
            {
              path: "xac-suat",
              children: [
                {
                  element: (
                    <Navigate
                      to={PATH_DASHBOARD.thongKeVaXacSuat.xacSuat.tinhToanChung}
                      replace
                    />
                  ),
                  index: true,
                },
                {
                  path: "tinh-toan-chung",
                  element: <TinhToanChung />,
                },
                {
                  path: "phan-phoi-nhi-thuc",
                  element: <PhanPhoiNhithuc />,
                },
              ],
            },
            {
              path: "thong-ke",
              children: [
                {
                  element: (
                    <Navigate
                      to={
                        PATH_DASHBOARD.thongKeVaXacSuat.thongKe
                          .bangKhongGhepNhom
                      }
                      replace
                    />
                  ),
                  index: true,
                },
                {
                  path: "bang-khong-ghep-nhom",
                  element: <BangKhongGhepNhom />,
                },
                { path: "bang-ghep-nhom", element: <BangGhepNhom /> },
              ],
            },
          ],
        },
        // {
        //   path: "dai-so-va-giai-tich",
        //   children: [
        //     {
        //       element: (
        //         <Navigate
        //           to={PATH_DASHBOARD.daiSoVaGiaiTich.doThiHamSo}
        //           replace
        //         />
        //       ),
        //       index: true,
        //     },
        //     {
        //       path: "do-thi-ham-so",
        //       element: <DoThiHamSo />,
        //     },
        //   ],
        // },
        // {
        //   path: "hinh-hoc-va-do-luong",
        //   children: [
        //     {
        //       element: (
        //         <Navigate
        //           to={PATH_DASHBOARD.hinhHocVaDoLuong.hinhHocMatPhang}
        //           replace
        //         />
        //       ),
        //       index: true,
        //     },
        //     {
        //       path: "hinh-hoc-mat-phang",
        //       element: <HinhHocMatPhang />,
        //     },
        //     {
        //       path: "hinh-hoc-khong-gian",
        //       element: <HinhHocKhongGian />,
        //     },
        //   ],
        // },
      ],
    },

    // Main Routes
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "500", element: <Page500 /> },
        { path: "404", element: <Page404 /> },
        { path: "403", element: <Page403 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import("../pages/auth/Login")));

// THỐNG KÊ VÀ XÁC SUẤT
const BieuDoTranh = Loadable(
  lazy(() =>
    import(
      "../pages/dashboard/thong-ke-va-xac-suat/bieu-do/pictogram/ChartPictogram"
    )
  )
);
const BieuDoCot = Loadable(
  lazy(() =>
    import("../pages/dashboard/thong-ke-va-xac-suat/bieu-do/bieu-do-cot")
  )
);
const BieuDoCotKep = Loadable(
  lazy(() =>
    import("../pages/dashboard/thong-ke-va-xac-suat/bieu-do/bieu-do-cotkep")
  )
);
const BieuDoDoanThang = Loadable(
  lazy(() =>
    import("../pages/dashboard/thong-ke-va-xac-suat/bieu-do/bieu-do-doan-thang")
  )
);
const BieuDoQuat = Loadable(
  lazy(() =>
    import("../pages/dashboard/thong-ke-va-xac-suat/bieu-do/bieu-do-quat")
  )
);

const TinhToanChung = Loadable(
  lazy(() =>
    import("../pages/dashboard/thong-ke-va-xac-suat/xac-suat/tinh-toan-chung")
  )
);
const PhanPhoiNhithuc = Loadable(
  lazy(() =>
    import("../pages/dashboard/thong-ke-va-xac-suat/xac-suat/PhanPhoiNhiThuc")
  )
);

const BangKhongGhepNhom = Loadable(
  lazy(() =>
    import("../pages/dashboard/thong-ke-va-xac-suat/thong-ke/BangKhongGhepNhom")
  )
);
const BangGhepNhom = Loadable(
  lazy(() =>
    import("../pages/dashboard/thong-ke-va-xac-suat/thong-ke/BangGhepNhom")
  )
);

// ĐẠI SỐ VÀ GIẢI TÍCH
// const DoThiHamSo = Loadable(
//   lazy(() => import("../pages/dashboard/dai-so-va-giai-tich/DoThiHamSo"))
// );

// // HÌNH HỌC VÀ ĐO LƯỜNG
// const HinhHocMatPhang = Loadable(
//   lazy(() => import("../pages/dashboard/hinh-hoc-va-do-luong/HinhHocMatPhang"))
// );
// const HinhHocKhongGian = Loadable(
//   lazy(() => import("../pages/dashboard/hinh-hoc-va-do-luong/HinhHocKhongGian"))
// );

// MAIN
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const Page403 = Loadable(lazy(() => import("../pages/Page403")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
