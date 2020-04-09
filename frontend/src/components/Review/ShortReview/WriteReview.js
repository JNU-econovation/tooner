import React, { useState } from 'react';
import ShortReviewModal from '../../Modal/ShortReviewModal/ShortReviewModal';
import './WriteReview.css';

function WriteReview(props) {
    // initialize
    var key = 3000;

    // setModal
    const [isModalOpen, setModal] = useState(false);
    const [status, setStatus] = useState(200);

    const openModal = () => {
        setModal(true);
    }

    const closeModal = (status) => {
        setStatus(status);
        setModal(false);
    }

    return(
        <div className="write-review-container">
            {
                status === 401 ? (
                    <p id="message">* 등록에 실패하였습니다.</p>
                ) : (
                    null
                )
            }
            <button id="press-to-select" onClick={openModal}>눌러서 한줄 리뷰하기</button>
            {/*<span>{title}</span>*/}
            {
                isModalOpen &&
                <ShortReviewModal
                    isOpen={isModalOpen}
                    close={closeModal}
                    articleid={-1}
                />
            }
        </div>
    );
}

export default WriteReview;