import React, { useEffect, useState } from 'react';
import authApi from '../../api/authApi';
import './ProfilePage.css'; 

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await authApi.getProfile();
                setProfile(response.data);
            } catch (error) {
                console.error("Profil bilgisi çekilemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const getRoleClass = (role) => {
        if (!role) return 'role-default';
        const r = role.toUpperCase();
        if (r === 'MANAGER') return 'role-manager';
        if (r === 'EMPLOYEE' || r === 'WAITER') return 'role-employee';
        if (r === 'CUSTOMER') return 'role-customer';
        return 'role-default';
    };

    if (loading) return (
        <div className="profile-container">
            <div className="loading-msg">Profile loading... ☕</div>
        </div>
    );

    if (!profile) return (
        <div className="profile-container">
            <div className="error-msg">No profile information found.</div>
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h2>My Profile</h2>
                </div>
                
                <div className="profile-body">
                    
                    <div className="profile-row">
                        <span className="info-label">Name Surname</span>
                        <span className="info-value">{profile.firstName} {profile.lastName}</span>
                    </div>

                    <div className="profile-row">
                        <span className="info-label">Email</span>
                        <span className="info-value">{profile.email}</span>
                    </div>

                    <div className="profile-row">
                        <span className="info-label">Role</span>
                        <span className={`role-badge ${getRoleClass(profile.role)}`}>
                            {profile.role}
                        </span>
                    </div>

                    <div className="profile-row">
                        <span className="info-label">User ID</span>
                        <span className="info-value id-value">#{profile.id}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;