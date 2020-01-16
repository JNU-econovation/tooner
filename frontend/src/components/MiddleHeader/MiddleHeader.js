import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MiddleHeader.css'
import '../Main/Main.css'
import {Link} from 'react-router-dom';

function HotPost(props) {
    const api = "http://168.131.30.129:2599/toplike/longreview";
    const [hot, setHot] = useState({
        title: '',
        path: '',
    });

    useEffect(() => {
        axios.get(api)
        .then(res => {
            const random = Math.floor(Math.random()*(4));
            const post = res.data.data[random];
            setHot({
                title: `[${post.title}] ${post.reviewtitle}`,
                path: `/review/long/post/${post.articleid}`
            });
        })
    }, [api])

    return (
        <div className="hotPost">
            <span>
                <mark id="hotpost__type">{props.type}</mark>
                <Link to={hot.path}>
                    &nbsp;&nbsp;&nbsp;{hot.title}
                </Link>
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
            {/*<Search today="가담항설" btnImageUrl="icon/search.png" />*/}
        </div>
    );
}
  
export default MiddleHeader