import GeoGebra from "src/sections/geogebra/Geogebra";
// @Mui
import { Container } from "@mui/material";
// Hooks
import useSettings from "src/hooks/useSettings";
// Routes
import { PATH_DASHBOARD } from "src/routes/paths";
// Components
import Page from "src/components/Page";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
// Files
import phanPhoiNhiThuc from "src/assets/GGBs/thong-ke-va-xac-suat/xac-suat/phan_phoi_nhi_thuc.ggb";

export default function PhanPhoiNhithuc() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Phân phối Nhị thức">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Phân phối Nhị thức"
          links={[
            {
              name: "Thống kê và Xác suất",
              href: PATH_DASHBOARD.thongKeVaXacSuat.root,
            },
            {
              name: "Xác suất",
              href: PATH_DASHBOARD.thongKeVaXacSuat.xacSuat.root,
            },
            { name: "Phân phối Nhị thức" },
          ]}
        />
        <GeoGebra filename={phanPhoiNhiThuc} />
      </Container>
    </Page>
  );
}
