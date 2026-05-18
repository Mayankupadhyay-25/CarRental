import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const { isOwner, navigate, user, loading } = useAppContext()

  useEffect(() => {
    if (!loading && user !== null && !isOwner) {
      navigate('/')
    }
  }, [isOwner, user, loading])

  if (loading) return null

  return (
    <div className='flex flex-col'>
      <NavbarOwner />
      <div className='flex'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
