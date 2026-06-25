import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'

function TaskList() {
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:2100/tasks')
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


    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            {/* Header */}
            <div className="grid grid-cols-4 text-center font-bold bg-gray-200 p-3 rounded">
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
                        className="grid grid-cols-4 items-center text-center bg-white p-3 rounded shadow"
                    >
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
