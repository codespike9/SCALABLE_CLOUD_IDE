import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-2 px-7 bg-black text-white font-display">
        <span className='text-xl font-semibold'>AeroIDE</span>

        <div className='flex gap-10'>
            <span className='hover:border-b-2 border-white cursor-pointer'>Projects </span>
            <span className='hover:border-b-2 border-white cursor-pointer' onClick={()=>navigate('/editor')}>IDE</span>
        </div>

        <div className="flex items-center justify-end gap-5">
            <span className='hover:border-b-2 border-white cursor-pointer' onClick={()=>navigate('/login')}>LogIn</span>

            <span className='hover:border-b-2 border-white cursor-pointer'>Contact</span>

            <span className='border rounded border-white py-2 px-2 hover:-translate-y-1 cursor-pointer'><span className='font-semibold'>Get started</span> ---It's free</span>
        </div>


    </div>
  )
}

export default NavBar