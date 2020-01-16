import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PostBox.css';
import './Main.css'

function SinglePostBox(props) {
  const className = "singleBox " + props.class;
  const api = "http://168.131.30.129:2599" + props.api;
  const [posts, setPosts] = useState([
    {
      title: '글을 불러오는 중입니다...'
    },
    {
      title: '글을 불러오는 중입니다...'
    },
    {
      title: '글을 불러오는 중입니다...'
    },
    {
      title: '글을 불러오는 중입니다...'
    }
  ]);

  useEffect(() => {
    axios.get(api)
    .then(res => {
        setPosts(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }, [posts]);

  return (
    <div className={className}>
      <div id="postType">
        <span>{props.postType}</span>
      </div>
      <hr />
      <div>
        <ul>
          {
            posts.map(post => {
              return(
                <Link to={`${props.path}/post/${post.articleid}`}>
                  {
                    props.class === "recommendReview" ? (
                      <li>[{post.title}] {post.reviewtitle}</li>
                    ) : (
                      <li>{post.title}</li>
                    )
                  }
                </Link>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}
  
function PostBox() {
  return (
    <div className="postBox">
      <SinglePostBox class="notice" api="/boardthumb/notice" path="/board/notice" postType="공지사항" />
      <SinglePostBox class="recommendReview" api="/toplike/longreview" path="/review/long" postType="추천 리뷰" />
      <SinglePostBox class="recentPosts" api="/boardthumb/webtoon" path="/board/webtoon" postType="최신글" />
      <SinglePostBox class="popularPosts" api="/tophit/webtoon" path="/board/webtoon" postType="인기글" />
    </div>
  );
}

  export default PostBox;