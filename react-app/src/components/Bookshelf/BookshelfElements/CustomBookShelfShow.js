import React, { useState } from "react";
import EditBookshelf from '../EditBookshelf'

const CustomBookShelfShow = ({shelf}) => {

  if (!shelf) {
    return (
      <>
      </>
    )
  } else {
  return   (
    <div key={shelf['id']} className="mybooks_custom_shelves">
      <EditBookshelf shelfNumber = {shelf['number']} shelfId={shelf['id']} shelfname={shelf['name']} />
    </div>
  )}
}
export default CustomBookShelfShow
