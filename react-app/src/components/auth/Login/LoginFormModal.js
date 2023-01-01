import React from 'react';
import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'

export default function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div id="login_modal_button" onClick={() => setShowModal(true)}>
                <p>Log in</p>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <LoginForm setShowModal={setShowModal} showModal={showModal} />
                </Modal>
            )}
        </>
    );
}
