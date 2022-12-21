import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './BooksInShelves.css'

const ShelveBookFormBasic = ({ setShowModal, showModal, typeSelection = false }) => {
    const author = useSelector(state => state.session.user)
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const [postType, setPostType] = useState(typeSelection || false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [titleCharCount, setTitleCharCount] = useState(0);
    const [textCharCount, setTextCharCount] = useState(0);
    const [mediaCharCount, setMediaCharCount] = useState(0)
    const [disablePostText, setDisablePostText] = useState(true)
    const [disablePostMedia, setDisablePostMedia] = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [showModal])


    useEffect(() => {
        if (title.length > 0 || text.length > 0) {
            setDisablePostText(false)
        } else {
            setDisablePostText(true)
        }
        if (mediaUrl.length > 0) {
            setDisablePostMedia(false)
        } else {
            setDisablePostMedia(true)
        }
    }, [title, text, mediaUrl])

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (errors) {

        }
        const postData = {
            postType,
            title,
            text
        }

    //     const post = await dispatch(createPost(postData))
    //         .catch(async (response) => {
    //             const data = await response.json();
    //             if (data && data.errors) {
    //                 setErrors(Object.values(data.errors));
    //                 // This console log is to make react happy - do not delete
    //                 console.log("Errors "+errors)
    //             }
    //         });
    //     if (post && !mediaUrl) {
    //         setShowModal(false)
    //         history.push('/feed')
    //         window.scrollTo(0,0)
    //     }
    //     if (post && mediaUrl) {
    //         const postMedia = await dispatch(addMediaByPostId(post.id, mediaUrl))
    //             .catch(async (response) => {
    //                 const data = await response.json();
    //                 if (data && data.errors) {
    //                     setErrors(Object.values(data.errors));
    //                     // This console log is to make react happy - do not delete
    //                     console.log("Errors "+errors)
    //                 }
    //             });
    //         if (postMedia) {
    //             setShowModal(false)
    //             history.push('/feed')
    //             window.scrollTo(0,0)
    //         }
    //     }
    };
    return (
        <div>
            {!postType && (
                <>
                    <div id='post-type-selector'>
                        <div className='selector-wrapper' onClick={() => setPostType('text')}>
                            <div id='text-selector'>Aa</div>
                            <div id='text-label'>Text</div>
                        </div>
                        <div className='selector-wrapper' onClick={() => setPostType('image')}>
                            <div id='image-selector'><i className="fa-solid fa-camera-retro" /></div>
                            <div id='image-label'>Photo</div>
                        </div>
                        <div className='selector-wrapper' onClick={() => setPostType('quote')}>
                            <div id='quote-selector' ><i className="fa-solid fa-quote-left" /></div>
                            <div id='quote-label'>Quote</div>
                        </div>
                        <div className='selector-wrapper' onClick={() => setPostType('video')}>
                            <div id='video-selector'><i className="fa-solid fa-video" /></div>
                            <div id='video-label'>Video</div>
                        </div>
                    </div>
                </>
            )}


            {/* // ---------- POST FORM FOR TEXT ---------- \\ */}
            {postType === 'text' && (
                <form className='create-post-form' onSubmit={onSubmit}>
                    <div>
                        <div id='text-profile-image-container'>
                            <img id='author-profile-image' alt='author profile' src={author.profileImageUrl} />
                        </div>
                        <div className='post-form-username'>{author.username}</div>
                    </div>

                    <div id='text-form-title-input'>
                        <input
                            name='title'
                            type='text'
                            placeholder='Title'
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setTitleCharCount(e.target.value.length)
                            }}
                            maxLength={100}
                            onFocus={(e) => setTitleCharCount(e.target.value.length)}

                        />
                        <div>{titleCharCount}/100</div>
                    </div>
                    <div id='text-form-text-input'>
                        <textarea
                            id='textarea-input'
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                                setTextCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setTextCharCount(e.target.value.length)}

                        />
                        <div>{textCharCount}/1000</div>
                    </div>
                    <div className='form-footer'>
                        <button className='cancel-button' onClick={() => setShowModal(false)}>Close</button>
                        <button className='submit-button' type="submit" disabled={disablePostText}>Post Now</button>
                    </div>
                </form>
            )}


            {/* // ---------- POST FORM FOR IMAGE ---------- \\ */}
            {postType === 'image' && (
                <form className='create-post-form' onSubmit={onSubmit}>
                    <div>
                        <div id='text-profile-image-container'>
                            <img id='author-profile-image' alt='author profile' src={author.profileImageUrl} />
                        </div>
                        <div className='post-form-username'>{author.username}</div>
                    </div>
                    <div className='media-url-container'>
                        <input
                            name='image'
                            type='url'
                            placeholder='Type or paste image link'
                            value={mediaUrl}
                            onChange={(e) => {
                                setMediaUrl(e.target.value)
                                setMediaCharCount(e.target.value.length)
                            }}
                            maxLength={255}
                            onFocus={(e) => setMediaCharCount(e.target.value.length)}

                        />
                        <div>{mediaCharCount}/255</div>
                    </div>
                    <div className='media-text-container'>
                        <textarea
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                                setTextCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setTextCharCount(e.target.value.length)}
                        />
                        <div>{textCharCount}/1000</div>
                    </div>
                    <div className='form-footer'>
                        <button className='cancel-button' onClick={() => setShowModal(false)}>Close</button>
                        <button className='submit-button' type="submit" disabled={disablePostMedia}>Post Now</button>
                    </div>
                </form>
            )}


            {/* // ---------- POST FORM FOR QUOTE ---------- \\ */}
            {postType === 'quote' && (
                <form className='create-post-form' onSubmit={onSubmit}>
                    <div>
                        <div id='text-profile-image-container'>
                            <img id='author-profile-image' alt='author profile' src={author.profileImageUrl} />
                        </div>
                        <div className='post-form-username'>{author.username}</div>
                    </div>
                    <div className='quote-text-container'>
                        <textarea
                            name='quote'
                            type='text'
                            placeholder='Something someone else said here.'
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                                setTextCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setTextCharCount(e.target.value.length)}
                            required
                        />
                        <div>{textCharCount}/1000</div>
                    </div>
                    <div className='quote-author-container'>
                        <input
                            name='source'
                            type='text'
                            placeholder='Source'
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setTitleCharCount(e.target.value.length)
                            }}
                            maxLength={100}
                            onFocus={(e) => setTitleCharCount(e.target.value.length)}

                        />
                        <div>{titleCharCount}/100</div>
                    </div>
                    <div className='form-footer'>
                        <button className='cancel-button' onClick={() => setShowModal(false)}>Close</button>
                        <button className='submit-button' type="submit" disabled={disablePostText}>Post Now</button>
                    </div>
                </form>
            )}


            {/* // ---------- POST FORM FOR VIDEO ---------- \\ */}
            {postType === 'video' && (
                <form className='create-post-form' onSubmit={onSubmit}>
                    <div>
                        <div id='text-profile-image-container'>
                            <img id='author-profile-image' alt='author profile' src={author.profileImageUrl} />
                        </div>
                        <div className='post-form-username'>{author.username}</div>
                    </div>
                    <div className='media-url-container'>
                        <input
                            name='video'
                            type='url'
                            placeholder='Type or paste youTube or vimeo video link'
                            value={mediaUrl}
                            onChange={(e) => {
                                setMediaUrl(e.target.value)
                                setMediaCharCount(e.target.value.length)
                            }}
                            maxLength={255}
                            onFocus={(e) => setMediaCharCount(e.target.value.length)}
                            required
                        />
                        <div>{mediaCharCount}/255</div>
                    </div>
                    <div className='media-text-container'>
                        <textarea
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                                setTextCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setTextCharCount(e.target.value.length)}
                        />
                        <div>{textCharCount}/1000</div>
                    </div>
                    <div className='form-footer'>
                        <button className='cancel-button' onClick={() => setShowModal(false)}>Close</button>
                        <button className='submit-button' type="submit" disabled={disablePostMedia}>Post Now</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ShelveBookFormBasic;
