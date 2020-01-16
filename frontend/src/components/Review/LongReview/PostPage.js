import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from "react-router-dom"

import Confirm from '../../Modal/Confirm/Confirm';
import Post from './Post';
import './PostPage.css';

function PostPage(props){
    const location = props.location;
    const [state, setState] = useState({
        post: {},
        isLoading: true
    })
    const [status, setStatus] = useState(200);
    const { post, isLoading } = state;
    const history = useHistory();
    const { articleid } = useParams();
    const api = props.json + `/${articleid}`;
    //const url = props.location + `/${articleid}`;

    const [isConfirmOpen, setConfirm] = useState(false);
    const openConfirm = () => {
        setConfirm(true);
    }
    const closeConfirm = (confirm) => {
        if(confirm) {
            let config = {
                headers: {
                    authtoken: localStorage.getItem('token')
                }
            }
            axios.delete(api, config)
            .then(
                res => {
                    console.log(res);
                    history.push(props.location)
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        }
        setConfirm(false);
    }
    
    useEffect( ()=> {
        axios.get(api)
        .then(
            res => {
                const post = res.data.data;
                setStatus(res.status);
                setState({ post, isLoading: false });
        }).catch(
            err => {
                setStatus(401);
            }
        )
    },[props.json])

    return(
        <section className="post-section">
            { isLoading ? (
                <div className="loader">
                    <span>글을 불러오고 있습니다...</span>
                </div>
            ) : (
                <Post
                    key={articleid}
                    articleid={post.articleid}
                    title={post.reviewtitle}
                    content={post.content}
                    writeralias={post.writeralias}
                    writetime={post.writetime}
                    edittime={post.edittime.slice(0,10)}
                    image={post.image}
                    hit={post.hit}
                    like={post.like}
                    dislike={post.dislike}
                />
            )}
            <div id="button-container">
                <button id="go-list" onClick={() => history.push(props.location)}>목록</button>
                <button id="delete-post" onClick={openConfirm}>삭제</button>
                <Link to={{
                    pathname: `${location}/edit/${articleid}`,
                    state: {
                        api: api,
                        edit: true,
                        data: {
                            title: post.title,
                            reviewtitle: post.reviewtitle,
                            rating: post.rating,
                            preference: post.preference,
                            image: post.image,
                            content: post.content
                        },
                        good: post.good,
                        bad: post.bad
                    }
                }}>
                    <button id="edit-post">수정</button>
                </Link>
            </div>
            {
                isConfirmOpen &&
                <Confirm
                    isOpen={isConfirmOpen}
                    close={closeConfirm}
                    message="이 글을 삭제하시겠습니까?"
                />
            }
        </section>
    );
}

export default PostPage;