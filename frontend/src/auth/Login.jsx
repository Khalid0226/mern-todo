import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async(e) =>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:2100/login',{
                email:email,
                password:password
            })

            console.log(response.data);

            localStorage.setItem('token',response.data.token)

            alert(`login successfull ${email}`)
            navigate('/home')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Login Page</h1>

                <div className="space-y-4">
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="">Email</label>
                            <input type="email" placeholder='enter email' name='email' onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <div>
                            <label htmlFor="">Password</label>
                            <input type="password" placeholder='enter password' name='password' onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <button className=" mt-5 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Login Now</button>

                        <div className="text-center mt-4">
                            <p className="text-sm">
                                can't have an account?{" "}
                                <Link to="/" className="text-blue-500 hover:underline">
                                    Signup
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
