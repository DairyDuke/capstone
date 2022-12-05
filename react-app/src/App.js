import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/Login/LoginForm';
import SignUpForm from './components/auth/Signup/SignUpForm';
import Home from './components/Home'
import Header from './components/Header';
import Footer from './components/Footer'
import Splash from './components/Splash'
import MyBooks from './components/MyBooks'
import BookDetails from './components/BookDetails'
import CreateBook from './components/Book/CreateBook'
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/Header/UsersList';
// import User from './components/Header/User';
import { authenticate } from './store/session';

function App() {
  const sessionUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          {sessionUser ? <Home /> : <Splash />}
        </Route>
        <Route path='/mybooks'>
          <MyBooks />
        </Route>
        <Route path='/create-book'>
          <CreateBook />
        </Route>
        <Route path='/books/:bookId'>
          <BookDetails />
        </Route>
        <Route>
          <div id='page-not-found-container'>
            <h1>404 Page not found {':<'} Sowwyyyyy</h1>
            <h4> Thanks, Nate!</h4>
          </div>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
