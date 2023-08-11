import React from 'react'

const AuthIcons = () => {
  return (
    <div className='flex justify-between mt-4 space-x-4 text-gray-400 text-sm'>
        <div className='flex justify-center items-center border border-gray-500 rounded-md py-2 w-[47%] space-x-1'>
            <img src={'/google.png'} alt='google icon' className='h-4' />
            <span>Google</span>
        </div>
        <div className='flex justify-center items-center border border-gray-500 rounded-md py-2 w-[47%] space-x-1'>
            <img src={'/microsoft.png'} alt='microsoft icon' className='h-4' />
            <span>Microsoft</span>
        </div>
    </div>
  )
}

export default AuthIcons
