import React, { useEffect, useState } from 'react'
import PurpleLogo from '../../assets/purple-logo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GreyBell from '../../assets/grey-bell.svg'
import GreyMail from '../../assets/grey-mail.svg'
import UserThumbnail from '../../assets/user-thumbnail.jpg'
import api from '../../configs/api'
import { useDispatch, useSelector } from 'react-redux'
import { checkRole, logout } from '../../configs/redux/authSlice'
import { recruiterHiringHistory, workerHiringHistory } from '../../configs/redux/hireSlice'
import { getProfile } from '../../configs/redux/recruiterSlice'
import { getMyProfile } from '../../configs/redux/workerSlice'

const NavBar = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { token, role } = useSelector((state) => state.auth);
    const notification = useSelector((state) => state.hire.history)

    const workerProfile = useSelector((state) => state.worker.myProfile)
    const recruiterProfile = useSelector((state) => state.recruiter.profile)

    const [myProfile, setMyProfile] = useState({});
    const [showPopover, setShowPopover] = useState(false);
    // const [notification, setNotification] = useState([]);

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };

    const handleLogOut = () => {
        dispatch(logout({ navigate }));
    };

    useEffect(() => {
        if (token) {
            dispatch(checkRole());
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (role) {
            if (role === 'Recruiter') {
                dispatch(getProfile())
            } else {
                dispatch(getMyProfile())
            }

            if (role === 'Recruiter') {
                dispatch(recruiterHiringHistory())
            } else {
                dispatch(workerHiringHistory())
            }
        }
    }, [dispatch, role]);

    useEffect(() => {
        if (role === 'Recruiter') {
            setMyProfile(recruiterProfile)
        } else {
            setMyProfile(workerProfile)
        }
    }, [role, recruiterProfile, workerProfile])

    const handleProfile = () => {
        if (role === 'Recruiter') {
            navigate(`/company/profile/`);
        } else {
            navigate(`/talent/profile/`);
        }
    };

    const preLogin =
        <div className="px-[150px] py-8 bg-white max-lg:p-8">
            <div className='container mx-auto flex justify-between items-center'>
                <Link to='/'><img className="h-[35px]" src={PurpleLogo} alt="" /></Link>
                <div className="flex gap-4">
                    <Link to='/login'><button
                        className="px-5 py-[10px] border border-solid border-[#5E50A1] rounded-[4px] font-bold text-sm leading-6 text-[#5E50A1]">Log In</button></Link>
                    <Link to='/register-talent'><button
                        className="px-5 py-[10px] border border-solid border-[#5E50A1] rounded-[4px] font-bold text-sm leading-6 text-white bg-[#5E50A1]">Sign Up</button></Link>
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
                                className="absolute w-[300px] flex flex-col gap-4 bg-white border border-gray-300 shadow rounded p-4 z-10 top-full mt-2 left-1/2 transform -translate-x-1/2"
                            >
                                {notification.map((item) => (
                                    <div key={item.id}>
                                        {role === 'Recruiter' ? `Hi ${item.recruiter_name}, you have successfully sent a message for ${item.worker_name}, a ${item.worker_position} at ${item.worker_workplace} for ${item.purpose} opportunity.` : `Hi ${item.worker_name}, you have a new ${item.purpose} opportunity from ${item.recruiter_name} at ${item.recruiter_company}. Please check your email for details.`}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <img src={GreyMail} />
                    <img className='size-[32px] rounded-full cursor-pointer' src={myProfile.photo ? myProfile.photo : UserThumbnail} onClick={handleProfile} />
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