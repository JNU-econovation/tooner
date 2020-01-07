import React from 'react'
import '../../Sort.css';

function Sort() {
    return(
        <div className="review-sort">
            <ul>유료분</ul>
                <li>포함</li>
                <li>제외</li>
            <ul>정렬</ul>
                <li>최신순</li>
                <li>조회순</li>
        </div>
    );
}

export default Sort;