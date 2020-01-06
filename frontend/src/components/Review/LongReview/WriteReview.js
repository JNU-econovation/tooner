import React from 'react';
import './WriteReview.css';

function WriteReview() {
    return(
        <div className="write-review-container">
            <button id="press-to-select">눌러서 리뷰할 작품 찾기</button>
            <span>합격시켜주세용</span>
            <button id="go-to-review">리뷰하러 가기</button>
        </div>
    );
}

export default WriteReview;