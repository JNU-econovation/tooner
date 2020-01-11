import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import { useParams } from "react-router-dom"
import './PostPage.css';


function PostPage(props){
    const [state, setState] = useState({
        post: {},
        isLoading: true
    })

    const [status, setStatus] = useState(200);
    const { post, isLoading } = state;
    const { articleid } = useParams();
    const url = props.json + `/${articleid}`;
    useEffect( ()=> {
        axios.get(url)
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
                    title={post.title}
                    content={post.content}
                    writeralias={post.writeralias}
                    writetime={post.writetime}
                    edittime={post.edittime}
                    hit={post.hit}
                    like={post.like}
                    dislike={post.dislike}
                />
            )}
        </section>
    );
}

export default PostPage;