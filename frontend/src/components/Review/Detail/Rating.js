import React, { useState, useEffect } from 'react';
import './Rating.css';

function Rating(props) {
    const [star, setStar] = useState(0);
    const onChangeStar = e => {
        setStar(e.target.value);
    }
    const func = (e) => {
        setStar(e.target.value);
        console.log(star);
    }
    useEffect(() => {
        console.log(star);
    })
    return(
        <div className="rating-wrap">
            <input className="rating-input" name="star" id="rating-radio5" value="5" type="radio" onChange={onChangeStar} />
            <i className="fas fa-star star" htmlFor="rating-radio5" value="5" onClick={func} />
            <input className="rating-input" name="star" id="rating-radio4" value="4" type="radio" />
            <i className="fas fa-star star" />
            <input className="rating-input" name="star" id="rating-radio3" value="3" type="radio" />
            <i className="fas fa-star star" />
            <input className="rating-input" name="star" id="rating-radio2" value="2" type="radio" />
            <i className="fas fa-star star" />
            <input className="rating-input" name="star" id="rating-radio1" value="1" type="radio" />
            <i className="fas fa-star star" />
        </div>
    );
}

export default Rating;