import React from 'react';
import './ShortReviewGuide.css';
import '../ModalControl.css';

function ShortReviewGuide(props) {
    const showHideClassName = props.isOpen ? "modal display-block" : "modal display-none";
    const handleClick = () => {
        props.close();
    }
    return(
        <div className={showHideClassName}>
            <section className="modal-main">
                <div id="guide-detail">
                    아주아주 깨끗한 리뷰 문화를 만들어가요 ^▽^
                </div>
                <div id="button-container">
                    <button onClick={handleClick}>닫기</button>
                </div>
            </section>
        </div>
    );
}

export default ShortReviewGuide;