import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'

function TaskList() {
    const [data, setData] = useState([])
    const [select,setSelect] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:2100/tasks',{
                headers:{
                    Authorization:`bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data.result);

            setData(response.data.result)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deleteData = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:2100/delete/${id}`)
            alert('task deleted successfully!!')
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    const selectAll = (event) =>{

        if (event.target.checked) {
            let items = data.map((item) => item._id)
            setSelect(items);
            
        }
        else{
            setSelect([])
        }
    }

    const selectOne = (id) =>{
        if (select.includes(id)) {
            setSelect(select.filter(item => item !== id))
        }
        else{
            setSelect([id,...select])
        }
    }


    const deleteMany = async () =>{
        try {
            const response  = await axios.delete('http://localhost:2100/delete-multiple',{
                data :{
                    ids:select
                }
            })
            alert('task deleted successfully!!')
            setSelect([])
            await fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            {/* Header */}
            <button onClick={deleteMany} className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-700">delete Many</button>
            <div className="grid grid-cols-5 text-center font-bold bg-gray-200 p-3 rounded">
                <div> <input type="checkbox" onChange={selectAll} checked={select.length === data.length && data.length > 0} /></div>
                <div>Number</div>
                <div>Title</div>
                <div>Description</div>
                <div>Delete Tasks</div>
            </div>

            {/* Rows with vertical gap only */}
            <div className="mt-3 space-y-3">
                {data.map((item,index) => (
                    <div
                        key={item._id}
                        className="grid grid-cols-5 items-center text-center bg-white p-3 rounded shadow"
                    >   
                        <div> <input type="checkbox" checked={select.includes(item._id)} onChange={()=>selectOne(item._id)} /> </div>
                        <div>{index + 1}</div>
                        <div>{item.title}</div>
                        <div>{item.description}</div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => deleteData(item._id)}
                                className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-700"
                            >
                                delete task
                            </button>

                            <Link  className="bg-blue-500 px-3 py-1 text-white rounded hover:bg-blue-700 ml-10" to={`/update/${item._id}`} >Update task</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList
