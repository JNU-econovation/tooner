import React from 'react';
import './ShortReview.css';

function WriteReview() {
    return(
        <div>
            <p>눌러서 리뷰할 작품 찾기</p>
            <p><textarea /></p>
            <div>
                <button>다시 쓰기</button>
                <button>확인</button>
            </div>
        </div>
    );
}

export default WriteReview;