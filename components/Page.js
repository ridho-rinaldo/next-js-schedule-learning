import { Container, Inner } from "./styles/Page";
import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";

import Header from "./Header";
import SidebarMenu from "./SidebarMenu";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/GlobalStyles";
import { useAppState } from "./shared/AppProvider";
import { withRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from "../redux/slice/authSlice";

const { Content } = Layout;

const NonDashboardRoutes = [
  "/signin",
  "/signup",
  "/forgot",
  "/lockscreen",
  "/_error"
];

const Page = ({ router, children }) => {

  const [state] = useAppState();
  const isNotDashboard = NonDashboardRoutes.includes(router.pathname);

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.isLoading)

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false))
    }, 1000);
  }, [loading]);

  return (
    <Spin tip="Loading..." size="large" spinning={loading}>
      <ThemeProvider theme={theme}>
        <Container
          className={`${state.weakColor ? "weakColor" : ""} ${
            state.boxed ? "boxed shadow-sm" : ""
          }`}
        >
          {!isNotDashboard && <Header />}
          <Layout className="workspace">
            {!isNotDashboard && (
              <SidebarMenu
                sidebarTheme={state.darkSidebar ? "dark" : "light"}
                sidebarMode={state.sidebarPopup ? "vertical" : "inline"}
                sidebarIcons={state.sidebarIcons}
                collapsed={state.collapsed}
              />
            )}

            <Layout>
              <Content>
                {!isNotDashboard ? <Inner>{children}</Inner> : children}
              </Content>
            </Layout>
          </Layout>
        </Container>
      </ThemeProvider>
    </Spin>
  );
};

export default withRouter(Page);
