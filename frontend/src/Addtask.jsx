import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function Addtask() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const postData = async (e) =>{
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:2100/add-task',{
            title:title,
            description:description
        })
        console.log(res.data);

        setTitle('')
        setDescription('')
        
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">

            <div className="bg-white p-6 rounded-lg shadow-md w-80">

                <h1 className="text-xl font-semibold mb-4 text-center">Add New Task</h1>

                <form className="space-y-3" onSubmit={postData}>

                    <label htmlFor="">Title:</label>
                    <input className="w-full border p-2 rounded  border-slate-200" type="text" placeholder='Enter Title' name='title' onChange={(e)=>setTitle(e.target.value)} value={title} />

                    <label htmlFor="Description"></label>
                    <textarea className="w-full border p-2 rounded border-gray-200" name="description" placeholder='Enter description' rows={5} onChange={(e)=>{setDescription(e.target.value)}} value={description}></textarea>

                    <button type='submit' className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">submit</button>
                </form>
            </div>
        </div>
    )
}

export default Addtask
