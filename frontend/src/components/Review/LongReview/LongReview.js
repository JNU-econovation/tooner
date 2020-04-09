import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import '../../SinglePage.css';
import './WriteReview.css';
import Sort from '../Sort';
import WriteReviewPage from '../WriteReviewPage/WriteReviewPage';
import ReviewGuide from '../../Modal/ReviewGuide/ReviewGuide';
import Board from './Board';
import PostPage from './PostPage';

function LongReview({ match }) {
    var title = '좋아하는 웹툰';
    var api = "/longreview";
    
    const [isModalOpen, setModal] = useState(false);
    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
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
                {
                    isModalOpen &&
                    <ReviewGuide
                        isOpen={isModalOpen}
                        close={closeModal}
                        content={content}
                    />
                }
            </div>
            <Route exact path={match.path}>
                <div className="write-review-container">
                    {/*<button id="press-to-select">눌러서 리뷰할 작품 찾기</button>*/}
                    <span>{title}</span>
                    <Link to={{
                        pathname: `${match.path}/write`,
                        state: {
                            api: api,
                            edit: false
                        }
                    }}>
                        <button id="go-to-review">리뷰하러 가기</button>
                    </Link>
                </div>
                {/*<Sort />*/}
                <Board location={match.path} json={api} />
            </Route>
            <Route path={`${match.path}/write`} component={WriteReviewPage} />
            <Route path={`${match.path}/post/:articleid`}>
                <PostPage location={match.path} json={api}/>
            </Route>
            <Route path={`${match.path}/edit/:articleid`} component={WriteReviewPage} />
        </div>
    );
}

export default LongReview;