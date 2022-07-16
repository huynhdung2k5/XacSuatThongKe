import React from "react";
import GeoGebra from "src/sections/geogebra/Geogebra";
import binomialDistribution from "src/assets/geometry/GGB/phan_phoi_nhi_thuc.ggb";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import useSettings from "src/hooks/useSettings";
import { PATH_DASHBOARD } from "src/routes/paths";
import Page from "src/components/Page";
import { Container } from "@mui/material";

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
        <GeoGebra appName="classic" filename={binomialDistribution} />
      </Container>
    </Page>
  );
}
