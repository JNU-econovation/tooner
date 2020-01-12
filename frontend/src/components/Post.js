import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Post.css';

function Post({ writeralias, title, content, writetime, edittime, hit, like, dislike }) {
    var isEdited = edittime == null ? false : true;
    const clickLike = () => {
        console.log('clickLike');
    }
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
            <div id="content-wrap">
                {content}
            </div>
            <div id="like-container">
                <div id="like">
                    <i className="far fa-thumbs-up"></i>
                    {like}
                </div>
                <div id="dislike">
                    <i class="far fa-thumbs-down"></i>
                    {dislike}
                </div>
            </div>
        </div>
    );
}

Post.propTypes = {
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