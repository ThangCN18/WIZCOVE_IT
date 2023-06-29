import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import { Layout, Menu, theme, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import AdminUserComponent from '../components/adminComponent/AdminUserComponent';
import { FaRoute } from 'react-icons/fa';
import AdminRoadmapComponent from '../components/adminComponent/AdminRoadmapComponent';
import { RiDashboardLine, RiVideoAddFill } from 'react-icons/ri';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { setLoading, unsetLoading } from '../store/loadSlice';
import api from '../configs/axiosConfig';
import { logout } from '../store/authSlice';
import UserDropdown from '../components/UserDropdown';
import { MdOutlineCategory, MdOutlinePayments, MdOutlineReviews } from 'react-icons/md';
import AdminReviewComponent from '../components/adminComponent/AdminReviewComponent';

const { Header, Sider, Content } = Layout;


const AdminReviewPage: React.FC = () => {

  const [selectedMenu, setSelectedMenu] = useState('5');
  const auth = useSelector((state: RootState) => state.root.auth)
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoadding] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

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

  const {
    token: { colorBgContainer },
  } = theme.useToken();



  return (
    loading ? <div className="w-[100vw] flex justify-center items-center h-[100vh]"><Spin size="large" /></div> :
      <Layout className='h-[100vh]' >
        <Sider trigger={null} collapsible collapsed={collapsed} className="!bg-gray-100">
          <Link to="/">
            {
              !collapsed ?
                <div className="logo flex pt-4 mb-8 justify-center items-center" >
                  <img className="h-[35px] mr-2" src='https://coursesbe.s3.ap-southeast-1.amazonaws.com/c572dcfd-998f-4d93-b40f-6d105dcbdb49-logo-learning.png' />
                  <h4 className='text-black text-lg font-bold'>Wizcove IT</h4>
                </div> :
                <div className="logo flex pt-4 mb-8 justify-center items-center" >
                  <img className="h-[35px]" src='https://coursesbe.s3.ap-southeast-1.amazonaws.com/c572dcfd-998f-4d93-b40f-6d105dcbdb49-logo-learning.png' />

                </div>
            }
          </Link>

          <Menu
            theme='light'
            mode="inline"
            selectedKeys={[selectedMenu]}
            items={auth.user?.role === "admin" ? [
              {
                key: '1',
                icon: <RiDashboardLine />,
                label: 'Dashboard',
                onClick: () => {
                  navigate('/admin')
                }
              },
              {
                key: '2',
                icon: <UserOutlined />,
                label: 'Users',
                onClick: () => {
                  navigate('/admin/user')
                }
              },
              {
                key: '3',
                icon: <FaRoute />,
                label: 'Roadmaps',
                onClick: () => {
                  navigate('/admin/roadmap')
                }
              },
              {
                key: '4',
                icon: <HiOutlineBookOpen />,
                label: 'Courses',
                onClick: () => {
                  navigate('/admin/course')
                }
              },
              {
                key: '5',
                icon: <MdOutlineReviews />,
                label: 'Reviews',
                onClick: () => {
                  navigate('/admin/review')
                }
              },
              {
                key: '6',
                icon: <MdOutlinePayments />,
                label: 'Payments',
                onClick: () => {
                  navigate('/admin/payment')
                }
              },
              {
                key: '7',
                icon: <MdOutlineCategory />,
                label: 'Categories',
                onClick: () => {
                  navigate('/admin/categories')
                }
              },
            ] :
              [

                {
                  key: '1',
                  icon: <RiDashboardLine />,
                  label: 'Dashboard',
                },
                {
                  key: '2',
                  icon: <UserOutlined />,
                  label: 'Users',
                  onClick: () => {
                    navigate('/admin/user')
                  }
                },
                {
                  key: '3',
                  icon: <FaRoute />,
                  label: 'Roadmaps',
                },
                {
                  key: '4',
                  icon: <HiOutlineBookOpen />,
                  label: 'Courses',
                  onClick: () => {
                    navigate('/admin/course')
                  }
                },
                {
                  key: '5',
                  icon: <MdOutlineReviews />,
                  label: 'Reviews',
                  onClick: () => {
                    navigate('/admin/review')
                  }
                },
                {
                  key: '6',
                  icon: <MdOutlinePayments />,
                  label: 'Payments',
                  onClick: () => {
                    navigate('/admin/payment')
                  }
                },
              ]
            }
          />
        </Sider>
        <Layout className="site-layout min-w-[1200px] h-[100vh]">
          <Header className="!bg-white !px-5 flex justify-between items-center" >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <div className='flex justify-end space-x-5 items-center'>
              <a href='https://wizcoveit.netlify.app/meet' target="_blank" className='text-[#0160fa] hover:text-blue-500 '><RiVideoAddFill className='text-2xl' /></a>
              <UserDropdown handelLogout={handelLogout} />

            </div>

          </Header>
          <Content

            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {

              <AdminReviewComponent />


            }

          </Content>
        </Layout>
      </Layout>
  );
}

export default AdminReviewPage;