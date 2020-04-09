import React, { useState, useEffect } from 'react';
import Confirm from '../../Modal/Confirm/Confirm';
import axios from 'axios';

import './Comment.css';

export default function Comment(props) {
    const api = `${props.api}/${props.articleid}/reply`;
    const [content, setContent] = useState('');
    const [replyid, setId] = useState(-1);
    const [comments, setComment] = useState([]);
    const [isUpdate, setUpdate] = useState(false);
    const [isConfirmOpen, setConfirm] = useState(false);

    const closeConfirm = (confirm) => {
        if(!confirm) {
            setConfirm(false);
            return;
        }
        
        let delete_api = `${props.api}/reply/${replyid}`
        let config = {
            headers: {
                authtoken: localStorage.getItem('token')
            }
        }
        axios.delete(delete_api, config)
        .then(
            res => {
                setConfirm(false);
                console.log(res);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    const submit = () => {
        let data = {
            content: content
        }
        let config = {
            headers: {
                authtoken: localStorage.getItem('token')
            }
        }
        axios.post(api, data, config)
        .then(res => {
            setContent('');
            setUpdate(true);
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    const onChangeContent = e => {
        setContent(e.target.value);
    }

    useEffect(() => {
        axios.get(api)
        .then(res => {
            console.log(res);
            setComment(res.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [isUpdate, isConfirmOpen])

    useEffect(() => {
    }, [comments])

    return(
        <div className="comment-wrap">
            {
                comments.map(comment => {
                    return(
                        <React.Fragment>
                            <div id="edit-wrap">
                                <button id="delete" onClick={() => {
                                        setConfirm(true);
                                        setId(comment.reply_id);
                                    }}><i className="fas fa-trash-alt"></i></button>
                                {
                                    isConfirmOpen &&
                                    <Confirm
                                        isOpen={isConfirmOpen}
                                        close={closeConfirm}
                                        message="이 댓글을 삭제하시겠습니까?"
                                    />
                                }
                            </div>
                            <div id="comment">
                                
                                <p id="alias">
                                    {comment.writeralias}
                                </p>
                                <p id="content">
                                    {comment.content}
                                </p>
                                <p id="writetime">
                                    {comment.writetime.slice(0,10)}
                                </p>
                            </div>
                        </React.Fragment>
                    )
                })
            }
            <div id="write-comment">
                <textarea name="content" value={content} onChange={onChangeContent} />
                <button onClick={submit}>등록</button>
            </div>
        </div>
    )
}