
import { RootState } from '../store/types';
import api from '../configs/axiosConfig';
import { setLoading, unsetLoading } from '../store/loadSlice';
import { setNotify } from '../store/notifycationSlide';
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';

const PaymentPage: React.FC = () => {

    const [verifyss, setVerifyss] = useState(false)

    const dispatch = useDispatch()
    const loading = useSelector((state: RootState) => state.root.load)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryParamValue = searchParams.get('success');
    console.log(queryParamValue)



    return (
        <>
{

    queryParamValue == "1"?
    <div className='flex justify-center items-center flex-col w-[100vw] h-[100vh]'>
    <video autoPlay muted loop className="h-[400px] w-[400px] max-sm:h-[200px] max-sm:w-[200px] mx-auto object-cover">
        <source src="https://player.vimeo.com/progressive_redirect/playback/818999937/rendition/540p/file.mp4?loc=external&oauth2_token_id=57447761&signature=bce4679fe53a98a8fd9a541e7b2d928e62c54cdd7f535940511a7705c3ba814a" type="video/mp4" />
    </video>
    <h5 className='text-xl font-semibold px-8 mb-5 max-w-[500px] text-center text-green-700 mt-[-100px]'>You have successfully purchased the course, the course will help you master the knowledge from basic to advanced</h5>
    <p className='text-base font-medium '>Back to: <Link to={'/my-courses'}><Button className='bg-blue-600 text-white'>My course</Button></Link></p>

</div>:
<div className='flex justify-center items-center flex-col w-[100vw] h-[100vh]'>
                            <video autoPlay muted loop className="h-[200px] w-[200px] max-sm:h-[100px] max-sm:w-[100px] mx-auto object-cover">
                                <source src="https://player.vimeo.com/progressive_redirect/playback/818999938/rendition/540p/file.mp4?loc=external&oauth2_token_id=57447761&signature=e726da7f68bb319f589489b82f56eb44d664108be9846e1d370f43ca25bfb314" type="video/mp4" />
                            </video>
                            <h5 className='text-xl font-semibold px-8 mb-5 text-red-600 '>You have unsuccessfully purchased the course,</h5>
                            <p className='text-base font-medium '>Back to home: <Link to={'/'}><Button className='bg-blue-600 text-white'>Home</Button></Link></p>

                        </div>
}
               
                           
       
        </>
    );
}

export default PaymentPage;
