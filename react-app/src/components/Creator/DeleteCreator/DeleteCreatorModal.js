import React from 'react';
import { Modal } from '../../../context/Modal';

import DeleteCreator from '.';

export default function DeleteCreatorModal({showDeleteModal, setShowDeleteModal, creatorId}) {


  return (
      <>
        {showDeleteModal && (
              <Modal id='create-post-modal' onClose={() => setShowDeleteModal(false)} >
                  <DeleteCreator creatorId={creatorId} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
              </Modal>
            )}
      </>
  );
}
