import React from 'react';
import './WriteReview.css';

function WriteReview() {
    return(
        <div className="write-review-container">
            <p id="write-guide">눌러서 리뷰할 작품 찾기</p>
            <textarea id="write-box" name="write-box" />
            <div id="button-box">
                {/*<button type="reset" onClick={reset} id="reset">다시 쓰기</button>*/}
                <button type="submit" id="submit">확인</button>
            </div>
        </div>
    );
}

export default WriteReview;