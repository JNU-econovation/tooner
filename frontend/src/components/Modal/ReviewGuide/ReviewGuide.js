import React from 'react';
import './ReviewGuide.css';
import '../ModalControl.css';

function ReviewGuide(props) {
    const showHideClassName = props.isOpen ? "modal display-block" : "modal display-none";
    return(
        <div className={showHideClassName}>
            <section className="modal-main">
                <div id="cancel">
                    <i className="fas fa-times" onClick={() => props.close()}></i>
                </div>
                {props.content}
            </section>
        </div>
    );
}

export default ReviewGuide;