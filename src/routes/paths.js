// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/xac-thuc";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/dang-nhap"),
};

export const PATH_PAGE = {
  page403: "/403",
  page404: "/404",
  page500: "/500",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  thongKeVaXacSuat: {
    root: path(ROOTS_DASHBOARD, "/thong-ke-va-xac-suat"),
    bieuDo: {
      root: path(ROOTS_DASHBOARD, "/thong-ke-va-xac-suat/bieu-do"),
      bieuDoTranh: path(
        ROOTS_DASHBOARD,
        "/thong-ke-va-xac-suat/bieu-do/bieu-do-tranh"
      ),
      bieuDoCot: path(
        ROOTS_DASHBOARD,
        "/thong-ke-va-xac-suat/bieu-do/bieu-do-cot"
      ),
      bieuDoCotKep: path(
        ROOTS_DASHBOARD,
        "/thong-ke-va-xac-suat/bieu-do/bieu-do-cotkep"
      ),
      bieuDoDoanThang: path(
        ROOTS_DASHBOARD,
        "/thong-ke-va-xac-suat/bieu-do/bieu-do-doan-thang"
      ),
      bieuDoQuat: path(
        ROOTS_DASHBOARD,
        "/thong-ke-va-xac-suat/bieu-do/bieu-do-quat"
      ),
    },
    xacSuat: {
      root: path(ROOTS_DASHBOARD, "/thong-ke-va-xac-suat/xac-suat"),
      tinhToanChung: path(
        ROOTS_DASHBOARD,
        "/thong-ke-va-xac-suat/xac-suat/tinh-toan-chung"
      ),
      phanPhoiNhiThuc: path(
        ROOTS_DASHBOARD,
        "/thong-ke-va-xac-suat/xac-suat/phan-phoi-nhi-thuc"
      ),
    },
    thongKe: {
      root: path(ROOTS_DASHBOARD, "/thong-ke-va-xac-suat/thong-ke"),
      bangKhongGhepNhom: path(
        ROOTS_DASHBOARD,
        "/thong-ke-va-xac-suat/thong-ke/bang-khong-ghep-nhom"
      ),
      bangGhepNhom: path(
        ROOTS_DASHBOARD,
        "/thong-ke-va-xac-suat/thong-ke/bang-ghep-nhom"
      ),
    },
  },
  daiSoVaGiaiTich: {
    root: path(ROOTS_DASHBOARD, "/dai-so-va-giai-tich"),
    doThiHamSo: path(ROOTS_DASHBOARD, "/dai-so-va-giai-tich/do-thi-ham-so"),
  },
  hinhHocVaDoLuong: {
    root: path(ROOTS_DASHBOARD, "/hinh-hoc-va-do-luong"),
    hinhHocMatPhang: path(ROOTS_DASHBOARD, "/hinh-hoc-va-do-luong/hinh-hoc-mat-phang"),
    hinhHocKhongGian: path(ROOTS_DASHBOARD, "/hinh-hoc-va-do-luong/hinh-hoc-khong-gian"),
  },
};
