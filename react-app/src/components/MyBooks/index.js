import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'
import * as creatorActions from '../../store/creator'

import './MyBooks.css'
import CurrentlyReadingPreview from '../Book/BookElements/CurrentlyReadingPreview.js'
import CreateEditBookShelf from '../Bookshelf/CreateBookShelf'
import CustomBookShelfShow from '../Bookshelf/BookshelfElements/CustomBookShelfShow.js'

const Home = ()=>{
  const dispatch = useDispatch();
  const bookobj = useSelector(state => state.books);
  // const bookshelvobj = useSelector(state => state.bookshelves) || [];
  const userBookshelvobj = useSelector(state => state.bookshelves.currentUser) || [];
  // const books = Object.values(bookobj) || [];
  // const history = useHistory();
  // const [showShelfEditModal, setShowShelfEditModal] = useState([])
  // const [errors, setErrors] = useState([]);
  const defaulImg = "https://i.imgur.com/iL99VfD.jpg"
  // const tx = document.getElementsByClassName("growing_paragraph");
  // for (let i = 1; i < tx.length; i++) {
  //   tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px");
  //   tx[i].addEventListener("input", OnInput, false);
  // }
  // function OnInput() {
  //   this.style.height = 0;
  //   this.style.height = (this.scrollHeight) + "px";
  // }
          // function hideMySpan(id) {
          //   setShowShelfEditModal(!showShelfEditModal)
          //   var mySpan = document.getElementById(id);
          //   if (mySpan) {
          //     if (showShelfEditModal) {
          //     mySpan.style.display = "none"}
          //     else {mySpan.style.display = ""}
          //  }
    // mySpan.display = false
    // mySpan.style.display = "";
  // }
  useEffect(()=> {
    async function grabData() {
    await dispatch(bookActions.getAllBooksThunk())
    // dispatch(bookActions.getSingleBookThunk())
    await dispatch(bookActions.removeSingleBookThunk())
    await dispatch(bookshelfActions.getAllBookshelvesThunk())
    await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
    await dispatch(creatorActions.getAllCreatorsThunk())}
    grabData()
  },[dispatch])
// let myspan;
  // useEffect(() => {
  //   if (showShelfEditModal[1]) {
  //     myspan = document.getElementByTagName('span').getElementById(showShelfEditModal[0])
  //     if (myspan) myspan.style.display = "none"
  //   }
  //   return () => {
  //     myspan = document.getElementById(showShelfEditModal[0])
  //     if (myspan) myspan.style.display = ""
  //   }
  // }, [showShelfEditModal])

  // if (!bookobj) return null
  const dispatchSingle = (bookId) => {
    dispatch(bookActions.getSingleBookThunk(bookId))
  }

  let UserShelves=[];
  let ShowCurrent;
  let UserShelfList = [];
  let ShowShelfList;
  let UserWantRead = [];
  let ShowWantRead;
  let ProtectedShelf =[];
  let ShowProtected;
  let UserBooks = []
  let RenderElement

  const runData = function() {
  for (let shelf in userBookshelvobj){
    if (userBookshelvobj[shelf].bookshelfName === "currently reading") {
      if (userBookshelvobj[shelf].Stacks.length > 0) {
        userBookshelvobj[shelf].Stacks.map((stack)=>{
          if (bookobj && bookobj[stack.id]) {UserBooks.push(bookobj[stack.id])}

          UserShelves.push(stack)
        })
      }
    } else if (userBookshelvobj[shelf].bookshelfName === "read") {
      if (userBookshelvobj[shelf].Stacks.length > 0) {
        userBookshelvobj[shelf].Stacks.map((stack)=>{
          if (bookobj && bookobj[stack.id]) {UserBooks.push(bookobj[stack.id])}
        })
      }
    }

    if (userBookshelvobj[shelf].protected === true) {
      ProtectedShelf.push([[userBookshelvobj[shelf].bookshelfName], userBookshelvobj[shelf].id, userBookshelvobj[shelf].Stacks.length])
    } else {
    UserShelfList.push(
      {"name": userBookshelvobj[shelf].bookshelfName, "id": userBookshelvobj[shelf].id, "number": userBookshelvobj[shelf].Stacks.length}
      )}
    if (userBookshelvobj[shelf].bookshelfName === "want to read") {
      if (userBookshelvobj[shelf].Stacks.length > 0) {
        userBookshelvobj[shelf].Stacks.map((stack)=>
          UserWantRead.push(stack)
        )
      }
    }
  }
}

useEffect(()=> {
  // UserShelves=[];
  // ShowCurrent;
  // UserShelfList = [];
  // ShowShelfList;
  // UserWantRead = [];
  // ShowWantRead;
  // UserBooks = []
  // RenderElement
runData()

}, [userBookshelvobj])
runData()
  // `bookshelf${shelf[1]}`
  // ProtectedShelf
  if (ProtectedShelf && ProtectedShelf.length >= 1) {
    ShowProtected = ProtectedShelf.map((shelf)=> (
        <div key={shelf[0]} >
          <span id={`bookshelf${shelf[1]}`}>{shelf[2]}    {shelf[0]}
          </span>
        </div>
    ))}

    if (UserShelfList && UserShelfList.length >= 1) {
      ShowShelfList = UserShelfList.map((shelf)=> <CustomBookShelfShow shelf={shelf} />)
    }
    const checkImg = (book) => {
      if (bookobj && bookobj[book.id]) {
       return bookobj[book.id].Cover
      } else {
         return defaulImg }
    }


  if (UserWantRead && UserWantRead.length >= 1) {
    ShowWantRead = UserWantRead.map((book)=> {
      if (bookobj && bookobj[book.id]) {UserBooks.push(bookobj[book.id])}
    return (
    <NavLink to={`/books/${book.id}`} key={book.id} onClick={()=> dispatchSingle(book.id)}>
      <div>
        <img src={checkImg(book)} alt={book.title}/>
      </div>
    </NavLink>
  )})}

  if (UserShelves && UserShelves.length >= 1) {
  ShowCurrent = UserShelves.map((stack)=> (
    <CurrentlyReadingPreview key={stack.id} book={stack}/>
  ))} else { ShowCurrent = (<h4>Not Currently Reading anything!</h4>)}



  // for (let book in bookobj) {
  //   if (book !== "singleBook" && book in userBookshelvobj) {
  //     UserBooks.push(bookobj[book])
  //   }
  // }
  // cover	title	author	avg rating	rating	shelves	review	date read	date added

  if (UserBooks && UserBooks.length > 1) {
      RenderElement = UserBooks.map((book)=>
    (
    <tr className="mybooks_right_column_books">
          <td className="mybooks_right_column_cover">
            <NavLink to={`/books/${book.id}`} key={book.id}>
              <img src={book.Cover} alt={book.title} />
            </NavLink>
          </td>
          <td className="mybooks_right_column_title">
            <NavLink to={`/books/${book.id}`} key={book.id}>
              <h2>{book.title}</h2>
            </NavLink>
          </td>
          <td className="mybooks_right_column_creator">
              <h3>{book.Creators && book.Creators.map((creator)=> (<span className="mybooks_right_column_creator_list">
                  {creator.role}: {creator.name}</span>))}
              </h3>
          </td>
          <td className="mybooks_right_column_averagerating">
              <h3>{book.AverageRating}</h3>
          </td>
          <td className="mybooks_right_column_rating">
            "No Rating Yet!"
          </td>
          {/* <td className="mybooks_right_column_shelves">

          </td> */}
          <td className="mybooks_right_column_review">
            "No Review Yet!"
          </td>
          {/* <td className="mybooks_right_column_date_read">
          {bookobj[book.id]}
          </td>
          <td className="mybooks_right_column_date_added">

          </td> */}
      </tr>
        )
  )}

   const imgAddress = "https://i.imgur.com/RmycZv9.png"
  return(
    <>
    <div className="mybooks_full_length_banner">
          <img src={imgAddress} alt="Reading is Love Banner" />
          <div id="mybooks_login_module">
            <h1>Get a handle on your collection.</h1>
          </div>
    </div>
    <div className="mybooks_main_container">
      <div className="mybooks_left_container">
        <div className="mybooks_bookshelves_list">
          <h3>BOOKSHELVES</h3>
          {ShowProtected}
        </div>
        <div className="mybooks_spacer_line">
        </div>
        <div className="mybooks_create_bookshelf">
          {ShowShelfList}
        </div>
          <CreateEditBookShelf />

        <div className="mybooks_spacer_line">
        </div>
        <div className="mybooks_currently_reading_container">
          <h3>CURRENTLY READING</h3>
          {ShowCurrent}
        </div>

        <div className="mybooks_spacer_line">
        </div>
        <div className="mybooks_want_to_read_container">
          <h3>WANT TO READ</h3>
          <div>
          {ShowWantRead}
          </div>
        </div>
        <div className="mybooks_spacer_line">
        </div>
      </div>
      <div className="mybooks_right_container">
        <div className="mybooks_main_reccomendation_list">
          <table className="mybooks_table">
            <thread>
              <tr>
                <th id="column1">Cover</th>
                <th id="column2">Title</th>
                <th id="column3">Creators</th>
                <th id="column4">AVG. Rating</th>
                <th id="column5">You Rating</th>
                {/* <th id="column6">shelves</th> */}
                <th id="column7">Your Review</th>
                {/* <th id="column8">date read</th>
                <th id="column9">date added</th> */}
              </tr>
            </thread>
            <tbody>
              {RenderElement}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
