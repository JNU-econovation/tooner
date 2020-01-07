import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PostList.css'

function PostList({ articleid, writeralias, title, writetime, edittime, hit, like }) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // Jan = 0
    var yyyy = today.getFullYear();
    today = mm + '-' + dd + '-' + yyyy;
    writetime = today > writetime ? writetime.slice(12,16) : writetime.slice(0, 10);
    return(
        <div className="post-list">
            {/*<div className="post-id">
                <span>{articleid}</span>
            </div>*/}
            <div className="post-title">
                <Link to={`/board/webtoon/${articleid}`}>
                    <span>{title}</span>
                </Link>
            </div>
            <div className="post-writer post-border align-center">
                <span>{writeralias}</span>
            </div>
            <div className="post-time post-border align-center">
                <span>{writetime}</span>
            </div>
            <div className="post-hit post-border align-center">
                <span>{hit}</span>
            </div>
            <div className="post-like post-border align-center">
                <span>{like}</span>
            </div>
        </div>
    );
}

PostList.propTypes = {
    articleid: PropTypes.number.isRequired,
    writeralias: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    writetime: PropTypes.string.isRequired,
    edittime: PropTypes.string.isRequired,
    hit: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired
}

export default PostList;