import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from '../../pages/Landing'
import Home from '../../pages/Main/Home';
import Login from '../../pages/Auth/Login';
import ProfileTalent from '../../pages/Main/ProfileTalent';
import EditTalent from '../../pages/Main/EditTalent';
import HireTalent from '../../pages/Main/HireTalent';
import ProfileCompany from '../../pages/Main/ProfileCompany';
import RegisterTalent from '../../pages/Auth/RegisterTalent';
import RegisterRecruiter from '../../pages/Auth/RegisterRecruiter';
import EditCompany from '../../pages/Main/EditCompany';
import ProtectedRoute from '../../components/module/ProtectedRoute';
import MyProfileTalent from '../../pages/Main/MyProfileTalent';


const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register-talent" element={<RegisterTalent />} />
                <Route path="/register-recruiter" element={<RegisterRecruiter />} />
                <Route path="/talent" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/talent/profile/:id" element={
                    <ProtectedRoute>
                        <ProfileTalent />
                    </ProtectedRoute>
                } />
                <Route path="/talent/profile/" element={
                    <ProtectedRoute>
                        <MyProfileTalent />
                    </ProtectedRoute>
                } />
                <Route path="/talent/profile/edit" element={
                    <ProtectedRoute>
                        <EditTalent />
                    </ProtectedRoute>
                } />
                <Route path="/talent/profile/:id/hire" element={
                    <ProtectedRoute>
                        <HireTalent />
                    </ProtectedRoute>
                } />
                <Route path="/company/profile" element={
                    <ProtectedRoute>
                        <ProfileCompany />
                    </ProtectedRoute>
                } />
                <Route path="/company/profile/edit" element={
                    <ProtectedRoute>
                        <EditCompany />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter