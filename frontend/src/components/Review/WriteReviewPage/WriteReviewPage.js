import React, { useState } from 'react';
import StarRating from 'react-svg-star-rating';
import { useHistory } from 'react-router-dom';
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
        return(
            <img src={previewUrl} id="preview" />
        )
    } else {
        return null;
    }
}

function WriteReviewPage(props) {
    var json = props.json;
    var img_json = "http://168.131.30.129:2599/upload/image";
    var prefList = ['스토리', '캐릭터', '작화', '연출'];
    var isGood = new Array(prefList.length).fill(false);
    var isBad = new Array(prefList.length).fill(false);

    const { state } = React.useContext(AuthContext);

    const { handleSubmit } = useForm();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [reviewtitle, setReviewTitle] = useState('');
    const [rating, setRating] = useState(-1);
    const [preference, setPref] = useState(-1);
    const [content, setContent] = useState('');
    const [stateGood, setGood] = useState([]);
    const [stateBad, setBad] = useState([]);

    const [file, setFile] = useState();
    const [status, setStatus] = useState(200);
    const [empty, setEmpty] = useState(false);
    
    const onChangeTitle = e => {
        setTitle(e.target.value);
    }
    const onChangeReviewTitle = e => {
        setReviewTitle(e.target.value);
    }
    const onChangeGood = e => {
        isGood[e.target.name] = !isGood[e.target.name];
        setGood(isGood);
    }
    const onChangeBad = e => {
        isBad[e.target.name] = !isBad[e.target.name];
        setBad(isBad);
    }
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
        var good = [], bad = [];
        for(let i=0; i<prefList.length; i++) {
            stateGood[i] && good.push(prefList[i]);
            stateBad[i] && bad.push(prefList[i]);
        }

        console.log({ good, bad});

        const formData = new FormData();
        formData.append('file', file)

        // post files
        axios.post(img_json, formData, {
            header: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res);
            if(title !== '' && reviewtitle !=='' && rating !== -1 && preference !== -1) {
                setEmpty(false);
                console.log({ good, bad })
    
                const data = {
                    title: title,
                    reviewtitle: reviewtitle,
                    rating: rating,
                    preference: preference,
                    good: good,
                    bad: bad,
                    image: res.data.data,
                    content: content
                }
                console.log(data);
                let config = {
                    headers: {
                        'authtoken': state.token
                    }
                }
                axios.post(json, data, config)
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
        }).catch(err => {
            setStatus(401);
        })
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
                <input type="text" name="title" onChange={onChangeTitle} />
            </div>
            <div className="search-title search-margin">
                <p>리뷰 제목을 입력해주세요.</p>
                <input type="text" name="reviewtitle" onChange={onChangeReviewTitle} />
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
            <div id="uploader-wrap">
                <label htmlFor="uploader">이미지 올리기</label>
                <input type="file" name="image" id="uploader" onChange={onChangeFile} />
            </div>
            <ImagePreview file={file} />
            <textarea name="content" id="content" onChange={onChangeContent}>
            </textarea>
            <div id="submit-wrap">
                <button type="submit" id="submit">등록</button>
            </div>
        </form>
    );
}

export default WriteReviewPage;