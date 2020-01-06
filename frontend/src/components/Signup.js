import React from 'react';
import { Redirect } from 'react-router-dom'
import './Signup.css';

function Signup() {
    return(
        <div className="sign-form-container">
            <form action="http://168.131.30.129:2599/register" method="post">
                <div className="sign-container">
                    <span id="title">회원가입</span>
                    <input type="email" name="username" id="id" placeholder="아이디" />
                    <input type="password" name="password" id="password" placeholder="비밀번호" />
                    <span id="message">* 영문, 숫자를 혼합하여 6~20자로 작성해주세요.</span>
                    <input type="password" id="check-password" placeholder="비밀번호 확인" />
                </div>
                <div className="submit-container">
                    <button type="button" id="cancel">취소</button>
                    <button type="submit" id="submit">확인</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;