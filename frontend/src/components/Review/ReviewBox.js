import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from './Review';
import InfiniteScroll from "react-infinite-scroll-component";
import './Review.css';

// 인피니트 스크롤 추가 예정

function ReviewBox(props) {
    console.log(props)
    const api = "http://168.131.30.129:2599/shortreview";
    const [reviews, setReviews] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchMoreData = () => {
        setTimeout(() => {
            setReviews(reviews.concat(Array.from({ length: 5 })));
        }, 500);
    }

    useEffect(() => {
        setLoading(true);
        axios.get(api)
        .then(res => {
            const data = res.data.data;
            setReviews(data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    },[]);

    useEffect(() => {

    }, [reviews])

    return (
        <section className="review-section">
            { isLoading ? (
                <div className="loader">
                    <span>데이터를 불러오고 있습니다...</span>
                </div>
            ) : (
                <div className="reviews">
                    {reviews.map(review => (
                        <Review
                            key={review.articleid}
                            articleid={review.articleid}
                            title={review.title}
                            rating={review.rating}
                            preference={review.preference}
                            good={review.good}
                            bad={review.bad}
                            image={review.image}
                            content={review.content}
                            api={api}
                        />
                    ))}
                </div>
                /*<InfiniteScroll
                    dataLength={reviews.legnth}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={loader}
                >
                    
                </InfiniteScroll>*/
            )}
        </section>
    );
}

export default ReviewBox;