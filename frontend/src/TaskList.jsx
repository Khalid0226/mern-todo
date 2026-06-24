import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

function TaskList() {
    const [data,setData] = useState([])

    const fetchData = async () =>{
        try {
           const response = await axios.get('http://localhost:2100/tasks')
           console.log(response.data.result);
           
           setData(response.data.result)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
    

 return (
  <div className="p-6 bg-gray-100 min-h-screen">

    {/* Header */}
    <div className="grid grid-cols-3 text-center font-bold bg-gray-200 p-3 rounded">
      <div>Number</div>
      <div>Title</div>
      <div>Description</div>
    </div>

    {/* Rows with vertical gap only */}
    <div className="mt-3 space-y-3">
      {data.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-3 text-center bg-white p-3 rounded shadow"
        >
          <div>{index + 1}</div>
          <div>{item.title}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>

  </div>
);
}

export default TaskList
