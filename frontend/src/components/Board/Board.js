import React from 'react';
import PostList from './PostList';
import './Board.css'
import axios from 'axios';

class Board extends React.Component {
    state = {
        posts: [],
        isLoading: true
    }

    componentDidMount() {
        axios.get(this.props.json).then(
            res => {
                const posts = res.data.data;
                console.log(posts);
                this.setState({ posts, isLoading: false });
            }
        )
    }

    render() {
        const { posts, isLoading } = this.state;
        return(
            <section className="board">
                { isLoading ? (
                    <div className="loader">
                        <span>데이터를 불러오고 있습니다...</span>
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
                            />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}

export default Board;