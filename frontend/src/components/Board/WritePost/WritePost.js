import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './WritePost.css';
import { Link } from 'react-router-dom';

function WritePost(props) {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        console.log(props.json)
        axios.post(props.json, data)
        .then(res => {
            console.log(res);
        });
    };
    return(
        <form className="write-post-container" onSubmit={handleSubmit(onSubmit)}>
            게시판 글 작성
            <div id="post-title">
                <label htmlFor="post-title">제목</label>
                <input type="text" name="title" id="post-title" ref={register} />
            </div>
            <textarea id="post-content" name="content" ref={register} />
            <div id="button-container">
                <input type="submit" value="제출하기" id="submit-post" />
            </div>
        </form>
    );
}

export default WritePost;