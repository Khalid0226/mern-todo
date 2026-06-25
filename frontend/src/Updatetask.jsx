import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Updatetask() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const {id} = useParams()

    const navigate = useNavigate()

    const fetchData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:2100/task/${id}`)
            // console.log(response.data.result);

            setTitle(response.data.result.title)
            setDescription(response.data.result.description)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData(id)
    }, [id])


    const updateData = async (e) =>{
        e.preventDefault()

        try {
            const response = await axios.put(`http://localhost:2100/task/${id}`,{
                title,
                description
            })
             alert('Task updated successfully!');
            console.log(response.data);

            navigate('/tasks')
            
        } catch (error) {
            console.log(error);
            
        }
    }


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">

            <div className="bg-white p-6 rounded-lg shadow-md w-80">

                <h1 className="text-xl font-semibold mb-4 text-center">Update Task</h1>

                <form className="space-y-3" onSubmit={updateData}>

                    <label htmlFor="">Title:</label>
                    <input className="w-full border p-2 rounded  border-slate-200" type="text" placeholder='Enter Title' name='title' onChange={(e) => setTitle(e.target.value)} value={title} />

                    <label htmlFor="Description"></label>
                    <textarea className="w-full border p-2 rounded border-gray-200" name="description" placeholder='Enter description' rows={5} onChange={(e) => { setDescription(e.target.value) }} value={description}></textarea>

                    <button type='submit' className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">submit</button>
                </form>
            </div>
        </div>
    )
}

export default Updatetask
