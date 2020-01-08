import React, { useState, useEffect } from 'react';
import SearchToon from '../../Modal/SearchToon/SearchToon';
import './WriteReview.css';

function WriteReview() {
    const [state, setState] = useState({
        data: {},
        isModalOpen: false
    })
    const { data, isModalOpen } = state;
    const openModal = () => {
        setState({ data, isModalOpen: true });
    }
    const handleChildClick = (data) => {
        setState({ data, isModalOpen: false });
    }
    useEffect( () => {
        console.log('data is rendered');
        console.log(state);
    });
    return(
        <div className="write-review-container">
            <button id="press-to-select" onClick={openModal}>눌러서 리뷰할 작품 찾기</button>
            <span>{state.data.title}</span>
            <SearchToon isOpen={isModalOpen} close={handleChildClick} />
            <textarea name="write-box" />
            <div id="button-box">
                {/*<button type="reset" onClick={reset} id="reset">다시 쓰기</button>*/}
                <button type="submit" id="submit">확인</button>
            </div>
        </div>
    );
}

export default WriteReview;