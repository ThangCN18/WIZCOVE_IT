import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme, Input, notification, AutoComplete } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri"
import type { MenuProps } from 'antd';
import { Button, Dropdown, Tooltip } from 'antd';
import { Avatar, Card, Skeleton } from 'antd';
import CartDropdown from "./CartDropdown";
import NotifyDropdown from "./NotifyDropdown";
import UserDropdown from "./UserDropdown";
import { GiHamburgerMenu } from "react-icons/gi"
import { IoHome } from 'react-icons/io5';
import { HiOutlineNewspaper, HiOutlineBookOpen } from "react-icons/hi"
import { FaRoute, FaRegUser, FaUsers } from "react-icons/fa"
import { MdOutlineShoppingCart } from "react-icons/md"
import { BsBell } from "react-icons/bs"
import { TbLogout, TbLogin } from "react-icons/tb"
import LoginComponent from "./LoginComponent";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/types'
import api from "../configs/axiosConfig";
import { logout } from "../store/authSlice";
import { setLoading, unsetLoading } from "../store/loadSlice";
import NotificationComponent from "./NotificationComponent";


const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const { Search } = Input;


import type { SelectProps } from 'antd/es/select';
import CategoriesDropdown from "./CategoriesDropdown";
import { optionTreeData } from "../App";


