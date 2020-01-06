import React from 'react';
import axios from 'axios';
import Review from './Review';
import './Review.css';

class ReviewBox extends React.Component {
    state = {
        reviews: [],
        isLoading: true
    }
    
    componentDidMount() {
        axios.get(this.props.json).then(
            res => {
                const reviews = res.data.data;
                console.log(reviews);
                this.setState({ reviews, isLoading: false });
            }
        )
    }

    render() {
        const { isLoading, reviews } = this.state;
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
                            />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}

export default ReviewBox;