import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom';


function Header() {
    return (
      <header>
        <div className="banner-container">
          <Link to="/" id="banner">
            tooner
          </Link>
        </div>
        <div className="user-container">
          <Link to="/review/short">
            <button>한줄 리뷰</button>
          </Link>
          <Link to="/review/long">
            <button>상세 리뷰</button>
          </Link>
          <Link to="/">
            <button>인기글</button>
          </Link>
          <Link to="/board/webtoon">
            <button>웹툰이야기</button>
          </Link>
          <Link to="/question">
            <button>질문게시판</button>
          </Link>
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