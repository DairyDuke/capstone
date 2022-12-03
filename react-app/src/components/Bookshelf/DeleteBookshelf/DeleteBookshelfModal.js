import React from 'react';
import { Modal } from '../../../context/Modal';

import DeleteBookshelf from '.';

export default function DeleteBookshelfModal({showDeleteModal, setShowDeleteModal, bookshelfid}) {


  return (
      <>
        {showDeleteModal && (
              <Modal id='create-post-modal' onClose={() => setShowDeleteModal(false)} >
                  <DeleteBookshelf bookshelfid={bookshelfid} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
              </Modal>
            )}
      </>
  );
}
