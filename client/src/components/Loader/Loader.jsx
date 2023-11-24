import React from 'react'
import { Hourglass } from 'react-loader-spinner'
import { useThemeContext } from '../../context/ThemeContext';
const Loader = () => {
  const { theme } = useThemeContext()
  return (

    <div className={`${theme === 'dark' && 'dark-theme' } h-screen w-full flex flex-col items-center justify-center`}>
  <Hourglass
  visible={true}
  height="80"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#008080' ]}
/>
</div>
  )
}

export default Loader