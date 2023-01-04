import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'
import * as creatorActions from '../../store/creator'

import './Home.css'
import CurrentlyReadingPreview from '../Book/BookElements/CurrentlyReadingPreview.js'


const Home = ()=>{
  const dispatch = useDispatch();
  const bookobj = useSelector(state => state.books);
  // const bookshelvobj = useSelector(state => state.bookshelves);
  const userBookshelvobj = useSelector(state => state.bookshelves.currentUser);
  // const books = Object.values(bookobj);
  // const history = useHistory();
  // const [errors, setErrors] = useState([]);
  // const defaulImg = "https://i.imgur.com/iL99VfD.jpg"
  // const tx = document.getElementsByClassName("growing_paragraph");
  // for (let i = 1; i < tx.length; i++) {
  //   tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px");
  //   tx[i].addEventListener("input", OnInput, false);
  // }
  // function OnInput() {
  //   this.style.height = 0;
  //   this.style.height = (this.scrollHeight) + "px";
  // }

  let UserShelves=[];
  let ShowCurrent;
  let UserShelfList = [];
  let ShowShelfList;
  let UserWantRead = [];
  let ShowWantRead;
  let UserBooks = []
  let RenderElement

  // let experiment;
  // useEffect(()=> {
  //   async function runTest() {
  //     for (let shelf in userBookshelvobj){
  //     if (userBookshelvobj[shelf].bookshelfName === "want to read") {
  //      experiment = await dispatch(bookshelfActions.getSingleBookshelfThunk(shelf))
  //      console.log("Experiment, ", experiment)
  //     }
  //   }}
  //   runTest()
  // }, [dispatch])

  const runData = function() {
  for (let shelf in userBookshelvobj){
    if (userBookshelvobj[shelf].bookshelfName === "currently reading") {
      if (userBookshelvobj[shelf].Stacks.length > 0) {
        userBookshelvobj[shelf].Stacks.map((stack)=>
          UserShelves.push(stack)
          )
      }
    }
    UserShelfList.push([[userBookshelvobj[shelf].bookshelfName], userBookshelvobj[shelf].Stacks.length])
    if (userBookshelvobj[shelf].bookshelfName === "want to read") {
      if (userBookshelvobj[shelf].Stacks.length > 0) {
        userBookshelvobj[shelf].Stacks.map((stack)=>
          UserWantRead.push(stack)
        )
      }
    }
  }
  for (let book in bookobj) {
    if (book !== "singleBook") {
      UserBooks.push(bookobj[book])
    }
  }
}

  useEffect(()=> {
    async function grabData() {
    await dispatch(bookActions.getAllBooksThunk())
    // dispatch(bookActions.getSingleBookThunk())
    dispatch(bookActions.removeSingleBookThunk())
    await dispatch(bookshelfActions.getAllBookshelvesThunk())
    await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
    await dispatch(creatorActions.getAllCreatorsThunk())}
    grabData()
  },[dispatch])
// console.log("This")
useEffect(()=> {
  UserShelves=[];
  // ShowCurrent;
  UserShelfList = [];
  // ShowShelfList;
  UserWantRead = [];
  // ShowWantRead;
  UserBooks = []
  // RenderElement
  runData()
}, [userBookshelvobj])
runData()

  const dispatchSingle = (bookId) => {
    dispatch(bookActions.getSingleBookThunk(bookId))
  }
  // onClick={()=> dispatchSingle(book.id)}
  // useEffect (() => {
  //   runData()
  //   console.log("First UF")
  //   },
  // )
  // useEffect (() => {
  //   runData()
  //   console.log("Second UF")
  //   }, [history]
  // )
  // console.log("Book obj ", bookobj)
  // console.log('1 ', UserShelfList)
  if (UserShelfList && UserShelfList.length >= 1) {
  ShowShelfList = UserShelfList.map((shelf)=> (
      <div key={shelf[0]+shelf[1]}>
        <span>{shelf[1]}    {shelf[0]}</span>
      </div>
  ))}

  // console.log('2 ', UserWantRead)
  if (UserWantRead && UserWantRead.length > 0) {
  ShowWantRead = UserWantRead.map((book)=> {
    if (bookobj[book.id]) {
      return (
    <NavLink to={`/books/${book.id}`} key={book.id} onClick={()=> dispatchSingle(book.id)}>
      <div>
        <img src={bookobj[book.id]["Cover"]} alt={book.title}/>
      </div>
    </NavLink>
  )}}
  )} else {ShowWantRead = (<h2>Not currently wanting to read!</h2>)}

  // console.log('3 ', UserShelves)
  if (UserShelves && UserShelves.length >= 1) {
  ShowCurrent = UserShelves.map((stack)=> (
    <CurrentlyReadingPreview key={stack.id} book={stack}/>
  ))} else {
    ShowCurrent = (<h2>Not current reading anything!</h2>)
  }


  if (UserBooks && UserBooks.length > 1) {
      RenderElement = UserBooks.map((book)=> {
        if (bookobj[book.id]) {
          return (
      <NavLink to={`/books/${book.id}`} key={book.id} onClick={()=> dispatchSingle(book.id)}>
          <div className="home_center__books">
            <img src={book["Cover"]} alt={book.title} />
            <div className="home_center__details">
              <div className="home_center__title">
                <h2>{book.title}</h2>
              </div>
              <div className="home_center__averagerating">
                <h3>AVG. Rating: {book.AverageRating}</h3>
              </div>
              <div className="home_center__averagerating">
                <h3>{book.Creators && book.Creators.map((creator)=> (
                  <span className="home_center_creator_list">
                  {creator.role}: {creator.name}
                  </span>
                ))}</h3>
              </div>
              <div className="home_center__summary">
                <p className="growing_paragraph">{book.summary}</p>
              </div>
            </div>
          </div>
      </NavLink>
        )}}
  )}



   const imgAddress = "https://i.imgur.com/RmycZv9.png"
  return(
    <>
      <div className="home_full_length_banner">
        <img src={imgAddress} alt="Reading is Love Banner" />
        <div id="home_login_module">
          <h1>Find your next adventure here.</h1>
        </div>
      </div>
    <div className="home_main_container">
      <div className="home_left_container">
        <div className="home_currently_reading_container">
          <h3>CURRENTLY READING</h3>
          {ShowCurrent}
        </div>
        <div className="mybooks_spacer_line">
        </div>
        <div className="home_want_to_read_container">
          <h3>WANT TO READ</h3>
          <div>
          {ShowWantRead}
          </div>
        </div>
        <div className="mybooks_spacer_line">
        </div>
        <div className="home_bookshelves_list">
          <h3>BOOKSHELVES</h3>
          {ShowShelfList}
        </div>
        <div className="mybooks_spacer_line">
        </div>
      </div>
      <div className="home_right_container">
        <div className="home_main_reccomendation_list">
            {RenderElement}
        </div>
      </div>
    </div>
  </>
  )
}

export default Home
