import React, { useState, useEffect } from 'react';
import StarRating from 'react-svg-star-rating';
import './SearchToon.css';
import '../ModalControl.css';

function SearchToon(props) {
    // variable
    const showHideClassName = props.isOpen ? "modal display-block" : "modal display-none";
    const prefList = props.prefList;
    var good = new Array(prefList.length).fill(false);
    var bad = new Array(prefList.length).fill(false);

    // setTitle, setRating, setPreference
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(-1);
    const [preference, setPref] = useState(-1);
    const [empty, setEmpty] = useState(false);

    // onChange
    const [disabled, setToggle] = useState(false)
    const toggle = () => {
        setToggle(!disabled);
    }
    const onChangeTitle = e => {
        setTitle(e.target.value);
    }
    const onChangeRating = rating => {
        setRating(rating);
    }
    const onChangePref = e => {
        setPref(parseInt(e.target.value));
    }
    const onChangeGood = e => {
        good[e.target.name] = !good[e.target.name];
    }
    const onChangeBad = e => {
        bad[e.target.name] = !bad[e.target.name];
    }
    const handleClick = () => {
        if(title != '' && rating != -1 && preference != -1) {
            setEmpty(false)
            const data = { title, rating, preference, good, bad };
            props.close(data)
        } else {
            setEmpty(true);
        }
    }
    // preference Element
    const prefGoodElement = [], prefBadElement = [];
    for(let i=0; i<prefList.length; i++) {
        console.log(toString(i))
        prefGoodElement.push(
            <label>
                <input type="checkbox" name={i} onChange={onChangeGood} /> {prefList[i]}
            </label>
        )
        prefBadElement.push(
            <label>
                <input type="checkbox" name={i} onChange={onChangeBad} /> {prefList[i]}
            </label>
        )
    }

    return(
        <div className={showHideClassName}>
            <section className="modal-main searchToon">
                <div id="cancel">
                    <i className="fas fa-times" onClick={props.cancel}></i>
                </div>
                <div className="search-title search-margin">
                    <span>리뷰할 웹툰을 선택해주세요.</span>
                    <input type="text" name="title" onChange={onChangeTitle} />
                </div>
                <div className="search-rating search-margin">
                    <span>이 웹툰을 평가해주세요.</span>
                    <StarRating
                        handleOnClick={onChangeRating}
                    />
                </div>
                <div className="search-pref search-margin">
                    <span>이 웹툰은 취향에 맞나요?</span>
                    <div id="radio-container">
                        <input type="radio" value="2" id="o" name="preference"  onChange={onChangePref} />
                            <label htmlFor="o">취향이다</label>
                        <input type="radio" value="1" id="ox" name="preference" onChange={onChangePref} />
                            <label htmlFor="ox">그저 그렇다</label>
                        <input type="radio" value="0" id="x" name="preference" onChange={onChangePref} />
                            <label htmlFor="x">취향이 아니다</label>
                    </div>
                </div>
                <div className="search-good search-margin search-label">
                    <span>이 웹툰에서 좋았던 점은?</span>
                    {prefGoodElement}
                </div>
                <div className="search-bad search-margin search-label">
                    <span>이 웹툰에서 아쉬운 점은?</span>
                    {prefBadElement}
                </div>
                {
                    empty ? (
                        <p id="warning">* 웹툰 제목, 평점, 취향을 선택해주세요.</p>   
                    ) : (
                        null
                    )
                }
                <div id="complete-search">
                    <button onClick={handleClick}>완료</button>
                </div>
            </section>
        </div>
    );
}

export default SearchToon;