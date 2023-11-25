import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import Button from "../Button/Button"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import ThemeToggle  from "../ThemeToggle/ThemeToggle"
import { useThemeContext } from '../../context/ThemeContext';
import './Navbar.css'
import { MenuIcon } from '@heroicons/react/outline'

const Navbar = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { theme, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
    toast.success("Logout Success");
  };

  return (
    <>
      <div className={`shadow-xl w-full ${theme === 'dark' ? 'dark-theme' : ''}  ${open ? "bg-white" : ""} top-0 left-0`}>
        <div className={`${theme === 'dark' ? 'dark-theme' : ''} md:flex items-center justify-between py-4 md:px-10 px-7`}>
          <div className={`font-bold text-2xl cursor-pointer flex items-center  text-gray-800 ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <span className="text-3xl text-teal-500 mr-1 pt-2">
              <ion-icon name="logo-slack"></ion-icon>
            </span>
            <Link to="/" className={`${theme === "dark" ? "dark-theme" : ""}`}>BlogVista</Link>  

          </div>


          <button className="nav-toggle-mobile">
          <ThemeToggle />
        </button>
          
          <div
            onClick={() => setOpen(!open)}
            className={`text-3xl absolute right-8  top-5 cursor-pointer md:hidden ${open ? "z-10" : ""} ${theme === "dark" ? "dark-theme" : ""}`}
          >
            <MenuIcon className={`h-6 w-6 ${theme === "dark" ? "dark-theme" : ""}`} />
          </div>

          <ul
            className={`${theme === 'dark' ? 'dark-theme' : ''} md:flex md:items-center md:pb-0 pb-12 ${
              open ? "block" : "hidden"
            } md:static  left-0 w-full md:w-auto md:pl-0 transition-all duration-300 ease-in`}
          >
            {user ? (
              <>
                {/* <li className={`${theme === 'dark' ? 'dark-theme' : ''} md:ml-8 text-xl md:my-0 my-7 rounded-md px-4  py-2 hover:bg-gray-200 ' onClick={()=> setOpen(false)}`}>
        <NavLink to='/allposts' className={` ${theme === 'dark' ? 'dark-theme' : ''} text-gray-800 duration-500`}>Posts</NavLink>
      </li> */}

<li className={`md:ml-8 text-xl md:my-0 my-7 rounded-md px-4 py-2 hover:bg-gray-200 ${theme === 'dark' ? 'dark-theme hover:bg-gray-800' : ''} `} onClick={()=> setOpen(!open)}>
                  <NavLink to="/allposts" className={`${theme === "dark" ? 'text-white' : ''}text-gray-800  duration-500`}>
                    Posts
                  </NavLink>
                </li>  

                <li className={`md:ml-8 text-xl md:my-0 my-7 rounded-md px-4 py-2 hover:bg-gray-200 ${theme === 'dark' ? 'dark-theme hover:bg-gray-800' : ''} `} onClick={()=> setOpen(!open)}>
                  <NavLink to="/createblog" className={`${theme === "dark" ? 'text-white' : ''}text-gray-800  duration-500`}>
                    New Blog
                  </NavLink>
                </li>  

                <li className={`md:ml-8 text-xl md:my-0 my-7 rounded-md px-4 py-2 hover:bg-gray-200 ${theme === 'dark' ? 'dark-theme hover:bg-gray-800' : ''} `} onClick={()=> setOpen(!open)}>
                  <NavLink to="/contact" className={`${theme === "dark" ? 'text-white' : ''}text-gray-800  duration-500`}>
                    Contact
                  </NavLink>
                </li>  


                <li className={`md:ml-8 text-xl md:my-0 my-7 rounded-md px-4 py-2 hover:bg-gray-200 ${theme === 'dark' ? 'dark-theme hover:bg-gray-800' : ''} `} onClick={()=> setOpen(!open)}>
                  <NavLink to="/profile" className={`${theme === "dark" ? 'text-white' : ''}text-gray-800  duration-500`}>
                    Profile
                  </NavLink>
                </li>  

      <button className="nav-toggle">
          <ThemeToggle />
        </button>

      <div onClick={handleLogout}>
      <button onClick={()=> setOpen(!open)} className="text-white mx-3 font-bold px-4 py-3 rounded-md bg-teal-500 hover:bg-teal-400 ">Logout</button>
      </div>

      
              </>
            ) : (
              <>


<button className="nav-toggle">
          <ThemeToggle />
        </button>

        <li className={`md:ml-8 text-xl md:my-0 my-7 rounded-md px-4 py-2 hover:bg-gray-200 ${theme === 'dark' ? 'dark-theme hover:bg-gray-800' : ''} `} onClick={()=> setOpen(!open)}>
                  <NavLink to="/signup" className={`${theme === "dark" ? 'text-white' : ''}text-gray-800  duration-500`}>
                    Signup
                  </NavLink>
                </li> 
                <li className={`md:ml-8 text-xl md:my-0 my-7 rounded-md px-4 py-2 hover:bg-gray-200 ${theme === 'dark' ? 'dark-theme hover:bg-gray-800' : ''} `} onClick={()=> setOpen(!open)}>
                  <NavLink to="/signin" className={`${theme === "dark" ? 'text-white' : ''}text-gray-800  duration-500`}>
                    Login
                  </NavLink>
                </li>  

        
              </>
            )}

          </ul>
          
        </div>
        {
          theme === 'dark' && <hr />
        }
        
      </div>
    </>
  );
};

export default Navbar;