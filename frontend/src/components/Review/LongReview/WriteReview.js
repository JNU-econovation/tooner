import React from 'react';
import { Route, Link } from 'react-router-dom';
import './WriteReview.css';

function WriteReview(props) {
    return(
        <div className="write-review-container">
            <button id="press-to-select">눌러서 리뷰할 작품 찾기</button>
            <span>합격시켜주세용</span>
            <Link to={`${props.path}/write`}>
                <button id="go-to-review">리뷰하러 가기</button>
            </Link>
        </div>
    );
}

export default WriteReview;