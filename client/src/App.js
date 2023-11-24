import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import SignupPage from './pages/SignupPage/SignupPage';
import SigninPage from './pages/SigninPage/SigninPage';
import VerifyPage from './pages/VerifyPage/VerifyPage';
import Allposts from './pages/Allposts/Allposts';
import ContactPage from './pages/ContactPage/ContactPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PublicRoute from './components/PublicRoute/PublicRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import CreateBlogPage from './pages/CreateBlogPage/CreateBlogPage';
import SingleBlogPage from './pages/SingleBlogPage/SingleBlogPage';
import UserProfile from './pages/UserProfile/UserProfile';

function App() {

  return (
    <div className="App">
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            iconTheme: {
              primary: '#4aed88',
            },
          },
        }}
      ></Toaster>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicRoute element={<LandingPage/>}/> }  />
        <Route path="/signup" element={<PublicRoute element={<SignupPage/>}/>}  />
        <Route path="/signin"  element={<PublicRoute element={<SigninPage/>}/>}/>
        <Route path="/verify"  element={<VerifyPage/>}  />
        <Route path="/allposts" element={<PrivateRoute element={<Allposts/>} />} />
        <Route path="/contact" element={<PrivateRoute element={<ContactPage/>} />} />
        <Route path="/profile" element={<PrivateRoute element={ <ProfilePage/>} />} />
        <Route path="/createblog" element={<PrivateRoute element={ <CreateBlogPage/>} />} />
        <Route path='/post/:id' element={<PrivateRoute element={<SingleBlogPage/>}/>}/>
        <Route path='/profile/:userId' element={<PrivateRoute element={<UserProfile/>}/>}/>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
