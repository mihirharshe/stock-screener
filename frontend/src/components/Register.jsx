import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPass, setCnfPass] = useState('');

    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(0);

    const submitHandler = async (e) => {
        e.preventDefault();
    }


    const submit = async () => {
        try {
            let user = await axios.post('/api/auth/register', { username, password })
            setStatusCode(201);
            setMessage(user.data.message);
            setTimeout(() => navigate('/login'), 2000);
        }
        catch (err) {
            console.error(err);
            console.log(err.response)
            setMessage(err.response.data.message)
            setStatusCode(err.response.status)
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-20 w-auto"
                            src="tickersmolcolorfinal.png"
                            alt="theticker"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register your account</h2>

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
                            <div className="">
                                <label htmlFor="password" className="sr-only">
                                    Confirm Password
                                </label>
                                <input
                                    id="cnf-password"
                                    name="cnf-password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password"
                                    value={cnfPass}
                                    onChange={(e) => setCnfPass(e.target.value)}
                                />
                                {password !== cnfPass
                                    ?
                                    <p className="mt-2 text-red-600 text-sm">
                                        Passwords do not match
                                    </p>
                                    :
                                    null
                                }
                            </div>

                            <div>
                                <Link to='/login' className="loginText">Already have an account? Login now.</Link>
                            </div>

                            <div className={(statusCode === 201 ? 'text-green-600' : 'text-red-600')}>
                                {message}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    onClick={submit}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md loginBtn focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;