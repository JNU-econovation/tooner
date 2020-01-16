import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import '../../SinglePage.css';
import Sort from '../Sort';
import WriteReview from './WriteReview';
import ReviewBox from '../ReviewBox';
import ReviewGuide from '../../Modal/ReviewGuide/ReviewGuide';

function ShortReview({ match }) {
    const api = "http://168.131.30.129:2599/shortreview";

    const [isGuideOpen, setGuide] = useState(false);
    const openGuide = () => {
        setGuide(true);
    }
    const closeGuide = () => {
        setGuide(false);
    }

    var content =
    <div id="guide-detail">
        한줄 리뷰입니다!
        아주아주 깨끗한 리뷰 문화를 만들어가요 ^▽^
    </div>

    useEffect(() => {
    });
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
            <WriteReview api={api} />
            <Sort />
            <Route path={match.path} component={ReviewBox} />
        </div>
    );
}

export default ShortReview;