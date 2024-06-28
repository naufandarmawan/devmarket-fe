import React, { useEffect, useState } from 'react'
import PurpleLogo from '../../assets/purple-logo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GreyBell from '../../assets/grey-bell.svg'
import GreyMail from '../../assets/grey-mail.svg'
import Person1 from '../../assets/person-1.png'
import api from '../../configs/api'
import { useDispatch, useSelector } from 'react-redux'
import { checkRole, logout } from '../../configs/redux/authSlice'

const NavBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, role } = useSelector((state) => state.auth);

    const [myProfile, setMyProfile] = useState({});
    const [showPopover, setShowPopover] = useState(false);
    const [notification, setNotification] = useState([]);

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };

    const handleLogOut = () => {
        dispatch(logout());
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            dispatch(checkRole());
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (role) {
            if (role === 'recruiter') {
                api.get('/recruiters/profile')
                    .then((res) => {
                        const result = res.data.data;
                        setMyProfile(result);
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            } else {
                api.get('/workers/profile')
                    .then((res) => {
                        const result = res.data.data;
                        setMyProfile(result);
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            }

            if (role === 'recruiter') {
                api.get('/hire/recruiters')
                    .then((res) => {
                        const result = res.data.data;
                        setNotification(result);
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            } else {
                api.get('/hire/workers')
                    .then((res) => {
                        const result = res.data.data;
                        setNotification(result);
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            }
        }
    }, [role]);

    const handleProfile = () => {
        if (role === 'recruiter') {
            navigate(`/company/profile/`);
        } else {
            navigate(`/talent/profile/${myProfile.id}`);
        }
    };

    // const navigate = useNavigate()

    // const [myProfile, setMyProfile] = useState({})
    // const [myRole, setMyRole] = useState('')
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [showPopover, setShowPopover] = useState(false);
    // const [notification, setNotification] = useState([])

    // const togglePopover = () => {
    //     setShowPopover(!showPopover);
    // };

    // const handleLogOut = () => {
    //     api.get(`/auth/logout`)
    //         .then((res) => {
    //             localStorage.removeItem('token')
    //             localStorage.removeItem('refreshToken')
    //             alert(res.data.message);
    //             setIsLoggedIn(false);
    //             navigate("/")
    //         })
    //         .catch((err) => {
    //             console.log(err.response);
    //         })
    // }


    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         setIsLoggedIn(true);
    //     } else {
    //         setIsLoggedIn(false);
    //     }
    //     if (isLoggedIn) {
    //         api.get(`/auth/check-role`)
    //             .then((res) => {
    //                 const result = res.data.data.data.role;
    //                 setMyRole(result);
    //             })
    //             .catch((err) => {
    //                 console.log(err.response);
    //             });

    //         if (myRole === 'recruiter') {
    //             api.get(`/recruiters/profile`)
    //                 .then((res) => {
    //                     const result = res.data.data;
    //                     setMyProfile(result);
    //                 })
    //                 .catch((err) => {
    //                     console.log(err.response);
    //                 });
    //         } else {
    //             api.get(`/workers/profile`)
    //                 .then((res) => {
    //                     const result = res.data.data;
    //                     setMyProfile(result);
    //                 })
    //                 .catch((err) => {
    //                     console.log(err.response);
    //                 });
    //         }
    //     }

    //     if (myRole === 'recruiter') {
    //         api.get(`/hire/recruiters`)
    //             .then((res) => {
    //                 const result = res.data.data
    //                 setNotification(result)
    //             })
    //             .catch((err) => {
    //                 console.log(err.response);
    //             })
    //     } else {
    //         api.get(`/hire/workers`)
    //             .then((res) => {
    //                 const result = res.data.data
    //                 setNotification(result)
    //             })
    //             .catch((err) => {
    //                 console.log(err.response);
    //             })
    //     }

    // }, [isLoggedIn, myRole])

    // const handleProfile = () => {
    //     if (myRole === 'recruiter') {
    //         navigate(`/company/profile/`)
    //     } else {
    //         navigate(`/talent/profile/${myProfile.id}`)
    //     }
    // }

    const preLogin =
        <div className="px-[150px] py-8 bg-white max-lg:p-8">
            <div className='container mx-auto flex justify-between items-center'>
                <Link to='/'><img className="h-[35px]" src={PurpleLogo} alt="" /></Link>
                <div className="flex gap-4">
                    <Link to='/login'><button
                        className="px-5 py-[10px] border border-solid border-[#5E50A1] rounded-[4px] font-bold text-sm leading-6 text-[#5E50A1]">Masuk</button></Link>
                    <Link to='/register-talent'><button
                        className="px-5 py-[10px] border border-solid border-[#5E50A1] rounded-[4px] font-bold text-sm leading-6 text-white bg-[#5E50A1]">Daftar</button></Link>
                </div>
            </div>
        </div>

    const landingPostLogin =
        <div className="px-[150px] py-8 bg-white max-lg:p-8">
            <div className='container mx-auto flex justify-between items-center'>
                <div className='flex gap-24 items-center'>
                    <Link to='/'><img className="h-[35px] " src={PurpleLogo} alt="" /></Link>
                    <Link to='/talent' className='font-semibold text-lg leading-7 text-[#1F2A36]'>Home</Link>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleProfile}
                        className="px-5 py-[10px] border border-solid border-[#5E50A1] rounded-[4px] font-bold text-sm leading-6 text-white bg-[#5E50A1]">Profile</button>
                    <button onClick={handleLogOut}
                        className="px-5 py-[10px] border border-solid border-[#5E50A1] rounded-[4px] font-bold text-sm leading-6 text-white bg-[#5E50A1]">Log Out</button>
                </div>
            </div>
        </div>

    const postLogin =
        <div className="px-[150px] py-8 bg-white max-lg:p-8">
            <div className='container mx-auto flex justify-between items-center'>
                <Link to='/'><img className="h-[35px] " src={PurpleLogo} alt="" /></Link>
                <div className="flex gap-10 items-center">
                    {/* <img src={GreyBell} onClick={togglePopover} /> */}
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={GreyBell} onClick={togglePopover} />
                        {/* <button onClick={togglePopover}>Toggle Popover</button> */}
                        {showPopover && (
                            <div
                                className="absolute w-[300px] flex flex-col gap-3 bg-white border border-gray-300 shadow rounded p-4 z-10 top-full mt-2 left-1/2 transform -translate-x-1/2"
                            >
                                {notification.map((item) => (
                                    <div key={item.id}>
                                        {role === 'recruiter' ? `Hi ${item.recruiter_name}, you have successfully sent a message for ${item.worker_name}, a ${item.worker_job_desk} at ${item.worker_workplace} for ${item.message_purpose} opportunity.` : `Hi ${item.worker_name}, you have a new ${item.message_purpose} opportunity from ${item.recruiter_name}, ${item.recruiter_position} at ${item.recruiter_company}. Please check your email for details.`}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <img src={GreyMail} />
                    <img className='size-[32px] rounded-full cursor-pointer' src={myProfile.photo ? myProfile.photo : Person1} onClick={handleProfile} />
                    <button onClick={handleLogOut}
                        className="px-5 py-[10px] border border-solid border-[#5E50A1] rounded-[4px] font-bold text-sm leading-6 text-white bg-[#5E50A1]">Log Out</button>
                </div>
            </div>
        </div>


    const getLocation = useLocation();

    if (getLocation.pathname === '/' && token) {
        return landingPostLogin
    } else if (getLocation.pathname === '/') {
        return preLogin
    } else {
        return postLogin
    }
}

export default NavBar