import React from 'react';
import PropTypes from 'prop-types';
import './Review.css';

function Review({ articleid, title, rating, preference, good, bad, image, content }) {
    if(image != null) image = "http://168.131.30.129:2599/" + image;
    if(bad == "") bad = [];
    return (
        <div className="review-box">
            <div className="review-data">
                <ul>제목</ul><li>{title}</li>
                <ul>별점</ul><li>{rating}</li>
                <ul>취향</ul><li>{preference}</li>
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
            </div>
            <div className="review-content">
                <div id="img-wrapper">
                    <img src={image} />
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