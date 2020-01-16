import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import StarRating from 'react-svg-star-rating';

import './ShortReviewModal.css';
import '../ModalControl.css';

import { AuthContext } from '../../Context/AuthProvider';

// preference, good, bad 반영해야함
function ShortReviewModal(props) {
    const api = "http://168.131.30.129:2599/shortreview";

    // edit setting
    const edit = props.articleid === -1 ? false : true;
    
    const prefList = ['스토리', '캐릭터', '작화', '연출'];
    var isGood = new Array(prefList.length).fill(false);
    var isBad = new Array(prefList.length).fill(false);

    var initial_data = {
        title: '',
        rating: 0,
        preference: -1,
        content: ''
    }
    
    if(edit) {
        // initialize
        initial_data = props.review;
        let good = props.good, bad = props.bad;
        good.forEach(item => {
            let good_idx = prefList.indexOf(item);
            if(good_idx !== -1) isGood[good_idx] = !isGood[good_idx];
        });
        bad.forEach(item => {
            let bad_idx = prefList.indexOf(item);
            if(bad_idx !== -1) isBad[bad_idx] = !isBad[bad_idx];
        });
    }

    // useState
    const [title, setTitle] = useState(initial_data.title);
    const [rating, setRating] = useState(initial_data.rating);
    const [preference, setPref] = useState(initial_data.preference);
    const [empty, setEmpty] = useState(false);
    const [content, setContent] = useState(initial_data.content);
    const [status, setStatus] = useState(200);
    const [stateGood, setGood] = useState(isGood);
    const [stateBad, setBad] = useState(isBad);

    // onChange
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
        const changedGood = JSON.parse(JSON.stringify(stateGood));
        changedGood[e.target.name] = !changedGood[e.target.name];
        setGood(changedGood);
    };

    const onChangeBad = e => {
        const changedBad = JSON.parse(JSON.stringify(stateBad));
        changedBad[e.target.name] = !changedBad[e.target.name];
        setBad(changedBad);
    };

    const onChangeContent = e => {
        setContent(e.target.value);
    }

    useEffect(() => {
    },[stateGood, stateBad]);

    // prefElement
    const typeList = ['취향이다', '그저 그렇다', '취향이 아니다'];

    // context
    const { state } = React.useContext(AuthContext);
    const { handleSubmit } = useForm();

    // variable
    const showHideClassName = props.isOpen ? "modal display-block" : "modal display-none";

    const onSubmit = () => {
        let isEmpty = title === '' || rating === 0 || preference === -1;
        if(isEmpty) {
            setEmpty(true)
            return;
        }

        let good = [], bad = [];
        for(let i=0; i<prefList.length; i++) {
            stateGood[i] && good.push(prefList[i]);
            stateBad[i] && bad.push(prefList[i]);
        }
        if(!good.length) good.push("없음");
        if(!bad.length) bad.push("없음");

        // post data
        const review = { title, rating, preference, good, bad, content };
        let config = {
            headers: {
                'authtoken': state.token
            }
        }

        if(edit) {
            let edit_api = `${api}/${props.articleid}`;
            axios.put(edit_api, review, config)
            .then(res => {
                props.close(true);
            }).catch(err => {
                setStatus(401);
            })
            return;
        }

        axios.post(api, review, config)
        .then(res => {
            setStatus(res.status);
            props.close(true);
        }).catch(err => {
            setStatus(401);
        });
    }

    return(
        <div className={showHideClassName}>
            <section className="modal-main searchToon">
                <div id="cancel">
                    <i className="fas fa-times" onClick={() => {props.close(false)}}></i>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="search-title search-margin">
                        <span>리뷰할 웹툰을 선택해주세요.</span>
                        <input type="text" name="title" value={title} onChange={onChangeTitle} />
                    </div>
                    <div className="search-rating search-margin">
                        <span>이 웹툰을 평가해주세요.</span>
                        <StarRating
                            initialRating={rating}
                            handleOnClick={onChangeRating}
                        />
                    </div>
                    <div className="search-pref search-margin">
                        <span>이 웹툰은 취향에 맞나요?</span>
                        <div id="radio-container">
                            {
                                typeList.map((type, i) => {
                                    return(
                                        <label>
                                            <input
                                                type="radio"
                                                value={i}
                                                checked={i === preference}
                                                onChange={onChangePref}
                                            /> {type}
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="search-good search-margin search-label">
                        <span>이 웹툰에서 좋았던 점은?</span>
                        {
                            prefList.map((pref, i) => {
                                return(
                                    <label>
                                        <input
                                            type="checkbox"
                                            name={i}
                                            onChange={onChangeGood}
                                            checked={stateGood[i]}
                                        /> {pref}
                                    </label>
                                )
                            })
                        }
                    </div>
                    <div className="search-bad search-margin search-label">
                        <span>이 웹툰에서 아쉬운 점은?</span>
                        {
                            prefList.map((pref, i) => {
                                return(
                                    <label>
                                        <input
                                            type="checkbox"
                                            name={i}
                                            onChange={onChangeBad}
                                            checked={stateBad[i]}
                                        /> {pref}
                                    </label>
                                )
                            })
                        }
                    </div>
                    {
                        empty ? (
                            <p id="warning">* 웹툰 제목, 평점, 취향을 선택해주세요.</p>   
                        ) : (
                            null
                        )
                    }
                    <textarea name="content" value={content} onChange={onChangeContent} />
                    <div id="complete-search">
                        <button type="submit" id="submit">완료</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default ShortReviewModal;