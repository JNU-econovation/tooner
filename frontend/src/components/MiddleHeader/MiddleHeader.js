import React from 'react';
import './MiddleHeader.css'
import '../Main/Main.css'
import {Link} from 'react-router-dom';

function HotPost(props) {
    return (
        <div className="hotPost">
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

function MiddleHeader(props) {
    return (
        <div className="middle-header">
            <HotPost type="hot!!" title="너무너무 귀여운 힐링툰 [롤랑롤랑]" />
            <Search today="가담항설" btnImageUrl="icon/search.png" />
        </div>
    );
}
  
export default MiddleHeader