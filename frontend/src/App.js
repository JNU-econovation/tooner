import React from 'react';
import './App.css';

function Header(props) {
  return (
    <header>
      <div className="banner inline">
        <img className="banner__" src="./banner.png" alt=""/>
      </div>
      <div className="sign inline">
        <input className="sign__" type="button" value="로그인" />
        <input className="sign__" type="button" value="회원가입" />
      </div>
    </header>
  );
}

function HotPost(props) {
  return (
    <div className="hotPost inline">
      <span>
       <span id="hotpost__type">{props.type}</span>
       &nbsp;&nbsp;&nbsp;{props.title}
      </span>
    </div>
  );
}

function Search(props) {
  var message = "오늘은 [" + props.today + "] 나오는 날!";
  return (
    <div className="searchBox inline">
      <form>
        <input type="search" id="search" placeholder={message} size="25" />
        <button type="submit" id="searchBtn">
          검색
          <img src="" alt="" className="btnIcon" />
        </button>
      </form>
      
    </div>
  );
}

function test() {
  console.log("Clicked!");
}

function GoReview(props) {
  return (
    <div className="go__review">
      <button id="review">리뷰 쓰러가기</button>
    </div>
  );
}

function Category(props) {
  return (
    <div className="category inline">
      <ul className="category__toppost">
        <li onClick={test}>추천 리뷰</li>
        <li>인기글</li>
      </ul>
      <ul className="category__review">
        <li >한줄 리뷰</li>
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
    <div className="slide">
      슬라이드
    </div>
  );
}

function PostBox(props) {
  return (
    <div className="postBox">
      글박스
    </div>
  );
}

function ChatBox(props) {
  return (
    <div className="chatBox inline">
      채팅창
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <div className="middle_header">
          <HotPost type="hot" title="너무너무 귀여운 힐링툰 [롤랑롤랑]" />
          <Search today="가담항설" />
        </div>

        <div className="main">
          <GoReview />
          <Category />

          <div className="field inline">
            <Slide />
            <PostBox />
          </div>

          <ChatBox />

        </div>
      </div>
    );
  }
}

export default App;
