import React from 'react'
import Modal from "react-modal"
import style from "./Modal.module.css"

Modal.setAppElement("#root")

export const ModalWrapper = ({
    isOpen , 
    setIsOpen,
    children
}) => {

    const handelClose = () => {
        setIsOpen(false)
    }

    return (
        <Modal 
            isOpen = {isOpen}
            onRequestClose={handelClose}
            shouldCloseOnOverlayClick={true}
            className={style.cover}
        >
            {children}
        </Modal>
    )
}
