import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const url = "/register";
    const [status, setStatus] = useState(200);
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const onSubmit = (data) => {
        axios.post(url, data)
        .then(res => {
            console.log(res.status);
            setStatus(res.status);
            console.log(status);
            if(status === 200) history.push('/login');
        }).catch(err => {
            setStatus(401);
        })
    }
    return(
        <div className="sign-form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sign-container">
                    <span id="title">회원가입</span>
                    <input type="email" name="username" id="id" placeholder="아이디" ref={register} />
                    <input type="password" name="password" id="password" placeholder="비밀번호" ref={register} />
                    <span id="message">* 영문, 숫자를 혼합하여 6~20자로 작성해주세요.</span>
                    <input type="password" id="check-password" placeholder="비밀번호 확인" />
                </div>
                {
                    status === 401 ? (
                        <span id="message">회원가입에 실패하였습니다.</span>
                    ) : (
                        null
                    )
                }
                <div className="submit-container">
                    <button type="button" id="cancel">취소</button>
                    <button type="submit" id="submit">확인</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;