import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import UserProfile from './UserProfile';
import './MyPage.css'
import axios from 'axios';


function MyPage() {
    const api = "http://168.131.30.129:2599/userinfo";

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