import React from 'react';
import '../components/App.css';

function HotPost(props) {
  return (
    <div className="hotPost inline">
      <span>
       <mark id="hotpost__type">{props.type}</mark>
       &nbsp;&nbsp;&nbsp;{props.title}
      </span>
    </div>
  );
}

function Search(props) {
  var message = "오늘은 [" + props.today + "] 나오는 날!";
  return (
    <div className="search-container">
      <form action="">
        <input type="search" placeholder={message} size="25" />
        <button type="submit"><i className="fa fa-search"></i></button>
      </form>
    </div>
  );
}

function test() {
  console.log("Clicked!");
}

function GoReview() {
  return (
    <div className="go_review">
      <button id="review">
        <img id="review__icon" src="/icon/write.png" alt="" />
        &nbsp;리뷰 쓰러가기
      </button>
    </div>
  );
}

function Category(props) {
  return (
    <div className="category">
      <ul className="category__toppost">
        <li onClick={test}>추천 리뷰</li>
        <li>인기글</li>
      </ul>
      <ul className="category__review">
        <li>한줄 리뷰</li>
        <li>상세 리뷰</li>
      </ul>
      <ul className="category__board">
        <li>자유 게시판</li>
        <li>질문 게시판</li>
        <li>영업 게시판</li>
        <li>찾아주세요</li>
      </ul>
    </div>
  );
}

function Slide(props) {
  return (
    <div className="slide-container">
      슬라이드
    </div>
  );
}

function SinglePostBox(props) {
  return (
    <div className={props.class}>
      <div className="postType">
        <span>{props.postType}</span>
      </div>
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

function MultiPostBox() {
  return (
    <div className="postBox">
      <SinglePostBox class="notice" postType="공지사항" />
      <SinglePostBox class="recommendReview" postType="추천 리뷰" />
      <SinglePostBox class="popularPosts" postType="인기글" />
      <SinglePostBox class="pleaseFind" postType="찾아주세요" />
    </div>
  );
}

/*
function PostBox(props) {
  return (
    <div className="postBox">
      <div className="notice">
        공지사항
      </div>
      <div className="recommendReview">
        추천리뷰
      </div>
      <div className="popularPosts">
        인기글
      </div>
      <div className="pleaseFind">
        찾아주세요
      </div>
    </div>
  );
}
*/

function ChatBox(props) {
  return (
    <div className="chatBox inline">
      <div className="chat">
        <div className="message">

        </div>
      </div>
      <div className="enterBox">
        <textarea name="입력창" className="enter" placeholder="메시지를 입력하세요." />
      </div>
    </div>
  );
}

function Main() {
    return (
        <div>
            <div className="middle_header">
                <HotPost type="hot!!" title="너무너무 귀여운 힐링툰 [롤랑롤랑]" />
                <Search today="가담항설" btnImageUrl="icon/search.png" />
            </div>

            <div className="main">
                <div className="review__category inline">
                <GoReview />
                <Category />
                </div>

                <div className="field inline">
                <Slide />
                <MultiPostBox />
                </div>

                <ChatBox />

            </div>
        </div>
    )
}

export default Main;