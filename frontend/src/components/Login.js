import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './Login.css';

import { AuthContext } from './Context/AuthProvider';

function Login() {
    const login_api = "http://168.131.30.129:2599/login";
    const [status, setStatus] = useState(200);
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const { dispatch } = React.useContext(AuthContext);

    const onSubmit = (data) => {
        axios.post(login_api, data)
        .then(res => {
            setStatus(res.status);
            dispatch({
                type: 'login',
                payload: res.data
            })
            history.goBack();
            throw res;
        })
        .catch(err => {
            setStatus(401);
        })
    }

    return(
        <div className="login-form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login-input-container">
                    <span id="phrase">독자를 위한 커뮤니티, 투너</span>
                    <input type="text" name="username" id="id" placeholder="아이디" ref={register} />
                    <input type="password" name="password" id="password" placeholder="비밀번호" ref={register}  />
                </div>
                {
                    status === 401 ? (
                        <span id="message">* 로그인에 실패하였습니다.</span>
                    ) : (
                        null
                    )
                }
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