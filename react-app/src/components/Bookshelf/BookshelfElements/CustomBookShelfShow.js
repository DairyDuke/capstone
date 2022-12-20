import React, { useState } from "react";
import EditBookshelf from '../EditBookshelf'
import DeleteBookshelfModal from '../DeleteBookshelf/DeleteBookshelfModal.js'

const CustomBookShelfShow = ({shelf}) => {
  const [showShelfDeleteModal, setShowShelfDeleteModal] = useState(false)

  if (!shelf) {
    return (
      <>
      </>
    )
  } else {
  return   (
    <div key={shelf['id']} className="mybooks_custom_shelves">
      <span id={`bookshelf_${shelf['id']}`} >
        {shelf['number']}    {shelf['name']}
      </span>
      <EditBookshelf shelfId={shelf['id']} shelfname={shelf['name']} />
      <button className='mybooks_delete_bookshelf_button'  onClick={() => setShowShelfDeleteModal(true)}>
        <i className="fa-sharp fa-solid fa-x"></i>
      </button>
      <DeleteBookshelfModal showDeleteModal={showShelfDeleteModal} setShowDeleteModal={setShowShelfDeleteModal} bookshelfid={shelf['id']} />
    </div>
  )}
}
export default CustomBookShelfShow
