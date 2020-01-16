import React from 'react';
import './Confirm.css';
import '../ModalControl.css';

export default function Confirm(props) {
    const showHideClassName = props.isOpen ? "modal display-block" : "modal display-none";
    return(
        <div className={showHideClassName}>
            <section className="modal-main modal-confirm">
                <p id="message">{props.message}</p>
                <div id="confirm-wrap">
                    <button id="confirm" onClick={() => props.close(true)} >확인</button>
                    <button id="discard" onClick={() => props.close(false)}>취소</button>
                </div>
            </section>
        </div>
    );
}