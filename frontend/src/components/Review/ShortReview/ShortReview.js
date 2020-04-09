import React, { useState, useEffect } from 'react';
import ShortReviewModal from '../../Modal/ShortReviewModal/ShortReviewModal';
import { Route, useHistory } from 'react-router-dom';

import Sort from '../Sort';
import WriteReview from './WriteReview';
import ReviewBox from '../ReviewBox';
import ReviewGuide from '../../Modal/ReviewGuide/ReviewGuide';
import './ShortReview.css';
import '../../SinglePage.css';
import './WriteReview.css';

function ShortReview({ match }) {
    const api = "/shortreview";

    const [isGuideOpen, setGuide] = useState(false);
    const openGuide = () => {
        setGuide(true);
    }
    const closeGuide = () => {
        setGuide(false);
    }

    // initialize
    var key = 3000;

    // setModal
    const [isModalOpen, setModal] = useState(false);

    const [isUpdate, setUpdate] = useState(false);
    const openModal = () => {
        setModal(true);
        setUpdate(false);
    }

    var newreview = {};
    const [newReview, setNew] = useState({});
    const closeModal = (update) => {
        //console.log(review);
        //newreview = review;
        //setNew(newreview);
        setModal(false);
        setUpdate(update);
    }

    const close = () => {
        setModal(false);
    }

    var content =
    <div id="guide-detail">
        한줄 리뷰입니다!
        아주아주 깨끗한 리뷰 문화를 만들어가요 ^▽^
    </div>

    useEffect(() => {
    }, []);

    return(
        <div className="page-container">
            <div className="title-container">
                <span id="page-title">한줄 리뷰</span>
                <span id="guide" onClick={openGuide} >한줄 리뷰 이용 가이드</span>
                {
                    isGuideOpen &&
                    <ReviewGuide
                        isOpen={isGuideOpen}
                        close={closeGuide}
                        content={content}
                    />
                }
            </div>
            <div className="write-review-container">
                <div id="write-wrap">
                    <button id="press-to-select" onClick={openModal}>눌러서 한줄 리뷰하기</button>
                </div>
                {/*<span>{title}</span>*/}
                {
                    isModalOpen &&
                    <ShortReviewModal
                        isOpen={isModalOpen}
                        close={closeModal}
                        closeModal={close}
                        articleid={-1}
                    />
                }
            </div>
            {/*<Sort />*/}
            <Route path={match.path}>
                <ReviewBox isUpdate={isUpdate} />
            </Route>
        </div>
    );
}

export default ShortReview;