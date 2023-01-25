import React from 'react';
import { Modal } from '../../../context/Modal';
import './EditReview.css'
import EditReview from '.';

export default function EditReviewModal({showReviewModal, setShowReviewModal, bookData}) {


  return (
      <>
        {showEditModal && (
              <Modal id='edit_review_modal' onClose={() => setShowReviewModal(false)} >
                  <EditReview bookData={bookData} showReviewModal={showReviewModal} setShowReviewModal={setShowReviewModal} />
              </Modal>
            )}
      </>
  );
}
