import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, Layout, Menu, Row, Skeleton, theme } from 'antd';
import HeaderComponent from "../components/HeaderComponent";
import SlideBanner from "../components/SlideBanner";
import SliderRoadmap from "../components/SliderRoadmap";
import TabsCoursesComponent from "../components/TabsCoursesComponent";
import LoadingComponent from "../components/LoadingComponent";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../store/types";
import UploadAvatar from "../components/UploadAvatar";
import ItemCourseComponent from "../components/ItemCourseComponent";
import { Link, useNavigate   } from "react-router-dom";
import { HiOutlineBookOpen, HiOutlineNewspaper } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { setLoading, unsetLoading } from "../store/loadSlice";
import api from "../configs/axiosConfig";
import { logout } from "../store/authSlice";
import EditUserComponent from "../components/EditUserComponent";
const { Header, Content, Footer } = Layout;

function ProfilePage() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const loading = useSelector((state: RootState) => state.root.load)
    const [loadingskeleton, setloadingskeleton] = useState(false)
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.root.auth)
    const [avatar, setavatar] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setemail] = useState("")
    const [id, setid] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        setloadingskeleton(true)
        if (auth.isAuthenticated) {
            setavatar(auth.user.avatar)
            setemail(auth.user.email)
            setfirstName(auth.user.firstName)
            setlastName(auth.user.lastName)
            setid(auth.user?.id)
            
        }
        setTimeout(() => {
            setloadingskeleton(false)
        }, 500)


    }, [auth.user])

    
  const handelLogout = async () =>{
    dispatch(setLoading({}))
    await api.delete('/auth/logout',
    {
      headers: {
        accept: '*/*',
        Authorization: 'Bearer ' + auth.user?.refreshToken,

      },
    }
    ).then((response:any)=>{
      dispatch(unsetLoading({}))
      console.log(response)
        
            dispatch(logout())
            navigate("/");
        
    }).catch((error: any)=>{
        console.log(error)
        dispatch(unsetLoading({}))
        dispatch(logout())
    })
    
}

    return (
        <Layout className="layout bg-white">
            <HeaderComponent item=""/>
            <Content className="">

                <div className="site-layout-content w-[100%] h-[700px] text-center  flex justify-center items-center flex-col " >
                    <div className="w-[100%]">
                        <div className="h-[400px] w-[100vw] object-cover top-0 absolute  bg-gradient-to-r from-[#024cac] to-[#0492ff] opacity-80">


                        </div>

                        <div className="w-[70%]  h-[400px] max-w-[1000px] max-lg:w-[90%] absolute left-0 right-0 mx-auto top-[175px]">
                            <div className="w-[100%] h-[100%]">
                                <Row className="w-[100%] h-[100%]" gutter={[16, 16]}>
                                    <Col span={8} className="px-5 w-[100%] h-[100%]">
                                        <div className=" bg-white rounded-2xl shadow-xl h-[100%]">
                                            {loadingskeleton ? <>
                                                <div className="h-[27px] mt-10"></div>
                                                <div className=" mx-auto  w-[120px] h-[120px] flex justify-center items-center">
                                                    <Skeleton.Avatar active={true} style={{ width: "100px", height: "100px" }} />

                                                </div>

                                                <Skeleton title={{ width: "100%" }} paragraph={{ rows: 5 }} active={true} style={{ width: "90%", margin: "10px auto", textAlign: "center" }} />
                                            </> :
                                                <>
                                                <div className="h-[27px] mt-10"></div>
                                                    <div className=" mx-auto  w-[120px] h-[120px] flex justify-center items-center">
                                                        <UploadAvatar/>

                                                    </div>
                                                    <h4 className="text-base font-semibold">{lastName + " " + firstName}</h4>
                                                    <hr className="mt-3"/>
                                                    <div className=" w-[120px] mx-auto">
                                                    
                                                        
                                                        <Link to="/my-courses" className="block w-[100%] text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><HiOutlineBookOpen /><p>My Courses</p></Link>
                                                        <Link to="/my-block" className="block w-[100%] text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><HiOutlineNewspaper /><p>My Block</p></Link>
                                                        <Link to="/cart" className="block w-[100%] text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><MdOutlineShoppingCart /><p>Cart</p></Link>
                                                        <Link to="/notification" className="block w-[100%] text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><BsBell /><p>Notification</p></Link>
                                                        </div>
                                                        <hr className="mt-3"/>
                                                        <div className=" w-[120px] mx-auto">
                                                        <p onClick={handelLogout}
                                                            className="block w-[100%] text-sm font-medium !pt-3 flex justify-start items-center text-red-500 hover:!text-red-500 !space-x-2 cursor-pointer"><TbLogout /><p>Sign Out</p></p>
                                                    </div>

                                                </>

                                            }
                                        </div>

                                    </Col>
                                    <Col span={16} className="px-5 w-[100%] h-[100%]">
                                        <div className=" bg-white rounded-2xl shadow-xl h-[100%]">
                                            <div className="mt-10 mx-auto   flex justify-center items-center">
                                            {loadingskeleton ? <>
                                            
                                                <Skeleton title={{ width: "40%" }} paragraph={{ rows: 8 }} active={true} style={{ width: "70%", margin: "60px auto", textAlign: "center" }} />
                                            </>:
                                                <EditUserComponent/>}

                                            </div>

                                        </div>
                                    </Col>



                                </Row>

                            </div>

                        </div>

                    </div>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Wizcove IT</Footer>
            {
                loading.isLoading ?
                    <LoadingComponent /> : null
            }

        </Layout>

    );
}

export default ProfilePage;