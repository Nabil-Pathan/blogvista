import React from 'react'

const Button = (props) => {
  return (
    <div className="bg-indigo-600 cursor-pointer font-bold text-white  py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500 ">
        {props.children}
    </div>
  )
}

export default Button