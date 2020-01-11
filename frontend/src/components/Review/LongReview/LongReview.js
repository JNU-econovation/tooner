import React from 'react';
import { Link } from 'react-router-dom';
import '../../SinglePage.css';
import './WriteReview.css';
import Sort from '../Sort';
import ReviewBox from '../ReviewBox';

function LongReview({ match }) {
    var title = '좋아하는 웹툰';
    var url = "http://168.131.30.129:2599/longreview";
    return(
        <div className="page-container">
            <div className="title-container">
                <span id="page-title">상세 리뷰</span>
                <span id="guide">상세 리뷰 이용 가이드</span>
            </div>
            <div className="write-review-container">
                {/*<button id="press-to-select">눌러서 리뷰할 작품 찾기</button>*/}
                <span>{title}</span>
                <Link to={{
                    pathname: `${match.path}/write`,
                    title: title,
                    json: url
                }}>
                    <button id="go-to-review">리뷰하러 가기</button>
                </Link>
            </div>
            <Sort />
            <ReviewBox json={url} />
        </div>
    );
}

export default LongReview;