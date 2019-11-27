import React from 'react';
import Slide from './Slide'
import PostBox from './PostBox'
import './Field.css'

function Field() {
    return(
        <div className="field inline">
            <Slide />
            <PostBox />
        </div>
    );
}

export default Field;