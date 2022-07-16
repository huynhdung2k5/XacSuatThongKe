// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Stack,
  Container,
  Typography,
  Divider,
} from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Page from "../../components/Page";
import Logo from "../../components/Logo";
import Image from "../../components/Image";
// sections
import { LoginForm } from "../../sections/auth/login";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

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

export default function Login() {
  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Đăng nhập">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            {/* <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 5 }}>
              PHẦN MỀM TOÁN HỌC GD VIỆT NAM
            </Typography> */}
            <Image
              visibleByDefault
              disabledEffect
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
            <Stack sx={{ mt: 2, ml: 2 }} align="left">
              <Typography sx={{ color: "text.secondary" }}>
                Đồng tác giả:
              </Typography>
              <Typography sx={{ color: "text.secondary", mt: 1 }}>
                Danh Phi Long
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Huỳnh Tấn Dũng
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Nguyễn Xuân Thành Chuyển
              </Typography>
            </Stack>
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Đăng nhập
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Theo thông tư 37, 38 và 39/2021/TT-BGDĐT.
                </Typography>
              </Box>
            </Stack>

            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
