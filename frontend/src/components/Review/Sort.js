import React from 'react'
import '../Sort.css';

function Sort() {
    return(
        <div className="review-sort">
            <ul>보기 설정</ul>
                <li>전체 보기</li>
                <li>작품별 보기</li>
                <li>작가별 보기</li>
            <ul>정렬</ul>
                <li>최신순</li>
                <li>별점순</li>
        </div>
    );
}

export default Sort;