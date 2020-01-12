import React, { useState } from 'react';
import StarRating from 'react-svg-star-rating';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './WriteReviewPage.css';
import axios from 'axios';

function WriteReviewPage(props) {
    var json = props.json;
    var prefList = ['스토리', '캐릭터', '작화', '연출'];
    var isGood = new Array(prefList.length).fill(false);
    var isBad = new Array(prefList.lenght).fill(false);
    var data = {
        title: '',
        rating: -1,
        preference: -1,
        good: [],
        bad: [],
        content: ''
    }
    const { handleSubmit } = useForm();
    const history = useHistory();

    const [status, setStatus] = useState(200);
    const [empty, setEmpty] = useState(false);
    
    const onChange = e => {
        data[e.target.name] = e.target.value;
    }
    const onChangeGood = e => {
        isGood[e.target.name] = !isGood[e.target.name];
    }
    const onChangeBad = e => {
        isBad[e.target.name] = !isBad[e.target.name];
    }
    const onChangeRating = rating => {
        data.rating = rating;
    }
    const onChangePref = e => {
        data.preference = parseInt(e.target.value);
    }

    const prefGoodElement = [], prefBadElement = [];
    for(let i=0; i<prefList.length; i++) {
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

    const onSubmit = () => {
        if(data.title !== '' && data.rating !== -1 && data.preference !== -1) {
            setEmpty(false)
            for(let i=0; i<prefList.length; i++) {
                isGood[i] && data.good.push(prefList[i]);
                isBad[i] && data.bad.push(prefList[i]);
            }
            console.log(data);
            console.log(json);
            axios.post(json, data)
            .then(res => {
                console.log(res);
                setStatus(res.status);
                if(status === 200) history.goBack();
            }).catch(err => {
                setStatus(401);
            });
        } else {
            setEmpty(true);
        }
    };

    return(
        <form className="page-container" onSubmit={handleSubmit(onSubmit)}>
            {
                status === 401 ? (
                    <p id="message">* 등록에 실패하였습니다.</p>
                ) : (
                    null
                )
            }
            <div className="search-title search-margin">
                <p>리뷰할 웹툰을 선택해주세요.</p>
                <input type="text" name="title" onChange={onChange} />
            </div>
            <div className="search-rating search-margin">
                <p>이 웹툰을 평가해주세요.</p>
                <StarRating
                    handleOnClick={onChangeRating}
                />
            </div>
            <div className="search-pref search-margin">
                <p>이 웹툰은 취향에 맞나요?</p>
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
                <p>이 웹툰에서 좋았던 점은?</p>
                {prefGoodElement}
            </div>
            <div className="search-bad search-margin search-label">
                <p>이 웹툰에서 아쉬운 점은?</p>
                {prefBadElement}
            </div>
            {
                empty ? (
                    <p id="warning">* 웹툰 제목, 평점, 취향을 선택해주세요.</p>   
                ) : (
                    null
                )
            }
            <textarea name="content" id="content" onChange={onChange} />
            <div id="submit-wrap">
                <button type="submit" id="submit">올리기</button>
            </div>
        </form>
    );
}

export default WriteReviewPage;