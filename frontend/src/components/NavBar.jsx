import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <>
      <nav className='flex items-center justify-between px-6 py-4 bg-gray-200 shadow-md'>
        <div className='text-2xl font-bold text-indigo-600'>To-Do App</div>
        <ul className='flex gap-6 text-gray-700 font-medium'>
          <li><Link to='/home' className="hover:text-indigo-600 transition">Home</Link></li>
          <li><Link to='/add-task' className="hover:text-indigo-600 transition">Add Task</Link></li>
          <li><Link to='/tasks' className="hover:text-indigo-600 transition" >View Tasks</Link></li>
          
          <li><button onClick={logout} className="hover:text-indigo-600 transition">logout</button></li>
        </ul>
      </nav>
    </>
  )
}

export default NavBar
