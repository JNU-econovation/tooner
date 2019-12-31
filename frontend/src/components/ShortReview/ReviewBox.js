import React from 'react';
import axios from 'axios';
import Review from './Review';
import './ShortReview.css';

class ReviewBox extends React.Component {
    state = {
        reviews: []
    };
    getReviews = async () => {
        const {
            data: {
                data: { reviews }
            }
        } = await axios.get(
            "http://168.131.30.129:2599/shortreview"
        );
        this.setState( { reviews });
    };
    componentDidMount() {
        this.getReviews();
    }
    render() {
        const { reviews } = this.state;
        return (
            <section>
                <div className="short-reviews">
                    {
                        reviews.map(review => (
                            <Review
                                key={review.articleid}
                                articleid={review.articleid}
                                rating={review.rating}
                                preference={review.preference}
                                good={review.good}
                                bad={review.bad}
                                image={review.image}
                                content={review.content}
                            />
                        ))
                    }
                </div>
            </section>
        );
    }
}

export default ReviewBox;