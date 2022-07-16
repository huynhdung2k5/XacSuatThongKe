import { m } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container } from "@mui/material";
// components
import Page from "../components/Page";
import { MotionContainer, varBounce } from "../components/animate";
// assets
import { PageNotFoundIllustration } from "../assets";

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

export default function Page404() {
  return (
    <Page title="404 Không tìm thấy">
      <Container component={MotionContainer}>
        <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              404 Không tìm thấy
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: "text.secondary" }}>
              Chúng tôi không tìm thấy nội dung yêu cầu của bạn
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <PageNotFoundIllustration
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
