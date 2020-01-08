import React, { useState } from 'react';
import './SearchToon.css';

function SearchToon(props) {
    const showHideClassName = props.isOpen ? "modal display-block" : "modal display-none";
    const [data, setState] = useState({
        title: '',
        rating: 0,
        preference: 0,
        good: [],
        bad: []
    })
    const { title, rating, preference, good, bad } = data;
    const onChangeTitle = e => {
        setState({ title: e.target.value, rating, preference, good, bad });
    }
    const onChangeRating = e => {
        setState({ title, rating: e.target.value, preference, good, bad });
    }
    const onChangePref = e => {
        setState({ title, rating, preference: e.target.value, good, bad });
    }
    const onChangeGood = e => {
        setState({ title, rating, preference, good: e.target.value, bad });
    }
    const onChangeBad = e => {
        setState({ title, rating, preference, good, bad: e.target.value });
    }
    const handleClick = () => {
        props.close(data);
    }
    return(
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="search-title">
                    <label>리뷰할 웹툰을 선택해주세요.</label>
                    <input type="text" name="title" onChange={onChangeTitle} />
                </div>
                <div className="search-rating">
                    <label>이 웹툰을 평가해주세요.</label>
                    <input type="text" name="title" onChange={onChangeRating} />
                </div>
                <div className="search-pref">
                    <label>이 웹툰은 취향에 맞나요?</label>
                    <input type="text" name="title" onChange={onChangePref} />
                </div>
                <div className="search-good">
                    <label>이 웹툰에서 좋았던 점은?</label>
                    <input type="text" name="title" onChange={onChangeGood} />
                </div>
                <div className="search-bad">
                    <label>이 웹툰에서 아쉬운 점은?</label>
                    <input type="text" name="title" onChange={onChangeBad} />
                </div>
                <div id="button-container">
                    <button onClick={handleClick}>완료</button>
                </div>
            </section>
        </div>
    );
}

export default SearchToon;