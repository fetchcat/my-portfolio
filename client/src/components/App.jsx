//import { AuthProvider } from '../context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Steven
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import NewPost from '../pages/NewPost';

// Components
import PrivateRoute from './PrivateRoute';
import EditPost from '../pages/EditPost';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/newpost' element={<PrivateRoute />}>
            <Route path='/newpost' element={<NewPost />} />
          </Route>
          <Route path='/editpost/:postID' element={<PrivateRoute />}>
            <Route path='/editpost/:postID' element={<EditPost />} />
          </Route>
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
}

export default App;
