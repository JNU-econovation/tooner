import React from 'react';
import './PostBox.css';
import './Main.css'

function SinglePostBox(props) {
  const className = "singleBox " + props.class;
    return (
      <div className={className}>
        <div id="postType">
          <span>{props.postType}</span>
        </div>
        <hr />
        <div>
          <ul>
            <li>글1</li>
            <li>글2</li>
            <li>글3</li>
            <li>글4</li>
          </ul>
        </div>
      </div>
    );
  }
  
  function PostBox() {
    return (
      <div className="postBox">
        <SinglePostBox class="notice" postType="공지사항" />
        <SinglePostBox class="recommendReview" postType="추천 리뷰" />
        <SinglePostBox class="popularPosts" postType="인기글" />
        <SinglePostBox class="pleaseFind" postType="찾아주세요" />
      </div>
    );
  }

  export default PostBox;