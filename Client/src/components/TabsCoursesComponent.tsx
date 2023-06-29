import React, { useEffect, useState } from "react";
import { Avatar, Badge, Breadcrumb, Button, Card, Col, Empty, Layout, Menu, Rate, Row, Skeleton, Space, Tabs, theme } from 'antd';
import HeaderComponent from "../components/HeaderComponent";
import SlideBanner from "../components/SlideBanner";
import SliderRoadmap from "../components/SliderRoadmap";
import LoadingComponent from "../components/LoadingComponent";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../store/types";
import AboutUsHomeComponent from "../components/AboutUsHomeComponent";
import FooterComponent from "../components/FooterComponent";
import { Link, useNavigate } from "react-router-dom";
import { setLoading, unsetLoading } from "../store/loadSlice";
import api from "../configs/axiosConfig";
import { logout } from "../store/authSlice";
import Meta from "antd/es/card/Meta";
import { RiVipCrownFill } from "react-icons/ri";
import CardCourseItemComponent from "../components/CardCourseItemComponent";
const { Header, Content, Footer } = Layout;
import type { TabsProps } from 'antd';
import SkeletonImage from "antd/es/skeleton/Image";
import SkeletonInput from "antd/es/skeleton/Input";
import SkeletonButton from "antd/es/skeleton/Button";


function TabsCoursesComponent() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const loading = useSelector((state: RootState) => state.root.load)
    const [loaddingas, setloaddingas] = useState(false)
    const [datacourses, setdatacourses] = useState<any[]>([])
    const [dataroadmap, setdataroadmap] = useState([])
    const auth = useSelector((state: RootState) => state.root.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [datasub, setdatasub] = useState([])
    const [dataadacss, setdataadacss] = useState([])



    const onChange = (key: string) => {
        console.log(key);
      };

      
    var items: TabsProps['items'] = dataadacss

    var aaaa =[]

    const headers = {
        Accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.accessToken,
      };
    
const getCourseSubscribe = async () =>{

    await api.get('/users/my-courses/',
        {
            headers
          },
    
    ).then(async (response:any)=>{
        if (response.status === 200){

            for(var addf in response.data){
                aaaa.push(response.data[addf].courseId)
            }
        }
       
    }).catch((error: any)=>{
        console.log(error)
        

    })
    
    }

    var ccccaa =[]

    const hangdlegetdataroadmap = async () => {

        setloaddingas(true)
        await getCourseSubscribe()
        await api.get('/roadmaps/',

        ).then(async(response: any) => {
            const adshba = response.data
            for(const index in adshba){
                const caca = {
                    key: index+1,
                    label: <p>{adshba[index].name}</p>,
                    children: <Row gutter={[24, 24]} className="max-sm:px-0  pb-10">
                        <Col span={24}>
                        <h2 className="py-6 max-md:py-2 text-3xl max-md:w-[100%] w-[80%] mx-auto text-gray-700 font-bold max-lg:text-xl max-sm:text-sm">{
                            adshba[index].description
                        }
</h2>
                        
                        </Col>
                        
                    {adshba[index].courseRoadmaps.length == 0? <Empty className="mx-auto" image={Empty.PRESENTED_IMAGE_SIMPLE} />: <>
                        {adshba[index].courseRoadmaps.map(course => {
                            if(aaaa.includes(course.course.id)){
                                
                                return  <CardCourseItemComponent course={course.course} key={course.id} issub={true}/>
                            }
                            return <CardCourseItemComponent course={course.course} key={course.id} issub={false}/>
                            
                        })}
                    </>}
                </Row>
                  }
                  ccccaa.push(caca)

                  
            }
            await setdataadacss(ccccaa)
            await setloaddingas(false)
                        
        }).catch((error: any) => {
            console.log(error)
            setloaddingas(false)
            
        })

    }


    useEffect(() => {
        hangdlegetdataroadmap()
        
    }, [auth.isAuthenticated])

    return (
       
                <div className="site-layout-content w-[100%] pb-10 max-w-[1400px] mx-auto" style={{ background: colorBgContainer }}>
                <div className="max-w-[1400px] max-md:w-[90%] mx-auto text-center rounded-3xl px-[5%] py-[2%] bg-[rgba(71,214,226,.1)] tapscoursescomponemt">
                    {
                        loaddingas?<>
                        <div className="flex justify-center space-x-2 ">
                        <SkeletonButton active className="my-4" /> 
                        <SkeletonButton active  className="my-4" /> 
                        <SkeletonButton active className="my-4" /> 
                        <SkeletonButton active className="my-4" /> 

                        </div>

                        <Row gutter={[24,24]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} >    
                            <div className="border-collapse border-[1px] rounded-md shadow-md">
                            <SkeletonButton active className="!w-[100%] !h-[175px]" /> 
                            <div className="px-3">
                            <Skeleton active className="my-5" /> 
                            <SkeletonButton active className="!w-[100%] mb-3" /> 
                            </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} >    
                            <div className="border-collapse border-[1px] rounded-md shadow-md">
                            <SkeletonButton active className="!w-[100%] !h-[175px]" /> 
                            <div className="px-3">
                            <Skeleton active className="my-5" /> 
                            <SkeletonButton active className="!w-[100%] mb-3" /> 
                            </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} >    
                            <div className="border-collapse border-[1px] rounded-md shadow-md">
                            <SkeletonButton active className="!w-[100%] !h-[175px]" /> 
                            <div className="px-3">
                            <Skeleton active className="my-5" /> 
                            <SkeletonButton active className="!w-[100%] mb-3" /> 
                            </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} >    
                            <div className="border-collapse border-[1px] rounded-md shadow-md">
                            <SkeletonButton active className="!w-[100%] !h-[175px]" /> 
                            <div className="px-3">
                            <Skeleton active className="my-5" /> 
                            <SkeletonButton active className="!w-[100%] mb-3" /> 
                            </div>
                            </div>
                        </Col>
                        </Row>
                        </>:
                        <Tabs  defaultActiveKey="1" animated className="min-h-[475px]"  items={items} onChange={onChange} />
                    }
                
                    </div>
                </div>
           

    );
}

export default TabsCoursesComponent;
// import React from "react"
// import ItemCourseComponent from "./ItemCourseComponent"
// import { Tabs } from 'antd';
// import type { TabsProps } from 'antd';
// import TabItemCourseComponent from "./TabItemCourseComponent";


// const onChange = (key: string) => {
//     console.log(key);
//   };
  
//   const items: TabsProps['items'] = [
//     {
//       key: '1',
//       label: <p>Front-End</p>,
//       children: <TabItemCourseComponent/>,
//     },
//     {
//       key: '2',
//       label: `Back-End`,
//       children: <ItemCourseComponent/>,
//     },
//     {
//       key: '3',
//       label: `FullStack`,
//       children: `Content of Tab Pane 3`,
//     },
//     {
//         key: '4',
//         label: `Tester`,
//         children: `Content of Tab Pane 3`,
//       },
//       {
//         key: '5',
//         label: `Mobile`,
//         children: `Content of Tab Pane 3`,
//       },
//   ];

// const TabsCoursesComponent: React.FC = ()=>{
//     return(
//         <div className="max-w-[1400px] max-md:w-[90%] mx-auto text-center rounded-3xl px-[5%] py-[2%] bg-[rgba(71,214,226,.1)] tapscoursescomponemt">
//         <Tabs  defaultActiveKey="1" animated  items={items} onChange={onChange} />
//         </div>
//     )
// }
// export default TabsCoursesComponent

