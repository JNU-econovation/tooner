import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import './Board.css'
import axios from 'axios';

function Board(props) {
    const [posts, setPost] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(props.json).then(
            res => {
                const posts = res.data.data;
                setPost(posts);
                setLoading(false);
            }
        ).catch(err => {
            console.log(err);
        })
    }, [props.json]);

    return(
        <section className="board">
            { isLoading ? (
                <div className="loader">
                    <span>데이터를 불러오는 중입니다...</span>
                </div>
                ) : (
                <div className="posts">
                    {posts.map(post => (
                        <PostList
                            key={post.articleid}
                            articleid={post.articleid}
                            title={post.title}
                            writeralias={post.writeralias}
                            writetime={post.writetime}
                            hit={post.hit}
                            like={post.like}
                            location={props.location}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default Board;