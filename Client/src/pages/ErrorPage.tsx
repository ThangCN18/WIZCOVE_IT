import React from "react";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import HeaderComponent from "../components/HeaderComponent";
import SlideBanner from "../components/SlideBanner";
import SliderRoadmap from "../components/SliderRoadmap";
import TabsCoursesComponent from "../components/TabsCoursesComponent";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";

const { Header, Content, Footer } = Layout;

function ErrorPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout bg-white">
      <HeaderComponent item=""/>
      <Content className="pt-[70px]">
      <div className="site-layout-content w-[100%] h-[82vh] text-center  max-lg:h-[90vh] max-sm:h-[82vh] flex justify-center items-center flex-col " style={{ background: colorBgContainer }}>
        <img className="w-[175px]" src="https://live.staticflickr.com/65535/52813748574_871ec505dd_w.jpg"/>
        <h4 className="text-red-600 text-3xl font-bold py-3">ERROR 404!</h4>
        <p className="text-xl py-2">This page does not exist</p>
        <p className="text-xl font-semibold flex justify-center items-center pb-24">Go back to <Link className="text-blue-600 flex justify-center items-center " to="/"><IoHome className="mr-1 ml-3" />home page</Link></p>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Wizcove IT</Footer>
    </Layout>
  );
}

export default ErrorPage;