import React from 'react';
import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'

export default function LoginFormModalButton({linkText}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div id="login_form_modal_button" onClick={() => setShowModal(true)}>
                <span>{linkText}</span>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <LoginForm setShowModal={setShowModal} showModal={showModal} />
                </Modal>
            )}
        </>
    );
}
