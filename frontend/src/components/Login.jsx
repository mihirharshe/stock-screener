import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ authenticate }) => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(0);

    const submitHandler = async (e) => {
        e.preventDefault();
        submit();
    }

    const submit = async () => {
        try {
            let user = await axios.post('http://localhost:5000/login', { username, password })
            localStorage.setItem('token', user.data.token)
            setStatusCode(200);
            const loginLoad = () => {
                authenticate();
            }
            setTimeout(() => loginLoad(), 1000)
            setMessage(user.data.message);
        }
        catch (err) {
            console.error(err);
            setMessage(err.response.data.message)
            setStatusCode(err.response.status)
        }

    }


    return (
        <>
                <>

                    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <img
                                    className="mx-auto h-12 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                    alt="Workflow"
                                />
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

                            </div>
                            <form onSubmit={submitHandler} className="space-y-8">
                                <div className="rounded-md shadow-sm space-y-5">
                                    <div className="">
                                        <label htmlFor="username" className="sr-only">
                                            Username
                                        </label>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            required
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="password" className="sr-only">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />


                                    </div>
                                </div>

                                <div>
                                    <Link to='/register' className="text-indigo-700">Don't have an account? Create one</Link>
                                </div>

                                {/* <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div> */}

                                {/* <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="relative bg-inherit">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="peer bg-transparent h-10 w-36 rounded-lg text-gray-200 
                                               placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                                placeholder="Type inside me" />
                            <label
                                htmlFor="username"
                                className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base 
                                        peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm 
                                        transition-all">
                                Type inside me
                            </label>
                        </div>
                    </div> */}
                                <div className={(statusCode === 200 ? 'text-green-600' : 'text-red-600')}>
                                    {message}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>

                </>
            
        </>
    )
}

export default Login