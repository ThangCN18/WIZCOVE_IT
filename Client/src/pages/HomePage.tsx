import React from "react";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import HeaderComponent from "../components/HeaderComponent";
import SlideBanner from "../components/SlideBanner";
import SliderRoadmap from "../components/SliderRoadmap";
import TabsCoursesComponent from "../components/TabsCoursesComponent";
import LoadingComponent from "../components/LoadingComponent";
import { useSelector } from 'react-redux'
import { RootState } from "../store/types";
import AboutUsHomeComponent from "../components/AboutUsHomeComponent";
import FooterComponent from "../components/FooterComponent";
import StudentReviewHomePageComponent from "../components/StudentReviewHomePageComponent";
import PopularCourseComponent from "../components/PopularCourseComponent";
import KommunicateChat from "../components/ChatboxComponent";
// import ChatBoxCommonent from "../components/ChatBoxCommonent";
const { Header, Content, Footer } = Layout;

function HomePage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const loading = useSelector((state: RootState) => state.root.load)

  return (
    <Layout className="layout bg-white">
      <HeaderComponent item="home" />
      <Content className="pt-[70px] ">

        <div className="site-layout-content w-[100%] pb-0 " style={{ background: colorBgContainer }}>
          <SlideBanner />
          <SliderRoadmap />
          <TabsCoursesComponent />
          <StudentReviewHomePageComponent />
          <PopularCourseComponent />
          <AboutUsHomeComponent />
        </div>
      </Content>
      {/* <ChatBoxCommonent /> */}
      <FooterComponent />
      <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Wizcove IT</Footer>
      {
        loading.isLoading ?
          <LoadingComponent /> : null
      }


    </Layout>

  );
}

export default HomePage;