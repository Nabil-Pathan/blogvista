import React from 'react';
import SvgImage from '../../images/image2.png';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { useThemeContext } from "../../context/ThemeContext"

const LandingPage = () => {
    const { theme } = useThemeContext()
    return (
        <div className={`${theme === 'dark' && 'dark-theme'} h-screen flex flex-col md:flex-row items-center justify-center`}>
            <div className="w-full md:w-1/2 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold  mb-4">
                    Your Gateway to{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-400">
                        Diverse
                    </span>{' '}
                    Blogging BlogVista
                </h1>

                <div className="mt-4 inline-block">
                    <button className="px-4 py-3 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-md">
                        <Link to="/signup">Get Started</Link>
                    </button>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <img src={SvgImage} alt="" className="w-full" />
            </div>
        </div>
    );
};

export default LandingPage;
