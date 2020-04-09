import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import UserProfile from './UserProfile';
import './MyPage.css'


function MyPage() {
    const api = "/userinfo";

    return(
        <div className="page-container">
            <div className="title-container">
                <span id="page-title">마이페이지</span>
                <UserProfile api={api} />
            </div>
            <br />
        </div>
    )
}

export default MyPage;