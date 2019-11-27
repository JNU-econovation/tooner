import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom';


function Header() {
    return (
      <header>
        <div className="banner-container inline">
          <Link to="/">
            <img id="banner" src="./banner.png" alt=""/>
          </Link>
        </div>
        <div className="userButton inline">
            <Link to="/login">
                <button className="login">로그인</button>
            </Link>
            <Link to="/sign">
                <button className="sign">회원가입</button>
            </Link>
        </div>
      </header>
    );
}
  
export default Header