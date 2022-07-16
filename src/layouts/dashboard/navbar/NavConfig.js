// Routes
import { PATH_DASHBOARD } from "src/routes/paths";
// Components
import SvgIconStyle from "src/components/SvgIconStyle";

const getIcon = (name) => (
  <SvgIconStyle
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  THONG_KE_VA_XAC_SUAT: {
    BIEU_DO: getIcon("thong_ke_va_xac_suat/ic_bieu_do"),
    XAC_SUAT: getIcon("thong_ke_va_xac_suat/ic_xac_suat"),
    THONG_KE: getIcon("thong_ke_va_xac_suat/ic_thong_ke"),
  },
  // DAI_SO_VA_GIAI_TICH: {
  //   DO_THI_HAM_SO: getIcon("dai_so_va_giai_tich/ic_do_thi_ham_so"),
  // },
  // HINH_HOC_VA_DO_LUONG: {
  //   HINH_HOC_MAT_PHANG: getIcon("hinh_hoc_va_do_luong/ic_hinh_hoc_mat_phang"),
  //   HINH_HOC_KHONG_GIAN: getIcon("hinh_hoc_va_do_luong/ic_hinh_hoc_khong_gian"),
  // },
};

const navConfig = [
  {
    subheader: "Thống kê và Xác suất",
    items: [
      {
        title: "Biểu đồ",
        path: PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.root,
        icon: ICONS.THONG_KE_VA_XAC_SUAT.BIEU_DO,
        children: [
          {
            title: "Biểu đồ tranh",
            path: PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.bieuDoTranh,
          },
          {
            title: "Biểu đồ cột",
            path: PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.bieuDoCot,
          },
          {
            title: "Biểu đồ cột kép",
            path: PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.bieuDoCotKep,
          },
          {
            title: "Biểu đồ đoạn thẳng",
            path: PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.bieuDoDoanThang,
          },
          {
            title: "Biểu đồ quạt",
            path: PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.bieuDoQuat,
          },
        ],
      },
      {
        title: "Xác suất",
        path: PATH_DASHBOARD.thongKeVaXacSuat.xacSuat.root,
        icon: ICONS.THONG_KE_VA_XAC_SUAT.XAC_SUAT,
        children: [
          {
            title: "Tính toán chung",
            path: PATH_DASHBOARD.thongKeVaXacSuat.xacSuat.tinhToanChung,
          },
          {
            title: "Phân phối nhị thức",
            path: PATH_DASHBOARD.thongKeVaXacSuat.xacSuat.phanPhoiNhiThuc,
          },
        ],
      },
      {
        title: "Thống kê",
        path: PATH_DASHBOARD.thongKeVaXacSuat.thongKe.root,
        caption: "Bảng tần số",
        icon: ICONS.THONG_KE_VA_XAC_SUAT.THONG_KE,
        children: [
          {
            title: "Không ghép nhóm",
            path: PATH_DASHBOARD.thongKeVaXacSuat.thongKe.bangKhongGhepNhom,
          },
          {
            title: "Ghép nhóm",
            path: PATH_DASHBOARD.thongKeVaXacSuat.thongKe.bangGhepNhom,
          },
        ],
      },
    ],
  },
  // {
  //   subheader: "Đại số và giải tích",
  //   items: [
  //     {
  //       title: "Đồ thị hàm số",
  //       path: PATH_DASHBOARD.daiSoVaGiaiTich.doThiHamSo,
  //       icon: ICONS.DAI_SO_VA_GIAI_TICH.DO_THI_HAM_SO,
  //     },
  //   ],
  // },
  // {
  //   subheader: "Hình học và Đo lường",
  //   items: [
  //     {
  //       title: "Hình học mặt phẳng",
  //       path: PATH_DASHBOARD.hinhHocVaDoLuong.hinhHocMatPhang,
  //       icon: ICONS.HINH_HOC_VA_DO_LUONG.HINH_HOC_MAT_PHANG,
  //     },
  //     {
  //       title: "Hình học không gian",
  //       path: PATH_DASHBOARD.hinhHocVaDoLuong.hinhHocKhongGian,
  //       icon: ICONS.HINH_HOC_VA_DO_LUONG.HINH_HOC_KHONG_GIAN,
  //     },
  //   ],
  // },
];

export default navConfig;
