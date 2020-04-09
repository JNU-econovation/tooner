import React, { useState, useEffect } from 'react';
import StarRating from 'react-svg-star-rating';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './WriteReviewPage.css';
import axios from 'axios';

import { AuthContext } from '../../Context/AuthProvider';

// isGood isBad 초기화됨
// setisGood 따로 만들고 집어넣을까

function ImagePreview({ file }) {
    const [previewUrl, setPreviewUrl] = useState('');
    const reader = new FileReader();

    if(file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        return (
            <img src={previewUrl} id="preview" />
        )
    }
    return null;
}

function WriteReviewPage(props) {
    const [edit, setEdit] = useState(props.location.state.edit);
    const { state } = React.useContext(AuthContext);
    const { articleid } = useParams();
    const { handleSubmit } = useForm();
    const history = useHistory();

    var api = "/longreview";
    var img_api = "";
    var prefList = ['스토리', '캐릭터', '작화', '연출'];
    var isGood = new Array(prefList.length).fill(false);
    var isBad = new Array(prefList.length).fill(false);

    var initial_data = {
        title: '',
        reviewtitle: '',
        rating: 0,
        preference: -1,
        image: [],
        content: ''
    }
    
    if(edit) {
        // initialize
        const sent = props.location.state;
        initial_data = sent.data;
        let good = sent.good, bad = sent.bad;
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
    const [reviewtitle, setReviewTitle] = useState(initial_data.reviewtitle);
    const [rating, setRating] = useState(initial_data.rating);
    const [preference, setPref] = useState(initial_data.preference);
    const [empty, setEmpty] = useState(false);
    const [content, setContent] = useState(initial_data.content);
    const [status, setStatus] = useState(200);
    const [stateGood, setGood] = useState(isGood);
    const [stateBad, setBad] = useState(isBad);
    
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(initial_data.image);

    // prefElement
    const typeList = ['취향이다', '그저 그렇다', '취향이 아니다'];
    
    const onChangeTitle = e => {
        setTitle(e.target.value);
    }
    const onChangeReviewTitle = e => {
        setReviewTitle(e.target.value);
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
    const onChangeRating = rating => {
        setRating(rating);
    }
    const onChangePref = e => {
        setPref(parseInt(e.target.value));
    }

    const onChangeContent = e => {
        setContent(e.target.value);
    }

    const onChangeFile = e => {
        setFile(e.target.files[0]);
        console.log(file);
    }

    useEffect(() => {
    },[stateGood, stateBad]);

    const onSubmit = () => {
        var good = [], bad = [];
        for(let i=0; i<prefList.length; i++) {
            stateGood[i] && good.push(prefList[i]);
            stateBad[i] && bad.push(prefList[i]);
        }

        var imageUrl = [];
        const formData = new FormData();
        formData.append('file', file)
        for (var pair of formData.entries()) {
            console.log(pair[1]); 
        }
        
        // post files
        // 나중에 if(!file) 추가
        img_api = img_api + "/upload/image";
        axios.post(img_api, formData, {
            header: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            const imageUrl = res.data.data;
            console.log(imageUrl);
            if(title !== '' && reviewtitle !=='' && rating !== -1 && preference !== -1) {
                setEmpty(false);
                const data = {
                    title: title,
                    reviewtitle: reviewtitle,
                    rating: rating,
                    preference: preference,
                    good: good,
                    bad: bad,
                    image: imageUrl,
                    content: content
                }
                console.log(data);
                let config = {
                    headers: {
                        'authtoken': state.token
                    }
                }
                if(edit) {
                    api = `${api}/${articleid}`;
                    axios.put(api, data, config)
                    .then(res => {
                        setStatus(res.status);
                        if(status === 200) history.goBack();
                    }).catch(err => {
                        setStatus(401);
                    });
                } else {
                    axios.post(api, data, config)
                    .then(res => {
                        console.log(res);
                        setStatus(res.status);
                        if(status === 200) history.goBack();
                    }).catch(err => { 
                        setStatus(401);
                    });
                }
            } else {
                setEmpty(true);
            }
        }).catch(err => {
            setStatus(401);
        });
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
                <input type="text" name="title" value={title} onChange={onChangeTitle} />
            </div>
            <div className="search-title search-margin">
                <p>리뷰 제목을 입력해주세요.</p>
                <input type="text" name="reviewtitle" value={reviewtitle} onChange={onChangeReviewTitle} />
            </div>
            <div className="search-rating search-margin">
                <p>이 웹툰을 평가해주세요.</p>
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
            <div id="uploader-wrap">
                <label htmlFor="uploader">이미지 올리기</label>
                <input type="file" name="image" id="uploader" onChange={onChangeFile} />
            </div>
            {
                file !== null ? (
                    <ImagePreview file={file} />
                ) : (
                    <img src={`${img_api}/uploads/images/${image[0]}`} id="preview" />
                )
            }
            <textarea name="content" id="content" value={content} onChange={onChangeContent}>
            </textarea>
            <div id="submit-wrap">
                <button type="submit" id="submit">등록</button>
            </div>
        </form>
    );
}

export default WriteReviewPage;