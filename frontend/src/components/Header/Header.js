import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom';


function Header() {
    return (
      <header>
        <div className="banner-container">
          <Link to="/">
            <img id="banner" src="./banner.png" alt=""/>
          </Link>
        </div>
        <div className="user-container">
            <Link to="/login">
                <button className="login">로그인</button>
            </Link>
            <Link to="/signup">
                <button className="sign">회원가입</button>
            </Link>
        </div>
      </header>
    );
}
  
export default Header