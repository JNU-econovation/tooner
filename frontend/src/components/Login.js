import React from 'react';
import './Login.css';

function Login() {
    return(
        <div className="login-form-container">
            <form>
                <div className="login-input-container">
                    <span id="phrase">독자를 위한 커뮤니티, 투너</span>
                    <input type="text" id="id" placeholder="아이디" />
                    <input type="password" id="password" placeholder="비밀번호" />
                </div>
                <div className="login-container">
                    <button type="submit" id="login">로그인</button>
                </div>
            </form>
            <div className="find-info">
                <a id="find-id">아이디/비밀번호 찾기</a>
                <span id="bar" aria-hidden="true">|</span>
                <a id="sign">회원가입</a>
            </div>
        </div>
    );
}

export default Login;