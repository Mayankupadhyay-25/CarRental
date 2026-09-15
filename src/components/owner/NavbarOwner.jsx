import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const NavbarOwner = () => {
  const { user, logout } = useAppContext()

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-700 bg-white border-b border-borderColor relative transition-all'>
      <Link to='/' className='flex items-center gap-2.5'>
        <img src={assets.logo} alt="Car Rental" className="h-8 w-auto object-contain" />
        <span className='text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full'>Owner Panel</span>
      </Link>
      
      <div className='flex items-center gap-5 text-base'>
        <Link to='/' className='text-gray-600 hover:text-primary transition-colors max-sm:hidden font-medium'>
          Main Website
        </Link>
        <div className='flex items-center gap-2 font-medium text-gray-800'>
          <span>Welcome, {user?.name || 'Owner'}</span>
        </div>
        <button 
          onClick={logout}
          className='cursor-pointer text-sm font-medium px-4 py-1.5 border border-borderColor rounded-lg hover:bg-gray-50 transition-colors'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default NavbarOwner