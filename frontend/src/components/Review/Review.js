import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import StarRating from 'react-svg-star-rating';
import Confirm from '../Modal/Confirm/Confirm';
import ShortReviewModal from '../Modal/ShortReviewModal/ShortReviewModal';
import './Review.css';

function Review({ api, articleid, title, rating, preference, good, bad, image, content, updateCheck }) {
    if(image != null) image = "/uploads/images/" + image;
    if(bad === null) bad = [];
    if(good === null) good = [];
    //if(bad[0] === "") bad[0] = "없음";
    var mark = "○";
    if(preference === 1) {
        mark = "△";
    } else if(preference === 2) {
        mark = "×";
    }

    // edit
    const [isModalOpen, setModal] = useState(false);
    const openModal = () => {
        setModal(true);
    }
    const closeModal = (update) => {
        setModal(false);
        updateCheck(update);
    }

    const [isConfirmOpen, setConfirm] = useState(false);
    const openConfirm = () => {
        setConfirm(true);
        console.log(isConfirmOpen);
    }
    const closeConfirm = (confirm) => {
        if(confirm) {
            let delete_api = `${api}/${articleid}`;
            let config = {
                headers: {
                    authtoken: localStorage.getItem('token')
                }
            }
            axios.delete(delete_api, config)
            .then(
                res => {
                    updateCheck(confirm);
                    console.log(res);
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        }
        setConfirm(false);
    }

    return (
        <div className="review-box">
            <div className="review-data">
                <ul>제목</ul><li>{title}</li>
                <ul>별점</ul>
                    <StarRating
                        containerClassName="rating-container"
                        initialRating={rating}
                        size="20"
                        isReadOnly="true"
                    />
                <ul>취향</ul><li>{mark}</li>
                <ul>좋았던 점</ul>
                    {good.map((
                        good_point,
                        index
                    ) => (
                        <li key={index}>
                            {good_point}&nbsp;
                        </li>    
                    ))}
                <ul>아쉬운 점</ul>
                    {bad.map((
                        bad_point,
                        index
                    ) => (
                        <li key={index}>
                            {bad_point}&nbsp;
                        </li>    
                    ))}
                <div id="edit-wrap">
                    <button id="edit" onClick={openModal}><i class="fas fa-edit"></i></button>
                    {
                        isModalOpen && 
                        <ShortReviewModal
                            isOpen={isModalOpen}
                            close={closeModal}
                            articleid={articleid}
                            review={{ title, rating, preference, content }}
                            good={good}
                            bad={bad}
                        />
                    }
                    <button id="delete" onClick={openConfirm}><i className="fas fa-trash-alt"></i></button>
                    {
                        isConfirmOpen &&
                        <Confirm
                            isOpen={isConfirmOpen}
                            close={closeConfirm}
                            message="이 리뷰를 삭제하시겠습니까?"
                        />
                    }
                </div>
            </div>
            
            <div className="review-content">
                <div id="img-wrapper">
                    <img src={image} alt={title} />
                </div>
                <span>{content.slice(0,301)}</span>
            </div>
        </div>
    );
}

Review.propTypes = {
    articleid: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    preference: PropTypes.number.isRequired,
    good: PropTypes.arrayOf(PropTypes.string).isRequired,
    bad: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default Review;