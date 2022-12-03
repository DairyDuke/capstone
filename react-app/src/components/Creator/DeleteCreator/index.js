import { useDispatch } from "react-redux"
import { useEffect } from "react"
import * as creatorActions from '../../../store/creator'

const DeleteCreator = ({ creatorId, setShowDeleteModal, showDeleteModal }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showDeleteModal])

  const deleteCreator = (creatorId) => {
    dispatch(creatorActions.deleteCreatorThunk(creatorId))
  }

  return (
    <div id="confirm-delete-form">
      <div id="confirm-delete-text">
        <h2>Librarian, are you really sure you want to delete this book?</h2>
      </div>
      <div className="form-footer">
        <button onClick={() => setShowDeleteModal(false)} className='cancel-button'>Cancel</button>
        <button onClick={() => deleteCreator(creatorId)} className="save-edit-button">YES</button>
      </div>
    </div>
  )
}

export default DeleteCreator;
