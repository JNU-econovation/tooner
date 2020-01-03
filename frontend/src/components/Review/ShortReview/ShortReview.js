import React from 'react';
import '../ReviewPage.css';
import Sort from '../Sort';
import WriteReview from './WriteReview';
import ReviewBox from '../ReviewBox';

function ShortReview({json = "http://168.131.30.129:2599/shortreview"}) {
    return(
        <div className="review-container">
            <div className="title-container">
                <span id="page-title">한줄 리뷰</span>
                <span id="guide">한줄 리뷰 이용 가이드</span>
            </div>
            <WriteReview />
            <Sort />
            <ReviewBox json={this.props.json} />
        </div>
    );
}

export default ShortReview;