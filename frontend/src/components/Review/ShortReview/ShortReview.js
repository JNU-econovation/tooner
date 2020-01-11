import React, { useState, useEffect } from 'react';
import '../../SinglePage.css';
import Sort from '../Sort';
import WriteReview from './WriteReview';
import ReviewBox from '../ReviewBox';
import ShortReviewGuide from '../../Modal/ShortReviewGuide/ShortReviewGuide';

function ShortReview() {
    const url = "http://168.131.30.129:2599/shortreview";
    const [state, setState] = useState({
        isModalOpen: false
    })
    const openModal = () => {
        setState({ isModalOpen: true });
    }
    const closeModal = () => {
        setState({ isModalOpen: false });
    }
    useEffect(() => {
    });
    return(
        <div className="page-container">
            <div className="title-container">
                <span id="page-title">한줄 리뷰</span>
                <span id="guide" onClick={openModal} >한줄 리뷰 이용 가이드</span>
                <ShortReviewGuide isOpen={state.isModalOpen} close={closeModal} />
            </div>
            
            <WriteReview json={url} />
            <Sort />
            <ReviewBox json={url} />
        </div>
    );
}

export default ShortReview;