const HeaderComponent: React.FC<{ item: string }> = ({ item }) => {
  const [showMenuSM, setShowMenuSM] = useState(false);
  const [showModalLogin, setshowModalLogin] = useState(false)
  const [textSearch, settextSearch] = useState("")
  const [datacourses, setdatacourses] = useState([])
  const auth = useSelector((state: RootState) => state.root.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [dataCourses, setDataCourses] = useState([]);



  const handelLogout = async () => {
    dispatch(setLoading({}))
    await api.delete('/auth/logout',
      {
        headers: {
          accept: '*/*',
          Authorization: 'Bearer ' + auth.user?.refreshToken,

        },
      }
    ).then((response: any) => {

      dispatch(unsetLoading({}))
      dispatch(logout())
      navigate("/")
    }).catch((error: any) => {
      console.log(error)
      dispatch(unsetLoading({}))
      dispatch(logout())
      navigate("/")
    })
  }


  useEffect(() => {
    handleGetCourses();
  }, []);

  const handleGetCourses = async () => {
    try {
      const response = await api.get('/courses?perPage=100');
      setDataCourses(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = (value) => {
    console.log('onSelect', value);
  };

  const handleSearch = (value) => {
    let filteredCourses = [];

    if (value) {
      filteredCourses = dataCourses.filter((course) =>
        course.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    setOptions(
      filteredCourses.map((course) => ({
        value: course.name,
        label: (
          <Link to={'/course/' + course.id}><div
            style={{
              display: 'flex',
              justifyContent: 'space-start',
              alignItems: 'center'
            }}
          >
            <div className="flex justify-start items-center !space-x-2">
              <img src={course.image} className="!w-[60px] rounded-md h-[40px]" />
              <span className="truncate">{course.name}</span>
            </div>


          </div></Link>
        ),
      }))
    );
  };





  return (
    <Header className="w-[100%]  !bg-[#ffffff] shadow-md !px-0 !py-0 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1400px] md:!w-[100%] h-[100%] flex justify-between items-center mx-auto px-4 max-sm:px-1 space-x-2">
        <div className="flex justify-start items-center space-x-4">
          <Link to="/">
            <div className="logo flex justify-start items-center space-x-3 max-sm:space-x-1">
              <img className="w-[30px] max-sm:w-[25px]" src="https://coursesbe.s3.ap-southeast-1.amazonaws.com/c572dcfd-998f-4d93-b40f-6d105dcbdb49-logo-learning.png" alt="logo" />
              <h4 className="text-black text-lg !leading-4 font-bold !py-0 max-lg:hidden ">Wizcove IT</h4>
            </div>
          </Link>
          <div id="category-id-dro" className="max-lg:hidden">
            <CategoriesDropdown />
          </div>
        </div>

        <div className="flex justify-between items-center w-auto space-x-4 max-lg:space-x-2  max-sm:space-x-1">
          <div className="relative">


            <AutoComplete
              dropdownMatchSelectWidth={252}
              style={{ width: 300 }}
              options={options}
              onSelect={onSelect}
              onSearch={handleSearch}

              className="text-base max-sm:text-xs !w-[450px] max-lg:!w-[250px] max-sm:!w-[280px] max-xs:w-[250px] " size="large"
            >
              <Input size="large" placeholder="Course..."
                prefix={<div><RiSearchLine className="text-base text-gray-400 " /></div>}
              />
            </AutoComplete>
          </div>
          {
            item == "home" ?
              <Link to="/" className="block text-sm font-medium  flex justify-start items-center !space-x-1 active-menu max-sm:hidden"><p>Home</p></Link> :
              <Link to="/" className="block text-sm font-medium  flex justify-start items-center !space-x-1 max-sm:hidden"><p>Home</p></Link>
          }
          {
            item == "courses" ?
              <Link to="/courses" className="block text-sm font-medium  flex justify-start items-center !space-x-1 max-sm:hidden active-menu"><p>Courses</p></Link> :
              <Link to="/courses" className="block text-sm font-medium  flex justify-start items-center !space-x-1 max-sm:hidden"><p>Courses</p></Link>
          }
          {
            item == "roadmaps" ?
              <Link to="/roadmaps" className="block text-sm font-medium  flex justify-start items-center !space-x-1 max-sm:hidden active-menu"><p>Roadmaps</p></Link> :
              <Link to="/roadmaps" className="block text-sm font-medium  flex justify-start items-center !space-x-1 max-sm:hidden"><p>Roadmaps</p></Link>
          }

          {
            item == "about-us" ?
              <Link to="/about-us" className="block text-sm font-medium  flex justify-start items-center !space-x-1 max-sm:hidden active-menu"><p>About Us</p></Link> :
              <Link to="/about-us" className="block text-sm font-medium  flex justify-start items-center !space-x-1 max-sm:hidden"><p>About Us</p></Link>
          }

          {
            auth.isAuthenticated ? <>
              <CartDropdown />
              <NotifyDropdown item={item} />
              <UserDropdown handelLogout={handelLogout} />
            </> :
              <Button type="primary" className="block text-sm font-medium  flex justify-start items-center !space-x-1 max-sm:hidden bg-blue-500"
                onClick={() => setshowModalLogin(true)}
              ><TbLogin /><p>Sign In</p></Button>
          }
        </div>
        <div className="max-sm:block hidden relative">
          <GiHamburgerMenu className="text-2xl cursor-pointer" onClick={() => setShowMenuSM(!showMenuSM)} />
          <div onClick={(e) => { setShowMenuSM(false); e.stopPropagation() }} className={showMenuSM ? "duration-500 absolute top-[44px] right-[-4px] !h-[100vh] !w-[100vw] flex justify-end" : "duration-500 absolute top-[44px] right-[-104vw] !h-[100vh] !w-[100vw] bg-[#353d4209] flex justify-end"}>
            <div onClick={(e) => { setShowMenuSM(true); e.stopPropagation() }} className="h-[100%] w-[40%] shadow-2xl bg-white">
              {
                auth.isAuthenticated ? <>
                  <Link to="/" className="block w-[100%] pl-5 text-sm font-medium !pt-8 flex justify-start items-center !space-x-2 active-menu"><IoHome /><p>Home</p></Link>
                  <Link to="/courses" className="block w-[100%] pl-5 text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><HiOutlineBookOpen /><p>Courses</p></Link>
                  <Link to="/my-courses" className="block w-[100%] pl-5 text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><HiOutlineBookOpen /><p>My Courses</p></Link>
                  <Link to="/roadmaps" className="block w-[100%] pl-5 text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><FaRoute /><p>Roadmaps</p></Link>
                  <Link to="/my-cart" className="block w-[100%] pl-5 text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><MdOutlineShoppingCart /><p>Cart</p></Link>
                  <Link to="/notification" className="block w-[100%] pl-5 text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><BsBell /><p>Notification</p></Link>
                  <Link to="/profile" className="block w-[100%] pl-5 text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><FaRegUser /><p>View Profile</p></Link>
                  <Link to="/about-us" className="block w-[100%] pl-5 text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><FaUsers /><p>About Us</p></Link>
                  <p onClick={handelLogout}
                    className="block w-[100%] pl-5 text-sm font-medium !pt-3 flex justify-start items-center text-red-500 hover:!text-red-500 !space-x-2 cursor-pointer"><TbLogout /><p>Sign Out</p></p>
                </> :
                  <>
                    <Link to="/" className="block w-[100%] pl-5 text-sm font-medium !pt-8 flex justify-start items-center !space-x-2 active-menu"><IoHome /><p>Home</p></Link>
                    <Link to="/courses" className="block w-[100%] pl-5 text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><HiOutlineBookOpen /><p>Courses</p></Link>
                    <Link to="/roadmaps" className="block w-[100%] pl-5 text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><FaRoute /><p>Roadmaps</p></Link>
                    <Link to="/about-us" className="block w-[100%] pl-5 text-sm font-medium !pt-3 flex justify-start items-center !space-x-2"><FaUsers /><p>About Us</p></Link>
                    <Button type="primary" className="block text-sm mx-auto mt-6 font-medium  flex justify-start items-center !space-x-1 bg-blue-500"
                      onClick={() => setshowModalLogin(true)}
                    ><TbLogin /><p>Sign In</p></Button>
                  </>
              }
            </div>

          </div>
        </div>

      </div>
      <LoginComponent showModalLogin={showModalLogin} setshowModalLogin={setshowModalLogin} />

    </Header>
  );
}

export default HeaderComponent;