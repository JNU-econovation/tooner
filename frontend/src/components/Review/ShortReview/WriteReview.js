import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SearchToon from '../../Modal/SearchToon/SearchToon';
import './WriteReview.css';

function WriteReview(props) {
    // initialize
    var prefList = ['스토리', '캐릭터', '작화', '연출'];
    var content = '';
    var key = 3000;

    // setData
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(-1);
    const [preference, setPreference] = useState(-1);
    const [isGood, setIsGood] = useState([]);
    const [isBad, setIsBad] = useState([]);

    // setStatus
    const [status, setStatus] = useState(200);

    // setModal
    const [isModalOpen, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }
    const handleChildClick = (searched) => {
        console.log(searched)
        setModal(false);
        setTitle(searched.title);
        setRating(searched.rating);
        setPreference(searched.preference);
        setIsGood(searched.good);
        setIsBad(searched.bad);
    }
    useEffect( () => {
    }, console.log('data is rendered'));
    const { handleSubmit } = useForm();

    // onChange
    const onChangeContent = e => {
        content = e.target.value;
    }

    const history = useHistory();
    const onSubmit = () => {
        // add preference
        var good = [], bad = [];
        for(let i=0; i<prefList.length; i++) {
            isGood[i] && good.push(prefList[i]);
            isBad[i] && bad.push(prefList[i]);
        }

        // post data
        const review = { title, rating, preference, good, bad, content };
        console.log(review);
        axios.post(props.json, review)
        .then(res => {
            console.log(res);
            setStatus(res.status);
            if(status === 200) history.push(0);
        }).catch(err => {
            setStatus(401);
        });
    }
    return(
        <div className="write-review-container">
            {
                status === 401 ? (
                    <p id="message">* 등록에 실패하였습니다.</p>
                ) : (
                    null
                )
            }
            <button id="press-to-select" onClick={openModal}>눌러서 리뷰할 작품 찾기</button>
            <span>{title}</span>
            <SearchToon
                isOpen={isModalOpen}
                close={handleChildClick}
                cancel={closeModal}
                prefList={prefList}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea name="content" onChange={onChangeContent} />
                <div id="button-box">
                    {/*<button type="reset" onClick={reset} id="reset">다시 쓰기</button>*/}
                    <button type="submit" id="submit">확인</button>
                </div>
            </form>
        </div>
        
    );
}

export default WriteReview;