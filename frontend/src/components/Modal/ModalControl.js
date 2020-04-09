function Modal() {
    this.isOpen = false;
}

Modal.prototype = {
    openModal: function() {
        this.isOpen = true;
    },
    closeModal: function() {
        this.isOpen = false;
    }
}

export default Modal;