import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import Post from './Post';
import {useParams} from "react-router-dom"
import './PostPage.css';


function PostPage(props){
    const [state, setState] = useState({
        post: [],
        isLoading: true
    })
    const { post, isLoading } = state;
    const {articleid} = useParams()
    console.log(articleid)
    useEffect( ()=> {
        axios.get(props.json).then(
            res => {
                const post = res.data.data;
                console.log(post)
                setState({ post, isLoading: false });
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
                        key={post.articleid}
                        title={post.title}
                        writeralias={post.writeralias}
                        writetime={post.writetime}
                        edittime={post.edittime}
                        hit={post.hit}
                        like={post.like}
                    />
                )}
            </section>
        );
}

export default PostPage;