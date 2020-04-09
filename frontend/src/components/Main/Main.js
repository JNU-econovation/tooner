import React from 'react';
import Slide from './Slide'
import PostBox from './PostBox'
import './Main.css'

function Main() {
    return(
        <div className="main">
            <Slide />
            <PostBox />
        </div>
    );
}

export default Main;