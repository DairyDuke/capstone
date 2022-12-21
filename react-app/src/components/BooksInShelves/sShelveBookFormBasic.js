import React from 'react';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import './BooksInShelves.css'

export default function SShelveBookFormBasic() {
    const [showModal, setShowModal] = useState(false);
    const [postType, setPostType] = useState(false);

    useEffect(() => {

        if (showModal) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [showModal])


    return (
        <>
            <div id='selection-bar'>
                <div id='bar-post-type-selector'>
                    <div className='selector-wrapper' onClick={() => {
                        setShowModal(true)
                        setPostType('text')
                    }}>
                        <div id='bar-text-selector'>Aa</div>
                        <div id='text-label'>Text</div>
                    </div>
                    <div className='selector-wrapper' onClick={() => {
                        setShowModal(true)
                        setPostType('image')
                    }}>
                        <div id='bar-image-selector'><i className="fa-solid fa-camera-retro" /></div>
                        <div id='image-label'>Photo</div>
                    </div>
                    <div className='selector-wrapper' onClick={() => {
                        setShowModal(true)
                        setPostType('quote')
                    }}>
                        <div id='bar-quote-selector' ><i className="fa-solid fa-quote-left" /></div>
                        <div id='quote-label'>Quote</div>
                    </div>
                    <div className='selector-wrapper' onClick={() => {
                        setShowModal(true)
                        setPostType('video')
                    }}>
                        <div id='bar-video-selector'><i className="fa-solid fa-video" /></div>
                        <div id='video-label'>Video</div>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal id='create-post-modal' onClose={() => setShowModal(false)} >
                    {/* <CreatePostForm setShowModal={setShowModal} typeSelection={postType} /> */}
                </Modal>
            )}
        </>
    );
}
