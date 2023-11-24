import React from 'react'
import { useThemeContext } from "../../context/ThemeContext"

const ContactPage = () => {

  const { theme } = useThemeContext()
  return (
    <>
    <section className={` ${theme === 'dark' ? 'dark-theme' : 'bg-white'}`}>
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className={`mb-4 text-5xl  tracking-tight font-extrabold text-center ${theme === 'dark' ? 'dark-theme' : 'text-teal-700'} `}>Contact Us</h2>
      <p className={`mb-8 lg:mb-16 font-light text-center   sm:text-xl ${theme === 'dark' ? 'dark-theme ' : 'text-gray-700'}`}>Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
      <form action="#" className="space-y-8">
          <div>
              <label for="email" className={`block mb-2 text-xl font-medium   ${theme === 'dark' ? 'dark-theme' : 'text-gray-900'}`}>Your email</label>
              <input type="email" id="email" className={`shadow-sm  border border-gray-400  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  ${theme === 'dark' ? 'dark-theme' : 'text-gray-900'} `} placeholder="name@flowbite.com" required />
          </div>
          <div>
              <label for="email" className={`block mb-2 text-xl font-medium   ${theme === 'dark' ? 'dark-theme' : 'text-gray-900'}`}>Subject</label>
              <input type="email" id="email" className={`shadow-sm  border border-gray-400  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  ${theme === 'dark' ? 'dark-theme' : 'text-gray-900'} `} placeholder="name@flowbite.com" required />
          </div>
          <div>
              <label for="email" className={`block mb-2 text-xl font-medium   ${theme === 'dark' ? 'dark-theme' : 'text-gray-900'}`}>Message</label>
              <input type="email" id="email" className={`shadow-sm  border border-gray-400  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  ${theme === 'dark' ? 'dark-theme' : 'text-gray-900'} `} placeholder="name@flowbite.com" required />
          </div>
          <button type="submit" className="py-3 px-4 text-xl text-white rounded-lg bg-teal-500 hover:bg-teal-400 font-bold">Send message</button>
      </form>
  </div>
</section>
</>
  )

}

export default ContactPage