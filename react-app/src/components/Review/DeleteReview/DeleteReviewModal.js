import React from 'react';
import { Modal } from '../../../context/Modal';
import './DeleteReview.css'
import DeleteReview from '.';

export default function DeleteReviewModal({showDeleteModal, setShowDeleteModal, reviewId}) {


  return (
      <>
        {showDeleteModal && (
              <Modal id='delete_book_modal' onClose={() => setShowDeleteModal(false)} >
                  <DeleteBook reviewId={reviewId} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
              </Modal>
            )}
      </>
  );
}
