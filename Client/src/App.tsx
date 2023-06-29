import { Fragment, useEffect, useState, createContext } from "react";
import { Col, DatePicker } from "antd";
import { Routes, Route, useLocation, Link } from 'react-router-dom'

import AdminHomePage from "./pages/AdminHomePage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/types";
import NotificationComponent from "./components/NotificationComponent";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ProfilePage from "./pages/ProfilePage";
import AboutUsPage from "./pages/AboutUsPage";
import AdminUserPage from "./pages/AdminUserPage"
import AdminRoadmapPage from "./pages/AdminRoadmapPage"
import AdminCoursePage from "./pages/AdminCoursePage";
import AdminCourseDetailPage from "./pages/AdminCourseDetailPage";
import CoursesPage from "./pages/CoursesPage";
import DetailCoursesPage from "./pages/DetailCoursePage";
import { unsetLoading } from "./store/loadSlice";
import AdminReviewPage from "./pages/AdminReviewPage";
import DetailCourseLearnPage from "./pages/DetailCourseLearnPage";
import RoadmapsPages from "./pages/RoadmapsPages";
import DetailRoadmapsPages from "./pages/DetailRoadmapsPages";
import MyCoursePage from "./pages/MyCoursePage";
import PaymentPage from "./pages/PaymentPage";
import AdminPaymentPage from "./pages/AdminPaymentPage";
import MyCartPage from "./pages/MyCartPage";
import MeetingPage from "./pages/MeetingPage";
import store from "./store";
import AdminCategoriesPage from "./pages/AdminCategoriesPage";
import api from "./configs/axiosConfig";
import CategoriesPage from "./pages/CategoriesPage";
import KommunicateChat from "./components/ChatboxComponent";

export const optionTreeData = createContext([])


const App = () => {


  //goij oiwt 

  const [treeData, settreeData] = useState([])


  const generateListOption = (data) => {
    const datares = [];
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { id, name, children, slug } = node;
      let addnode = {}
      if (children) {
        addnode = {
          key: id,
          label: <Link to={`/category/${slug}`} >{name}</Link>,
          children: children.length > 0 ? generateListOption(children) : [],
        };
        datares.push(addnode);
      } else {
        addnode = {
          key: id,
          label: <Link to={`/category/${slug}`} >{name}</Link>,

        };
        datares.push(addnode);
      }


    }
    return datares;
  };


  const handelGetDataCategories = async () => {

    await api
      .get(`/categories`)
      .then((response: any) => {
        if (response.status === 200) {
          console.log(generateListOption(response.data))
          settreeData(generateListOption(response.data));

        }
      })
      .catch((error: any) => {

      });
  };


  useEffect(() => {
    handelGetDataCategories()
  }, [])



  //toi



  const auth = useSelector((state: RootState) => state.root.auth)
  const location = useLocation();
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }, [location.pathname])

  useEffect(() => {
    dispatch(unsetLoading({}))


  }, [])



  return (
    // Set Up Routes for website.
    <div>
      <optionTreeData.Provider value={treeData}>
        <Routes>
          {
            auth.user ? <>
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/learn/:id' element={<DetailCourseLearnPage />} />
              <Route path='/my-courses' element={<MyCoursePage />} />
              <Route path='/payment' element={<PaymentPage />} />
              <Route path='/my-cart' element={<MyCartPage />} />
              <Route path='/meet' element={<MeetingPage />} />

              {
                auth.user.role != "user" ? <>
                  <Route path='/admin' element={<AdminHomePage />} />
                  <Route path='/admin/roadmap' element={<AdminRoadmapPage />} />
                  <Route path='/admin/course/:id' element={<AdminCourseDetailPage />} />
                  <Route path='/admin/course' element={<AdminCoursePage />} />
                  <Route path='/admin/review' element={<AdminReviewPage />} />
                  {
                    auth.user.role == "admin" ? <>
                      <Route path='/admin/user' element={<AdminUserPage />} />
                      <Route path='/admin/payment' element={<AdminPaymentPage />} />
                      <Route path='/admin/categories' element={<AdminCategoriesPage />} />

                    </>
                      : null}
                </>
                  : null}
            </>
              : null
          }
          <Route path='/about-us' element={<AboutUsPage />} />
          <Route path='/roadmaps' element={<RoadmapsPages />} />
          <Route path='/roadmap/:id' element={<DetailRoadmapsPages />} />
          <Route path='/course/:id' element={<DetailCoursesPage />} />
          <Route path='/courses' element={<CoursesPage />} />
          <Route path='/verify-email' element={<VerifyEmailPage />} />
          <Route path="/category/:slug" element={<CategoriesPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/*' element={<ErrorPage />} />

        </Routes>
        <NotificationComponent />
      </optionTreeData.Provider>
      <KommunicateChat />

    </div>
  );
};

export default App;
