import React from 'react';
import './WriteReview.css';

function WriteReview(props) {
    console.log(props);
    return(
        <div className="write-review-container">
            <div id="write-title">
                {props.title}
            </div>
        </div>
    );
}

export default WriteReview;