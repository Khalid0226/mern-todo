import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import Addtask from './Addtask'
import TaskList from './TaskList'
import Updatetask from './Updatetask'


function App() {

  return (
    <>
    <NavBar />

    {/* <h1>Hello world!!!</h1> */}
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/tasks' element={<TaskList />}></Route>
      <Route path='/add-task' element={<Addtask />}></Route>

      <Route path='/update/:id' element={<Updatetask />}></Route>
    </Routes>
    </>

  )
}

export default App
