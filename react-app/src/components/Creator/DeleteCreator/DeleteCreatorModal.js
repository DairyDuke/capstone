import React from 'react';
import { Modal } from '../../../context/Modal';
import './DeleteCreator.css'

import DeleteCreator from '.';

export default function DeleteCreatorModal({showDeleteModal, setShowDeleteModal, creatorId}) {


  return (
      <>
        {showDeleteModal && (
              <Modal id='delete_creator_modal' onClose={() => setShowDeleteModal(false)} >
                  <DeleteCreator creatorId={creatorId} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
              </Modal>
            )}
      </>
  );
}
