import React from 'react';
import './App.css';

function HotPost(props) {
  return (
    <div className="hotPost main__">
      <p>
        인기글, 최신글 등등
      </p>
    </div>
  );
}

function Search(props) {
  return (
    <div className="searchBox main__">
      <p>
        검색창
      </p>
    </div>
  );
}

function Category(props) {
  return (
    <div className="category main__">
      카테고리
    </div>
  );
}

function Slide(props) {
  return (
    <div>
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
    <div className="chatBox main__">
      채팅창
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <div>

        <div className="middle_header">
          <HotPost />
          <Search />
        </div>

        <div className="main">

          <Category />

          <div className="field main__">
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
