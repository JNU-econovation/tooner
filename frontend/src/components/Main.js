import React from 'react';
import MiddleHeader from './MiddleHeader/MiddleHeader';
import SideMenu from './SideMenu/SideMenu';
import Field from './Field/Field';
import ChatBox from './ChatBox/ChatBox';
import './Main.css';

function Main() {
    return (
        <div>
            <MiddleHeader />
            <div className="main">
                <SideMenu />
                <Field />
                <ChatBox />
            </div>
        </div>
    )
}

export default Main;