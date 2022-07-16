import React from "react";
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
import tinhToanChung from "src/assets/GGBs/thong-ke-va-xac-suat/xac-suat/tinh_toan_chung.ggb";

export default function TinhToanChung() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tính toán chung">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Tính toán chung"
          links={[
            {
              name: "Thống kê và Xác suất",
              href: PATH_DASHBOARD.thongKeVaXacSuat.root,
            },
            {
              name: "Xác suất",
              href: PATH_DASHBOARD.thongKeVaXacSuat.xacSuat.root,
            },
            { name: "Tính toán chung" },
          ]}
        />
        <GeoGebra
          appName="classic"
          showToolBar={false}
          filename={tinhToanChung}
        />
      </Container>
    </Page>
  );
}
