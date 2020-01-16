import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Post.css';

function Post({ articleid, writeralias, title, content, writetime, edittime, image, hit, like, dislike }) {
    console.log(image)
    const img_api = "http://168.131.30.129:2599/uploads/images/" + image[0];
    const like_api = "http://168.131.30.129:2599/longreview/like/" + articleid;
    const dislike_api = "http://168.131.30.129:2599/longreview/dislike/" + articleid;

    const [_like, setLike] = useState(like);
    const [_dislike, setDislike] = useState(dislike);

    const headers = {
        authtoken: localStorage.getItem('token')
    }
    const clickLike = () => {
        axios.request({
            url: like_api,
            method: 'post',
            headers
        })
        .then(res => {
            setLike(res.data.like);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const clickDislike = () => {
        axios.request({
            url: dislike_api,
            method: 'post',
            headers
        })
        .then(res => {
            setDislike(res.data.dislike);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
    }, []);

    var isEdited = edittime == null ? false : true;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // Jan = 0
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    writetime = today > writetime ? writetime.slice(12,16) : writetime.slice(0, 10);

    return(
        <div className="post-container">
            <div id="title-wrap">
                <span id="post-title">{title}</span>
            </div>
            <div id="post-info">
                <ul>작성자</ul>
                    <li>{writeralias}</li>
                <ul>작성일</ul>
                    <li>{writetime}</li>
                <ul>수정일</ul>
                    { isEdited ? (
                        <li>{edittime}</li>
                    ) : (
                        <li>{writetime}</li>
                    )}
                <ul>조회수</ul>
                    <li>{hit}</li>
            </div>
            {
                image[0] !== "" &&
                <div id="image-wrap">
                    <img src={img_api} id="image" />
                </div>
            }
            <div id="content-wrap">
                {content}
            </div>
            <div id="like-container">
                <div id="like">
                    <i className="far fa-thumbs-up" onClick={clickLike}></i>
                    {_like}
                </div>
                <div id="dislike">
                    <i class="far fa-thumbs-down" onClick={clickDislike}></i>
                    {_dislike}
                </div>
            </div>
        </div>
    );
}

Post.propTypes = {
    articleid: PropTypes.number.isRequired,
    writeralias: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    writetime: PropTypes.string.isRequired,
    edittime: PropTypes.string.isRequired,
    hit: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    dislike: PropTypes.number.isRequired
}

export default Post;