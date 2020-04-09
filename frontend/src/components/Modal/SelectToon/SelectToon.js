import React, { useState } from 'react';
import './SelectToon.css';
import '../ModalControl.css';

function SelectToon(props) {
    const showHideClassName = props.isOpen ? "modal display-block" : "modal display-none";
    const [title, setTitle] = useState('');
    const onChangeTitle = e => {
        setTitle(e.target.value);
    }
    const handleClick = () => {
        props.close(SVGComponentTransferFunctionElement);
    }
    return(
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="search-title">
                    <label>리뷰할 웹툰을 선택해주세요.</label>
                    <input type="text" name="title" onChange={onChangeTitle} />
                </div>
                <div id="button-container">
                    <button onClick={handleClick}>완료</button>
                </div>
            </section>
        </div>
    );
}

export default SelectToon;