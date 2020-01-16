import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './WritePost.css';

import { AuthContext } from '../../Context/AuthProvider';

function WritePost(props) {
    const { state } = React.useContext(AuthContext);

    const { register, handleSubmit } = useForm();
    const [status, setStatus] = useState(200);
    const history = useHistory();
    const onSubmit = (data) => {
        console.log(data);
        console.log(props.json)
        let config = {
            headers: {
                'authtoken': state.token
            }
        }
        axios.post(props.json, data, config)
        .then(res => {
            console.log(res);
            setStatus(res.status);
            // 작성한 글 페이지로 가는 거 추가하기 
            if(status === 200) history.goBack();
        }).catch(err => {
            setStatus(401);
        });
    };
    return(
        <form className="write-post-container" onSubmit={handleSubmit(onSubmit)}>
            {
                status === 401 ? (
                    <span id="message">* 글 올리기에 실패했습니다.</span>
                ) : (
                    null
                )
            }
            <div id="post-title">
                {/*<label htmlFor="post-title">제목</label>*/}
                <input type="text" name="title" id="post-title" placeholder="제목을 입력해주세요." ref={register} />
            </div>
            <textarea id="post-content" name="content" placeholder="내용을 입력해주세요." ref={register} />
            <div id="button-container">
                <button type="submit" id="submit-post">올리기</button>
            </div>
        </form>
    );
}

export default WritePost;