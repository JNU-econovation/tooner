import React from 'react';
import PropTypes from 'prop-types';
import './Review.css';

function Review({ articleid, title, rating, preference, good, bad, image, content }) {
    return (
        <div className="review">
            <div className="review-data">
                <span>제목</span><span>{title}</span>
                <span>별점</span><span>{rating}</span>
                <span>취향</span><span>{preference}</span>
                <span>좋았던 점</span>
                {good.map((
                    good_point,
                    index
                ) => (
                    <span key={index}>
                        {good_point} 
                    </span>    
                ))}
                {bad.map((
                    bad_point,
                    index
                ) => (
                    <span key={index}>
                        {bad_point} 
                    </span>    
                ))}
            </div>
            <div>
                <img src={image} />
                <span>{content}</span>
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