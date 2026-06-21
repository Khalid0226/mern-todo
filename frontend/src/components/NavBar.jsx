import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <>
        <nav className='flex items-center justify-between px-6 py-4 bg-gray-200 shadow-md'>
            <div text-2xl font-bold text-indigo-600>To-Do App</div>
            <ul className='flex gap-6 text-gray-700 font-medium'>
                <li><Link to='/' className="hover:text-indigo-600 transition">Home</Link></li>
                <li><Link to='/add-task' className="hover:text-indigo-600 transition">Add Task</Link></li>
            </ul>
        </nav>
    </>
  )
}

export default NavBar
