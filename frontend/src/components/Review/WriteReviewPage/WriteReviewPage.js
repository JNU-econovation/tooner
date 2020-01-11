import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './WriteReviewPage.css';
import axios from 'axios';

function WriteReviewPage(props) {
    var json = "http://168.131.30.129:2599/longreview" //props.location.json;
    console.log(json);
    const [data, setData] = useState({
        title: '',
        rating: -1,
        preference: -1,
        good: [],
        bad: [],
        content: ''
    });
    const { handleSubmit } = useForm();
    const history = useHistory();
    const [status, setStatus] = useState(200);
    const onSubmit = () => {
        console.log(data);
        axios.post(json, data)
        .then(res => {
            console.log(res);
            setStatus(res.status);
            if(status === 200) history.goBack();
        }).catch(err => {
            setStatus(401);
        });
    };
    const onChangeTitle = e => {
        data['title'] = e.target.value;
    }
    const onChangeReviewTitle = e => {
        data['reviewtitle'] = e.target.value;
    }
    const onChangeContent = e => {
        data['content'] = e.target.value;
    }
    useEffect( () => {
        setData(data);
    })
    return(
        <form className="page-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="title-container">
                <span id="page-title">상세 리뷰 쓰기</span>
                <div id="webtoon-title">
                    <input type="text" name="title" placeholder="리뷰할 웹툰" onChange={onChangeTitle} />
                    <span>{data.title}</span>
                </div>
                <div id="review-title">
                    <input type="text" name="reviewtitle" placeholder="리뷰 제목을 써주세요." onChange={onChangeReviewTitle} />
                </div>
                <div id="review-rating">
                    <input type="text" name="rating" />
                </div>
                <div id="review-pref">
                    <input type="text" name="preference" />
                </div>
                <div id="review-good">
                    <input type="text" name="good" />
                </div>
                <div id="review-bad">
                    <input type="text" name="bad" />
                </div>
                <div id="review-content">
                    <input type="text" name="content" placeholder="리뷰 내용을 써주세요." onChange={onChangeContent} />
                </div>
                <div id="button-container">
                    <button type="submit" id="submit">올리기</button>
                </div>
            </div>
        </form>
    );
}

export default WriteReviewPage;