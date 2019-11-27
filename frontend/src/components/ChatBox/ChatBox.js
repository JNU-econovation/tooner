import React from 'react';
import './ChatBox.css';

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

export default ChatBox;