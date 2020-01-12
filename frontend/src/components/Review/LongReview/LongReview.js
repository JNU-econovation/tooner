import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import '../../SinglePage.css';
import './WriteReview.css';
import Sort from '../Sort';
import ReviewBox from '../ReviewBox';
import WriteReviewPage from '../WriteReviewPage/WriteReviewPage';
import ReviewGuide from '../../Modal/ReviewGuide/ReviewGuide';

function LongReview({ match }) {
    var title = '좋아하는 웹툰';
    var url = "http://168.131.30.129:2599/longreview";
    const [state, setState] = useState({
        isModalOpen: false
    })
    const openModal = () => {
        setState({ isModalOpen: true });
    }
    const closeModal = () => {
        setState({ isModalOpen: false });
    }
    var content = <div id="guide-detail">
        상세 리뷰입니다!
        아주아주 깨끗한 리뷰 문화를 만들어가요 ^▽^
    </div>

    return(
        <div className="page-container">
            <div className="title-container">
                <span id="page-title">상세 리뷰</span>
                <span id="guide" onClick={openModal}>상세 리뷰 이용 가이드</span>
                <ReviewGuide
                    isOpen={state.isModalOpen}
                    close={closeModal}
                    content={content}
                />
            </div>
            <Route exact path={match.path}>
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
            </Route>
            <Route path={`${match.path}/write`}>
                <WriteReviewPage json={url}/>
            </Route>
        </div>
    );
}

export default LongReview;