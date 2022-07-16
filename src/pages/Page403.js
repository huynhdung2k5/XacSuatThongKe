import { m } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container } from "@mui/material";
// components
import Page from "../components/Page";
import { MotionContainer, varBounce } from "../components/animate";
// assets
import { ForbiddenIllustration } from "../assets";

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <Page title="403 Không có quyền truy cập">
      <Container component={MotionContainer}>
        <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              Không có quyền truy cập
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: "text.secondary" }}>
              Trang yêu cầu quyền truy cập.
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <ForbiddenIllustration
              sx={{ height: 180, my: { xs: 5, sm: 10 } }}
            />
          </m.div>

          <Button to="/" variant="contained" component={RouterLink}>
            Trở về Trang chủ
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
