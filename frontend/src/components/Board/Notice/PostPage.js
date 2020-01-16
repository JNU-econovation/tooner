import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from "react-router-dom"

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
                    title={post.title}
                    content={post.content}
                    writeralias={post.writeralias}
                    writetime={post.writetime}
                    edittime={post.edittime.slice(0,10)}
                    hit={post.hit}
                />
            )}
            <div id="button-container">
                <button id="go-list" onClick={() => history.push(props.location)}>목록</button>
            </div>
        </section>
    );
}

export default PostPage;