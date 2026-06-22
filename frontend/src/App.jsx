import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import Addtask from './Addtask'

function App() {

  return (
    <>
    <NavBar />

    {/* <h1>Hello world!!!</h1> */}
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/add-task' element={<Addtask />}></Route>
    </Routes>
    </>

  )
}

export default App
