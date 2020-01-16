import React, { useState, useContext } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

import AuthHelperMethods from '../Context/AuthHelperMethods';

function Header() {
  const { state, dispatch } = useContext(AuthContext);
  const auth = new AuthHelperMethods();
  return (
    <header>
      <div className="banner-container">
        <Link to="/" id="banner">
          tooner
        </Link>
      </div>
      <div className="user-container">
        {
          state.logged &&
            <React.Fragment>
              <button>
                {auth.getConfirm().useralias} 님, 환영합니다!
              </button>
            </React.Fragment>
        }
        <Link to="/board/notice">
          <button>공지사항</button>
        </Link>
        <Link to="/review/short">
          <button>한줄 리뷰</button>
        </Link>
        <Link to="/review/long">
          <button>상세 리뷰</button>
        </Link>
        {/*<Link to="/">
          <button>인기글</button>
        </Link>*/}
        <Link to="/board/webtoon">
          <button>웹툰이야기</button>
        </Link>
        {/*
        <Link to="/thread">
          <button>스레드</button>
        </Link>
        */}
        {
          !state.logged ? (
            <React.Fragment>
              <Link to="/login">
                <button className="login">로그인</button>
              </Link>
              <Link to="/signup">
                <button className="sign">회원가입</button>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>  
              <Link to="/mypage">
                <button>마이페이지</button>
              </Link>
              <Link to="/">
                <button
                  className="logout"
                  onClick={() => dispatch({
                  type: 'logout'
                })}>로그아웃</button>
              </Link>
            </React.Fragment>
          )
        }
      </div>
    </header>
  );
}
  
export default Header