//import { AuthProvider } from '../context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Steven
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';

import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
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
