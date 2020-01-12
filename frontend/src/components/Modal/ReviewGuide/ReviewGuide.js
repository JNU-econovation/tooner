import React from 'react';
import './ReviewGuide.css';
import '../ModalControl.css';

function ReviewGuide(props) {
    const showHideClassName = props.isOpen ? "modal display-block" : "modal display-none";
    const handleClick = () => {
        props.close();
    }
    return(
        <div className={showHideClassName}>
            <section className="modal-main">
                <div id="cancel">
                    <i className="fas fa-times" onClick={handleClick}></i>
                </div>
                {props.content}
            </section>
        </div>
    );
}

export default ReviewGuide;