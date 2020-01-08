import React from 'react';
import '../../SinglePage.css';
import Sort from '../Sort';
import WriteReview from './WriteReview';
import ReviewBox from '../ReviewBox';

function LongReview({ match }) {
    return(
        <div className="page-container">
            <div className="title-container">
                <span id="page-title">상세 리뷰</span>
                <span id="guide">상세 리뷰 이용 가이드</span>
            </div>
            <WriteReview path={match.path} />
            <Sort />
            <ReviewBox json="http://168.131.30.129:2599/longreview" />
        </div>
    );
}

export default LongReview;