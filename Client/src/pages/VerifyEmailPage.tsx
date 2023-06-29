
import { RootState } from '../store/types';
import api from '../configs/axiosConfig';
import { setLoading, unsetLoading } from '../store/loadSlice';
import { setNotify } from '../store/notifycationSlide';
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';

const VerifyEmailPage: React.FC = () => {

    const [verifyss, setVerifyss] = useState(false)

    const dispatch = useDispatch()
    const loading = useSelector((state: RootState) => state.root.load)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryParamValue = searchParams.get('token');
    console.log(queryParamValue)


    const handelVerify = async (data: { token: string | null }) => {
        dispatch(setLoading({}))
        await api.put('/auth/verify-email', data).then((response: any) => {
            if (response.status === 204) {
                setVerifyss(true)
                dispatch(unsetLoading({}))

            }
        }).catch((error: any) => {
            console.log(error)
            setVerifyss(false)
            dispatch(unsetLoading({}))
        })


    }

    useEffect(() => {

        handelVerify({ token: queryParamValue })
    }, [])


    return (
        <>

            {
                loading.isLoading ?
                    <LoadingComponent /> :
                    <>{
                        verifyss ?
                            <div className='flex justify-center items-center flex-col w-[100vw] h-[100vh]'>
                                <video autoPlay muted loop className="h-[200px] w-[200px] max-sm:h-[100px] max-sm:w-[100px] mx-auto object-cover mb-[100px]">
                                    <source src="https://live.staticflickr.com/video/52814007383/5eed88e0ec/360p.mp4?s=eyJpIjo1MjgxNDAwNzM4MywiZSI6MTY4NDQ4MTc4NywicyI6Ijg0ZTU3MTlkNWMyZjY1NjY3MGRlMzkwYjM0MDE0MDQyM2NkNTZkOWEiLCJ2IjoxfQ" type="video/mp4" />
                                </video>
                                <h5 className='text-xl font-semibold px-8 mb-5 text-green-700 mt-[-100px]'>You have successfully verified your account</h5>
                                <p className='text-base font-medium '>Back to home: <Link to={'/'}><Button className='bg-blue-600 text-white'>Home</Button></Link></p>

                            </div> :
                            <div className='flex justify-center items-center flex-col w-[100vw] h-[100vh]'>
                                <video autoPlay muted loop className="h-[200px] w-[200px] max-sm:h-[100px] max-sm:w-[100px] mx-auto object-cover">
                                    <source src="https://player.vimeo.com/progressive_redirect/playback/818999938/rendition/540p/file.mp4?loc=external&oauth2_token_id=57447761&signature=e726da7f68bb319f589489b82f56eb44d664108be9846e1d370f43ca25bfb314" type="video/mp4" />
                                </video>
                                <h5 className='text-xl font-semibold px-8 mb-5 text-red-600 '>You have unsuccessfully verified your account</h5>
                                <p className='text-base font-medium '>Back to home: <Link to={'/'}><Button className='bg-blue-600 text-white'>Home</Button></Link></p>

                            </div>
                    }

                    </>
            }
        </>
    );
}

export default VerifyEmailPage;
