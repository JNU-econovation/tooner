import React from 'react';
import './ShortReview.css';
import WriteReview from './WriteReview';
import ReviewBox from './ReviewBox';

function ShortReview() {
    return(
        <div>
            <div>
                <span>한줄 리뷰</span>
                <span>한줄 리뷰 이용 가이드</span>
            </div>
            <WriteReview />
            <ReviewBox />
        </div>
    );
}

export default ShortReview;