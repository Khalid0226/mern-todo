import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import Addtask from './Addtask'
import TaskList from './TaskList'
import Updatetask from './Updatetask'
import SignUp from './auth/SignUp'
import Login from './auth/Login'

import ProtectedRoute from './ProtectedRoute'

import { useLocation } from 'react-router-dom'


function App() {

  const location = useLocation()

  const hideNav = location.pathname ==='/'|| location.pathname ==='/login' 
  return (
    <>
   {!hideNav &&  <NavBar />}

    {/* <h1>Hello world!!!</h1> */}
    <Routes>
      <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
      <Route path='/tasks' element={<ProtectedRoute><TaskList /></ProtectedRoute>}></Route>
      <Route path='/add-task' element={<ProtectedRoute><Addtask /></ProtectedRoute>}></Route>

      <Route path='/update/:id' element={<ProtectedRoute><Updatetask /></ProtectedRoute>}></Route>

      <Route path='/' element={<SignUp />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
    </>

  )
}

export default App
